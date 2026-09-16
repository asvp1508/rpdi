# RPDI — Reality-Portrayal Distortion Index
## Full Methodology Document

---

## 1. Purpose

RPDI measures how much a historical film distorts documented reality, by separating two independent things: how factually accurate the film's claims are (D), and how the film constructs its portrayal through cinematic technique (L). The two scores are combined into one composite (RPDI), and a third measure (Gap) identifies films where accurate facts and manipulative portrayal coexist.

---

## 2. Inputs

- One film (title, year)
- A minimum of 20 extracted claims, shown on screen, distributed across five weight tiers per the quota below
- Four Feel-dimension scores (S, P, F, E) assessed once for the whole film

---

## 3. The Claim Weight System — 5 Tiers

| Weight | Tier | Definition |
|---|---|---|
| 5 | Spine | The central premise — the claim the film's entire story depends on |
| 4 | Soul | Character motivation — why someone did what they did, according to the film |
| 3 | Skeleton | Major documented historical events depicted |
| 2 | Flesh | Personal, biographical, or relationship details specific to real people |
| 1 | Skin | Visual accuracy — sets, props, costumes |

*(Note: an earlier 4-tier version — Plot Device/Character Motive/Personality Traits/Locations-Sets, weights 4-3-2-1 — was the first attempt. It was replaced by this 5-tier system after finding that Weight 4 wasn't heavy enough to separate a film's central premise from ordinary plot points.)*

---

## 4. The Fixed Claim Distribution (Dynamic, Percentage-Based)

Claims are distributed as fixed percentages of the total, not a fixed count — since 20 is a minimum, not a ceiling. This prevents selective claim extraction from skewing a film's score, at any scale.

| Tier | % of Total | Special Rule |
|---|---|---|
| Spine | 10% | Capped at 3 claims regardless of total; always rounds down |
| Soul | 15% | Rounds to nearest whole number |
| Skeleton | 25% | Rounds to nearest whole number |
| Flesh | 25% | Rounds to nearest whole number |
| Skin | 25% | Absorbs any rounding remainder |

At exactly 20 claims this produces 2/3/5/5/5 (weight sum 52) — the original fixed version this replaced.

Spine's cap and rounding-down rule exist because a film rarely has more than 1-2 claims its entire premise depends on. Scaling that number up with total claim count would pressure the researcher into promoting ordinary plot points to Spine status just to hit a ratio — exactly the kind of quiet bias this rule exists to prevent.

A film's D score is not treated as final until this distribution is met in full.

---

## 5. Accuracy Scoring — Two Scales, One Purpose

**Default scale (used for the large majority of claims):** 0, 0.25, 0.5, 0.75, 1.0

