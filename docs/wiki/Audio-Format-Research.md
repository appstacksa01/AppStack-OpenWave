# Audio-format research

Reviewed: 22 October 2026. Investigations INV-01, INV-04, INV-07. Distinguish generic audio capability, proposed OpenWave export choices, and verified playback-device compatibility.

## Strongest platform reference

[Android's Sampling audio guidance](https://developer.android.com/ndk/guides/audio/sampling-audio) recommends fitting the device's rate, typically 44.1 or 48 kHz, and avoiding unnecessary resampling. It describes float processing and possible resampling artifacts [S22]. This informs platform research; it is not an Electro-Med specification.

## Background articles

[Retekess: Understanding Sample Rates in Digital Audio](https://www.retekess.com/blog/understanding-sample-rates-in-digital-audio), dated 13 August 2025, explains common rates and bit depth [S23]. It is introductory vendor material. General claims that higher rates automatically improve fidelity should not become acceptance criteria. Signal bandwidth, filtering, implementation, and the output path matter.

The [Soundrolling article](https://www.soundrolling.com/learn/sample-rate-and-bit-depth-for-picture) was located, but its body could not be retrieved [S24]. No technical findings are attributed to its unseen content.

The R&S UPV/UPL documents supplied earlier describe laboratory analysers, not the reference machine or the Appsage app [S20–S21].

## Working interpretation

- Sample rate describes samples per second, not the selected tone's frequency.
- Bit depth describes amplitude quantization, not terminal voltage or available electrical power.
- Internal floating-point processing and exported PCM bit depth are separate choices.
- A sine and a square with the same fundamental have different spectral requirements. Square-wave harmonics must be handled by a defined band-limited method.
- Device playback can introduce resampling, filtering, clipping, routing changes and gain differences even when the exported file is correct.

The adopted v0.3 [specification](Signal-Specification.md) is the project's file contract, not evidence that existing products accept every setting. Backend digital results are recorded separately; no physical playback matrix has been verified. Platform audio adapters must preserve this distinction and consume output from the same authoritative engine.

## Other soundscape reference

The [12D Foundation golden-ratio page](https://12dfoundation.org/golden-ratio) was read through its rendered page [S25]. It presents listening exercises, named tones, subjective feedback, and general-wellness claims. The inspected page does not provide a reproducible golden-ratio synthesis algorithm or complete audio-format specification. Its displayed survey percentages lack sufficient study detail on that page to establish a causal frequency-specific effect.

Classify this as a soundscape/interface and claims reference. It does not change the signal specification or establish device compatibility. Do not adopt its interpretation of listener discomfort as proof of a beneficial mechanism.

## What remains to verify

The [mobile review](Mobile-Capabilities.md) now records USB-C audio feasibility and the [POC](Mobile-POC.md) separates file format from actual route format and loaded analog measurements. Android/iPhone audio APIs do not establish the reference player's supported sample rates, bit depths or channel formats. Offline local-file playback does not imply offline waveform generation. These distinctions leave INV-01/03 open.

For the reference player's USB path: WAV encoding, accepted rates/bit depths/channel counts, MP3 variants, storage constraints, track handling, and output behaviour. For external computer input: accepted levels, loading and bandwidth. Obtain a manual or use a qualified bench protocol; do not infer this matrix from generic audio articles.
