# Portable programme package contract v1

23 October 2026. **PROPOSED CONTRACT — not implemented or an amendment to the existing sequence API.** Resolves the missing binding between a catalogue programme, its rendering contract and retained audio. Applies to the proposed mobile/catalogue package workflow, not ordinary WAV loading in the current desktop player. See [data ownership](Catalogue-and-Data-Architecture.md) and [release gates](Release-Readiness.md).

## Logical package and identity

A package consists of an immutable UTF-8 JSON manifest and one canonical PCM16 WAV asset. This does not require a ZIP/archive format or create archive extraction support. Download locations/access tokens are transport metadata returned separately by the trusted API; they are not executable manifest instructions, local paths or permission to fetch arbitrary URLs.

| Required manifest member | v1 contract |
| --- | --- |
| `manifest_version` | Integer `1`; reject unsupported versions and unknown executable fields rather than guessing compatibility |
| `programme` | Object containing `programme_id`, positive integer `revision`, `waveform_contract_version`, `sample_rate_hz`, `channels` and ordered `steps` |
| `programme_sha256` | Lowercase 64-hex SHA-256 of the RFC 8785 canonical UTF-8 bytes of the complete `programme` object [S70/S71] |
| `rendering` | `engine_id`, `engine_version` and immutable `engine_build_sha256`; must identify a reviewed build and supported waveform contract, not an inferred app version |
| `asset` | `media_type` equal to `audio/wav`, `encoding` equal to `pcm_s16le`, `sample_rate_hz`, `channels`, `frame_count`, `byte_length`, and `sha256` over exact WAV bytes |
| `provenance` | Bounded array of source/entry IDs and immutable revisions, attribution, rights disposition and evidence labels as recorded at packaging. May be empty for synthetic/user-authored programmes; no private source text or credentials |

Programme steps require exactly `waveform`, `frequency_hz`, `duration_microseconds` and `amplitude`. Shapes are sine, band-limited square or triangle under the existing [v0.4 mathematical specification](wiki/Signal-Specification.md); rates are 44,100/48,000 Hz, channels 1/2, frequency 20–10,000 Hz, amplitude >0 to 0.8, duration 100,000–300,000,000 integer microseconds, 1–100 steps and at most 300,000,000 total microseconds. These inherit the current numerical limits rather than introduce sweep support. Future transitions, sweeps or other shapes require a new supported waveform contract and explicit capability checks.

Programme IDs/revisions participate in the programme hash; two separately identified revisions are not the same package merely because their samples happen to match. User identity, access tokens and mutable favourites/preferences are outside the portable programme. The API owns authorization and the namespace of IDs; manifest claims alone never grant ownership or official publication status.

## Canonicalization and render binding

Reject duplicate JSON keys, invalid UTF-8, non-finite values, invalid types and out-of-range integers before acceptance. Use RFC 8785 canonicalization, preserving ordered arrays and its numeric/string rules [S70]; do not use ordinary serializer property order as a cross-language hashing specification. Executable frequencies/amplitudes use the validated finite numeric domain of the existing engine; arbitrary-precision source text remains in research provenance, not silently rounded into executable settings.

Translate `duration_microseconds` to the existing sequence field `duration_seconds` through its exact six-decimal representation, then run authoritative planner validation. Do not change the current `/api/v1/exports` schema or round each step independently. Compute expected cumulative frames and canonical WAV length using the existing contract; compare programme, planned output and actual WAV header/channel/rate/frame/byte values. The manifest asset rate/channels must equal the programme settings.

`programme_sha256` binds settings and identity; `asset.sha256` binds exact audio bytes. A trusted API catalogue snapshot also supplies a digest of the entire canonical manifest, binding provenance, renderer and asset metadata together. Store that expected manifest digest separately; do not introduce a self-referential hash field. No field may be rewritten after publication. Updated settings, provenance or renderer/asset bindings produce a new manifest/revision record as appropriate, not an in-place edit under an old digest.

SHA-256 is an integrity digest, not a signature or evidence of publisher authenticity [S71]. Official packages obtain their expected manifest digest through the configured authenticated/TLS catalogue endpoint and access policy. A copied self-consistent manifest/WAV pair is not automatically official. General file imports are labelled local/unverified; no publication, evidence or ownership claim is trusted from imported JSON. Offline third-party official-package verification would require a separately approved signing/trust/key-rotation scheme; v1 does not invent one or claim that capability.

## Validation, retention and failure behaviour

1. Check manifest schema/version, rights/evidence display data and supported engine/contract compatibility against an explicit supported-version matrix. App version equality is not a substitute for that matrix.
2. Enforce a manifest limit of 1 MiB and WAV limit of 64 MiB, reusing current bounded-input/file ceilings. Reject oversized metadata rather than drop attribution. Stage downloads privately; reject truncated, oversized or unexpected content.
3. Verify the trusted manifest digest, programme digest, WAV byte digest and metadata/frame/size binding before atomically promoting a package as verified. Native integrity verification uses bounded platform file I/O off the UI thread; no browser sample loops, synthesis, large-buffer hashing or numerical analysis is authorized. A client without an approved integrity adapter must report that capability unsupported.
4. Persist the manifest, WAV, expected digests, validation result, contract/build identity and last-known distribution status together. Never expose a verified-cache record while only one component is committed. Corruption or mismatch quarantines the package and blocks its verified playback path; redownload/revalidation is explicit.
5. Unknown contract/build compatibility, stale or missing assets, identity namespace conflicts and withdrawal states fail visibly. A valid older package remains pinned without rewriting its settings; support/deprecation and withdrawal policy govern whether it can be used.

The existing desktop loader performs bounded WAV header validation, not this package protocol; do not relabel its ordinary files as catalogue-verified. A retained valid public package can play without API/IdP connectivity, subject to the honest last-known withdrawal status. Changing accounts never transfers ownership of private packages or queued changes; see [identity-bound cache rules](Identity-and-Security-Architecture.md#identity-bound-cache-and-outbox).

## Required contract tests before adoption

Cross-language canonicalization vectors must cover key order, numeric/string representation, duplicate keys, ordered steps and integer duration boundaries. Reject a changed sample rate, waveform, programme revision, altered PCM byte, wrong frame count, substituted renderer/asset, untrusted manifest digest and partial promotion. Check supported-old/unknown contract versions, interrupted downloads, storage exhaustion, restart and raw-file import labelling. Test vectors are future implementation work; none were executed in this documentation-only task.
