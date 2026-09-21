# RPDI Methodology

**Reality-Portrayal Distortion Index** — an original composite-index framework measuring historical distortion in cinema. Author: Arjun Pathi.

RPDI separates two independent things:
- **D (Distortion Score)** — how factually accurate a film's claims are
- **L (Liberty/Portrayal Score)** — how the film constructs its portrayal through cinematic technique

Combined into a composite **RPDI**, plus a third original metric, **Gap**, identifying films that are factually accurate but narratively manipulative — "cinematic gaslighting."

---

## 1. Core Formulas

```
D    = 1 − (Σ weight × accuracy) / (Σ weight)
L    = (wS·S + wP·P + wF·F + wE·E) / (wS + wP + wF + wE)
RPDI = 0.6(D) + 0.4(L)
Gap  = |D − L|
```

## 2. The Five Weight Tiers

| Weight | Tier | Definition |
|---|---|---|
| 5 | Spine | Central premise — story collapses without it |
| 4 | Soul | Character motivation — why someone did what they did |
| 3 | Skeleton | Major documented historical events |
| 2 | Flesh | Personal/biographical/relationship details |
| 1 | Skin | Visual/costume/prop/setting accuracy |

An earlier 4-tier system (weights 4-3-2-1) was replaced — Weight 4 wasn't heavy enough to separate a film's central premise from ordinary plot points.

## 3. Dynamic Claim Distribution Quota

Claims are distributed as **fixed percentages** of the total, not a fixed count (20 is a minimum, not a ceiling; 50 is the maximum):

| Tier | % of Total | Special Rule |
|---|---|---|
| Spine | 10% | Hard-capped at 3 claims regardless of total; always rounds down |
| Soul | 15% | Rounds to nearest whole |
| Skeleton | 25% | Rounds to nearest whole |
| Flesh | 25% | Rounds to nearest whole |
| Skin | 25% | Absorbs any rounding remainder |

At exactly 20 claims this produces 2/3/5/5/5 (weight sum 52) — the original fixed quota this replaced. Verified against every film scored so far (20-, 21-claim sets all land on quota exactly).

**Claim count is capped at 50**, enforced in the input field and calculation logic. Skin's share of total *weight* stabilizes around 13–15% even at high counts, but the Skin-to-Spine *claim ratio* grows unbounded (2.5x at 20 claims → 22x at 200) — capping at 50 keeps this meaningful.

## 4. Accuracy Scoring — Two Scales

**Default** (used for the large majority of claims): 0, 0.25, 0.5, 0.75, 1.0

