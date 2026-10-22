# Frequency-list review

Reviewed: 22 October 2026. Investigation INV-09. **Source labels and user reports are not validated treatment specifications.** No third-party database is bundled or redistributed by this review.

## Supplied presentation and provenance

An owner-supplied 18-slide presentation titled *Rife frequency list for Rife frequency generator* was inspected read-only [S27]. Its slide footers show 3 January 2016 and link to [Dragonfly75's list](https://www.dragonfly75.com/eng/freq-list.html). The inspected webpage introduction and selected entries match the supplied material [S28]. The footer is not an established publication/research date; file creation metadata does not identify the original compiler.

The introduction describes user-reported experiences and limited scientific investigation. This records the author's description, not independent validation.

## Engineering observations

| Observed structure | Import implication |
| --- | --- |
| Individual numbers and decimals | Preserve precision and establish units; do not infer settings from labels |
| Lists mixed with numeric ranges and sweep notes | Distinguish fixed steps from ranges; endpoints alone do not define sweep duration or curve |
| Occasional timing prose, but no uniform per-entry duration | Require explicit duration or an acknowledged user-selected default |
| No consistent waveform/amplitude/duty-cycle fields found | A numeric list alone cannot reconstruct a signal |
| Values below 20 and above 10,000 | Flag values outside the adopted file-generator contract; never silently divide or shift them |
| Ambiguous characters, including 7l7 on slide 14 | Require manual review; do not auto-correct to a guessed number |
| Fragmented slide text and line wrapping | Extraction can merge separate numeric tokens; validate against layout/original source |

No exact frequency presets are reproduced here. The presentation and original source remain third-party material. No explicit redistribution license was found in inspected slide text; online availability does not resolve reuse rights.

## Spooky2 landing page

The [Spooky2 frequency-list page](https://www.spooky2-mall.com/download-rife-frequency-list/) advertises a compilation from multiple named sub-databases [S26]. The download and terms links returned access errors during inspection. The actual dataset, field definitions, provenance, and licenses were not reviewed. Promotional claims of proven effects are not adopted as project evidence.

The supplied presentation is not established to be the advertised Spooky2 database.

## Candidate neutral import record

Proposed fields: source reference/version, original label, original numeric text, units, explicit fixed-frequency or sweep type, duration, waveform, amplitude representation, and review status. Preserve duplicates and ordering until the source semantics are established. Never silently turn medical labels into recommendations.

This is a schema proposal, not an implementation. Resolve ranges, ambiguous units, invalid characters and missing values visibly. Use newly authored synthetic fixtures for public tests while third-party rights remain unresolved.

## Completion status

Answered: a real list is accessible, its source link is known, and several parsing problems are identified.

Open: redistribution rights, compiler/version provenance, units for every entry, settings required for execution, and a reviewed import specification. INV-09 remains in progress.