**Extended scale (reserved for claims with genuine, specific nuance the 5-point scale can't honestly capture):** 0.0 through 1.0 in increments of 0.1

| Score | Meaning |
|---|---|
| 0.0 | Completely Fabricated |
| 0.1 | Almost Entirely Fabricated |
| 0.2 | Heavily Fictionalized |
| 0.3 | Mostly Invented |
| 0.4 | More Fictional Than Factual |
| 0.5 | Equally Fictional and Factual |
| 0.6 | More Factual Than Fictional |
| 0.7 | Mostly Accurate |
| 0.8 | Well Documented (a single source heavily supports it — family account) |
| 0.9 | Strong Primary Verification |
| 1.0 | Fully Verified (2+ independent sources substantiate it) |

The extended scale should be used sparingly and only when a claim genuinely doesn't fit one of the five default points. Excessive use of it can reintroduce bias, which this model avoids.

---

## 6. Ceilings and Exceptions

| Claim Type | Ceiling |
|---|---|
| Dialogue / Exact Quote | 0.9 |
| Character Motivation / Intent | 0.75 |
| Romantic / Personal Relationship | 0.6 |
| Military Biopic Personal Life | 0.8 |
| Classified / Covert Operation | 0.6 |
| Costume / Visual, no photo evidence | 0.75 |
| Mythology-Only Source | 0.3 |
| Two Documents Contradict | Fixed at 0.5 |
| Two+ Independent Sources Confirm | Can reach 1.0 |

**Honest note on these numbers:** these ceilings are not mathematically derived. They are intuition and approximation, calibrated by eye against the 0.0–1.0 accuracy scale, and were revised once already from an earlier version because the new values felt more accurate in practice. This is stated plainly rather than presented as more precise than it is — the same standard applied to the 0.6/0.4 RPDI weighting below.

A ceiling constrains claim *type*, not scoring precision — it applies identically whether the default or extended scale is in use, and the stricter of (claim-type ceiling, source-verification ceiling) always wins.

**The 1.0 Requirement:** 1.0 is not a default outcome — it is a requirement, met only when two or more independent primary sources confirm the exact same claim. This applies with extra weight to Spine-tier claims specifically, since an unearned 1.0 on a film's central premise would be the single most damaging place for bias to hide.

---

## 7. The D Score (Distortion / Factual Accuracy)

D = 1 − (Σ weight × accuracy) / (Σ weight)


D measures pure factual accuracy against primary sources — nothing about how the film chose to portray those facts.

**Spine-floor consideration (identified, formalization in progress):** a film with one or more Spine-tier claims scoring very low (≤0.2) may need a classification floor beyond what the raw weighted average shows, since a fabricated central premise can be understated by the weighted average when outnumbered by accurate low-weight claims. This was identified during RRR's scoring and is not yet a finalized rule — currently handled as a manual review flag rather than an automatic override.

---

## 8. The L Score (Cinematic Portrayal Technique)

**Locked definition:** L measures the film's cinematic portrayal technique — the craft-level choices used to construct the story — not subjective audience emotional response. This is deliberately distinct from D: D asks whether a claim is true; L asks how the film chose to show it, independent of a viewer's personal reaction.

### The Four Dimensions

| Dimension | 0.0 | 1.0 |
|---|---|---|
| S — Simplification of Reality | No simplification, full complexity preserved | Extreme — heavily reimagined, minimal resemblance to real structure |
| P — Character Portrayal | Fully realistic, balanced strengths and flaws | Extreme exaggeration — near-superhuman or symbolic |
| F — Narrative Framing | Fully balanced, multiple perspectives presented | Extreme bias — one-sided, opposing perspectives absent |
| E — Cinematic Exaggeration | Fully realistic, real-world physical constraints | Extreme — defies physical or logical constraints |

### The Weighted L Formula

L = (wS×S + wP×P + wF×F + wE×E) / (wS + wP + wF + wE)


**The weighting rule:** All four weights default to 1 (equal). A dimension may only be raised above 1 with specific, citable evidence from the film itself — a director's stated intent, a documented pattern across multiple scenes, something concrete. Genre may suggest where to look for evidence, but genre alone is never sufficient justification to raise a weight. This mirrors the same evidence-based discipline already applied to the D-score ceilings — a claim's type doesn't get special treatment without proof, and neither does a portrayal dimension.

---

## 9. The Composite RPDI Score

RPDI = 0.6(D) + 0.4(L)


**Why D counts for more than L:** A historical film's first job is to tell you what happened; what it makes you feel about that comes second. This weighting is not derived from a deeper mathematical truth — it is a design decision, informed by a small original survey (n=23 respondents): 91% agreed that inaccurate historical films can negatively affect public understanding of real history, and 65% named historical accuracy as one of the things that matters most to them when watching. This supports the *direction* of the weighting (facts should count for more) but not the *exact* numbers — 0.6 and 0.4 could be defended differently, and are stated here as a reasoned starting point, not a proven constant.

### RPDI Classification

| Score | Classification |
|---|---|
| 0.00–0.24 | Minimal |
| 0.25–0.49 | Moderate |
| 0.50–0.74 | High |
| 0.75–1.00 | Extreme |

---

## 10. The Gap Metric

Gap = |D − L|


**What Gap measures:** the distance between a film's factual accuracy and the intensity of its dramatized portrayal — identifying cases where accurate facts and manipulative presentation coexist, independent of any claim about the filmmaker's intent. Gap does not measure motive; it measures a mismatch in effect. A film can produce a large Gap without anyone intending to deceive.

**Naming history:** early candidate names — "Director Manipulation," "Directional Accuracy" — were considered and rejected. "Director Manipulation" specifically was rejected because it implies knowledge of intent, which nothing in this framework can actually measure.

### Gap Classification

Uses the same scale as everything else in the framework — no separately-derived thresholds:

| Score | Classification |
|---|---|
| 0.00–0.24 | Honest / Consistent |
| 0.25–0.49 | Partially Misleading |
| 0.50–0.74 | Gaslighting |
| 0.75–1.00 | Extreme Gaslighting |

**Status of these thresholds:** provisional, stated explicitly as such. Once a real dataset of multiple fully-scored films exists, these boundaries should be revisited to check whether the real distribution of scores clusters and splits at these exact points, or whether sharper thresholds are better supported by the actual data. The thresholds should be earned by evidence, not assumed in advance.

---

## 11. Verified Scores To Date

No film has yet been fully verified under the current methodology (dynamic percentage quota + current ceilings). Earlier scoring work, including an initial pass on RRR, predates these rules and needs re-verification using the live scoring tool before any result is treated as final.

---

## 12. Known Limitations

- Accuracy scores rely on researcher interpretation of primary sources, constrained but not eliminated by the ceiling and exception system above.
- Ceiling values (Section 6) are intuition-based approximations, not mathematically derived, and were revised once already during development.
- The 0.6/0.4 D-vs-L weighting is informed by survey data but is a design decision, not a mathematically derived constant.
- The Gap classification thresholds are provisional, set from the same neutral scale used elsewhere in the framework, pending revision once a larger real dataset exists.
- The Spine-floor consideration (Section 7) has been identified as a real gap between the framework's stated logic and its mathematical behavior, but is not yet formalized as an automatic rule.
- No film has yet been fully verified under the current methodology.
- The framework's five-tier weighting and ceiling system reflect one researcher's judgment calls, documented explicitly so they can be examined, challenged, and revised — not presented as beyond question.

- 