**Extended** (reserved for genuine nuance the default scale can't capture): 0.0–1.0 in 0.1 steps

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
| 0.8 | Well Documented (single source / family account) |
| 0.9 | Strong Primary Verification |
| 1.0 | Fully Verified (2+ independent sources) |

Claims can be left **PENDING** (accuracy blank) at capture time and scored later after real research, so accuracy decisions don't get rushed while watching. Pending claims are fully excluded from D calculation and from Spine-Floor checks until scored.

## 5. Ceilings and Exceptions

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

These ceilings are intuition-calibrated, not mathematically derived — stated plainly here, not dressed up as more precise than they are. They were revised once from an earlier draft (0.8/0.8/0.8/0.7/0.2) to current values.

**The 1.0 Requirement:** 1.0 is never a default — it requires two or more independent sources confirming the exact same claim, with extra weight on Spine claims specifically since an unearned 1.0 on a film's central premise is the single most damaging place for bias to hide. **This is currently not enforced in code** — only documented. See LIMITATIONS.md.

## 6. The L Score — Cinematic Portrayal Technique

L measures craft-level portrayal choices, NOT audience emotional response. Distinct from D: D asks whether a claim is true; L asks how the film chose to show it.

| Dimension | 0.0 | 1.0 |
|---|---|---|
| S — Simplification | Full complexity preserved | Heavily reimagined, minimal resemblance to real structure |
| P — Portrayal | Fully realistic, balanced | Near-superhuman/symbolic |
| F — Framing | Fully balanced, multiple perspectives | One-sided, opposing views absent |
| E — Exaggeration | Real-world physical constraints | Defies physical/logical constraints |

All four dimensions default to weight 1. A weight may only be raised with specific, citable evidence from the film itself — never genre assumption alone.

**Per-dimension evidence (critical fix, this session):** previously a single shared evidence text box covered all raised weights. This was a real, live bug, proven using RRR's own saved data: F and E were both weighted to 2, but the single shared evidence string only genuinely justified E (a quote about "hyper-physics" and exaggerated action) — nothing in it justified Framing. **Each raised dimension now gets its own independent, required evidence field.** Old saved films with the shared-evidence format auto-migrate on load, with the text copied into each raised dimension but flagged `[MIGRATED — VERIFY THIS ACTUALLY JUSTIFIES THIS SPECIFIC DIMENSION]`. RRR's Framing weight-2 evidence still needs this re-verification.

## 7. The Spine-Floor Rule

If any Spine-tier claim scores ≤0.2, OR the tagged Absolute Premise claim scores ≤0.3, the final classification cannot register below "High" — regardless of the raw weighted average. Raw D still calculates and displays unchanged; only the label overrides.

**Why it exists:** a film with one fully fabricated Spine claim and otherwise-excellent accuracy across 20 claims produced D=0.153 ("Minimal"). At 60 claims, D dropped further to 0.093 — dilution got *worse*, not better, as claim count grew.

**Why it's an override and not a bigger weight:** raising Spine's weight to 6 still failed — the dilution just took longer (still landed "Minimal" even with 100+ extra accurate claims added). A bigger weight is still a vote that can be outvoted; the floor is a disqualifier.

**Proven on real data:** fired correctly on Dhurandhar's fabricated spy character and RRR's fabricated central friendship, independent of whether the composite RPDI would've reached "High" on its own. Correctly stays silent on Amaran and Sardar Udham, where no Spine claim and no Absolute Premise claim drops that low.

## 8. Absolute Premise Tag

One claim per film (Spine tier only) can be flagged as the single most central plot point — triggers the same Spine-Floor override at a more lenient 0.3 threshold, since it's already identified as the most consequential claim.

## 9. The Gap Metric

```
Gap = |D − L|
```

Measures the distance between factual accuracy and dramatization intensity — NOT a claim about intent. A film can produce a large Gap without anyone intending to deceive; Gap measures effect, not motive.

"Director Manipulation" and "Directional Accuracy" were considered and rejected as names — the former implies knowledge of intent the framework can't actually measure.

**Classification** (same neutral 0/.25/.5/.75/1 scale as RPDI, explicitly provisional):

| Score | Classification |
|---|---|
| 0.00–0.24 | Honest / Consistent |
| 0.25–0.49 | Partially Misleading |
| 0.50–0.74 | Gaslighting |
| 0.75–1.00 | Extreme Gaslighting |

Thresholds are provisional — to be revisited once a larger real dataset exists, checking whether real breakpoints (possibly ~0.26/0.41) are better supported than the current clean-quarter values.

## 10. The 0.6/0.4 RPDI Weighting

D counts for more because a film's first job is to tell you what happened; what it makes you feel comes second. Not purely arbitrary — supported by original survey data (n=23): 91% agreed inaccurate historical films can negatively affect public understanding of real history; 65% named historical accuracy as what matters most when watching. This justifies the *direction* (D > L), not the *exact* numbers — a design decision, stated honestly as such.

## 11. Three Additional Rules (added this session)

**A. First-Encounter Rule** — closes a bias gap the quota alone didn't cover: the quota controls which *tier* gets how many claims, but not which *specific claim within a tier* gets picked when multiple candidates exist. Fix: claims are logged in the order narratively encountered, decided on significance/specificity alone — never on a prediction of how they'll score. Once logged, a claim cannot be swapped for a "better" one in the same tier. Only valid removal reason: structural defect (too vague, not a real checkable assertion) — never preference.

**B. Generalization Validity Rule** — caught via RRR: a specific British character, Jenny, helps Komaram Bheem — this cannot be reworded into "the British were helpful to Indians," a sweeping claim about an entire nationality from one instance. Two parts: (1) No solo generalization — an individual's specific action can never be reworded into a claim about their nationality/group. (2) Generalization requires a real repeated pattern across multiple distinct instances, not one scene — even then, capped at 0.3 (same logic as the mythology-only ceiling).

**C. Tier Assignment Decision Procedure** — caught via RRR's derailment scene (where the two protagonists meet): is it Flesh (personal/relationship-introduction detail) or Spine (the scene the entire fictional plot depends on)? Fix, applied in strict order:
1. **Spine Test, always checked first:** "If this claim were false, does the film's central premise structurally stop holding together — not just become less compelling, but stop making sense as the story it claims to be?" If yes → Spine, regardless of surface content (the 2–3 claim cap still governs how many claims can actually hold this tier).
2. **If Spine fails, classify by content type:** Soul asks *why* (motivation); Skeleton asks *what documented event*; Flesh asks *personal/relationship detail, not load-bearing, not broadly historical*; Skin asks *purely visual, no bearing on plot/motive*.
3. **Exhaustiveness guarantee:** if a claim fits nowhere, it's too vague — tighten it, never discard it.
4. **Hybrid claims split** into separate claims per content type rather than being forced into one tier.

All three rules are live in the app's Rules Reference tab. See RULES.md for the operational reference version.
