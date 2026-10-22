# SPDX-License-Identifier: GPL-3.0-only
"""Independent PCM verification using Python's wave reader and standard library.

This checker never imports OpenWave's planner, encoder or tests. Frame rounding
uses Decimal, and reference sine samples use complex rotation instead of the
renderer’s per-frame sin calculation. Reports retain inputs and SHA-256 hashes.
"""
import array
import hashlib
import json
import math
import platform
import struct
import sys
import time
import wave
from decimal import Decimal, ROUND_HALF_UP
from pathlib import Path


def require(condition, message):
    if not condition:
        raise AssertionError(message)


def frames_for_steps(steps, rate):
    elapsed = Decimal(0)
    previous = 0
    lengths = []
    for step in steps:
        elapsed += Decimal(str(step['duration_seconds']))
        boundary = int((elapsed * rate).to_integral_value(rounding=ROUND_HALF_UP))
        lengths.append(boundary - previous)
        previous = boundary
    return lengths


def read_pcm(reader, frames):
    data = reader.readframes(frames)
    values = array.array('h')
    values.frombytes(data)
    if sys.byteorder != 'little':
        values.byteswap()
    require(len(values) == frames * reader.getnchannels(), 'truncated PCM payload')
    return values


def reference_error(values, count, rate, channels, step):
    angular_step = math.tau * step['frequency_hz'] / rate
    rotation = complex(math.cos(angular_step), math.sin(angular_step))
    phase = complex(1, 0)
    ramp = int(Decimal(str(rate)) * Decimal('0.01'))
    maximum = 0
    for n in range(count):
        distance = min(n, count - 1 - n, ramp)
        envelope = math.sin(math.pi * distance / (2 * ramp)) ** 2
        value = phase.imag * step['amplitude'] * envelope * 32767
        expected = math.floor(value + 0.5) if value >= 0 else -math.floor(-value + 0.5)
        maximum = max(maximum, abs(values[n * channels] - expected))
        phase *= rotation
    require(maximum <= 2, f'sample/reference error {maximum} exceeds 2 PCM16 LSB')
    return maximum


def frequency_result(reader, requested):
    rate, channels = reader.getframerate(), reader.getnchannels()
    reader.setpos(rate)  # middle eight seconds of the ten-second tone
    samples = read_pcm(reader, rate * 8)[::channels]
    crossings = []
    for n in range(1, len(samples)):
        previous, current = samples[n - 1], samples[n]
        if previous <= 0 < current:
            crossings.append((n - 1 + (-previous) / (current - previous)) / rate)
    require(len(crossings) >= 3, 'too few rising crossings')
    elapsed = crossings[-1] - crossings[0]
    cycles = len(crossings) - 1
    measured = cycles / elapsed
    # Conservative endpoint bracketing: each crossing is within one sample of
    # its true crossing for these noiseless, comfortably quantized fixtures.
    uncertainty = cycles / (elapsed - 2 / rate) - measured
    tolerance = max(0.02, requested * 0.00005)
    require(uncertainty <= tolerance / 3, 'frequency result inconclusive: endpoint bound too large')
    require(abs(measured - requested) <= tolerance, 'frequency outside tolerance')
    return {'requested_hz': requested, 'measured_hz': measured,
            'endpoint_bound_hz': uncertainty, 'tolerance_hz': tolerance}


def verify(directory, item):
    path = directory / (item['name'] + '.wav')
    source = item['input']
    rate, channels = source['sample_rate_hz'], source['channels']
    lengths = frames_for_steps(source['steps'], rate)
    total_frames = sum(lengths)
    expected_bytes = 44 + total_frames * channels * 2
    require(path.stat().st_size == expected_bytes, 'file length mismatch')
    with path.open('rb') as stream:
        header = stream.read(44)
    expected_header = (b'RIFF' + struct.pack('<I', expected_bytes - 8) + b'WAVEfmt '
                       + struct.pack('<IHHIIHH', 16, 1, channels, rate, rate * channels * 2, channels * 2, 16)
                       + b'data' + struct.pack('<I', expected_bytes - 44))
    require(header == expected_header, 'canonical header mismatch')
    maximum_error = 0
    with wave.open(str(path), 'rb') as reader:
        require((reader.getnchannels(), reader.getsampwidth(), reader.getframerate(), reader.getnframes())
                == (channels, 2, rate, total_frames), 'independent WAV reader disagrees')
        for step, count in zip(source['steps'], lengths):
            if item['shape']:
                values = read_pcm(reader, count)
                blocks = [values]
                maximum_error = max(maximum_error, reference_error(values, count, rate, channels, step))
            else:
                def stream_blocks():
                    remaining = count
                    while remaining:
                        size = min(4096, remaining)
                        yield read_pcm(reader, size)
                        remaining -= size
                blocks = stream_blocks()
            first, last = None, None
            for values in blocks:
                if first is None:
                    first = values[0]
                last = values[-channels]
                require(max(map(abs, values)) <= math.ceil(32767 * step['amplitude']), 'headroom exceeded')
                if channels == 2:
                    require(values[::2] == values[1::2], 'stereo channels differ')
            require(first == 0 and last == 0, 'nonzero fade endpoint or incorrect step boundary')
        require(reader.readframes(1) == b'', 'unexpected trailing frames')
        result = {'name': item['name'], 'frames': total_frames, 'bytes': expected_bytes,
                  'maximum_reference_error_lsb': maximum_error if item['shape'] else None,
                  'render_milliseconds': item['renderMilliseconds']}
        if item['frequency']:
            result['frequency'] = frequency_result(reader, source['steps'][0]['frequency_hz'])
    digest = hashlib.sha256()
    with path.open('rb') as stream:
        for block in iter(lambda: stream.read(1024 * 1024), b''):
            digest.update(block)
    result['sha256'] = digest.hexdigest()
    return result


def main():
    start = time.monotonic()
    directory = Path(sys.argv[1]).resolve()
    manifest = json.loads((directory / 'manifest.json').read_text(encoding='utf-8'))
    results = []
    for item in manifest['cases']:
        result = verify(directory, item)
        results.append(result)
        print(f"PASS {result['name']}: {result['frames']} frames, {result['bytes']} bytes", flush=True)
    hashes = {result['name']: result['sha256'] for result in results}
    require(hashes['repeatability-a'] == hashes['repeatability-b'], 'repeat exports differ')
    report = {'python': platform.python_version(), 'platform': platform.platform(),
              'node': manifest['node'], 'source_sha256': manifest['sourceHashes'],
              'working_tree_base_commit': manifest['workingTreeBaseCommit'],
              'working_tree_dirty': manifest['workingTreeDirty'],
              'elapsed_seconds': time.monotonic() - start,
              'cases': results, 'repeatability': 'PASS'}
    (directory / 'report.json').write_text(json.dumps(report, indent=2), encoding='utf-8')
    print(f"PASS {len(results)} independent file checks; report: {directory / 'report.json'}")


if __name__ == '__main__':
    main()
