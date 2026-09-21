# RPDI Rules Reference

Operational rules the scoring tool enforces or guides the rater through, in the order they apply during scoring. This mirrors the app's in-tool Rules Reference tab. For the underlying formulas and scoring scales, see METHODOLOGY.md.

## 1. Tier Assignment Decision Procedure

Applied to every claim before it's logged, in strict order:

1. **Spine Test (always first):** would the film's central premise stop making sense as the story it claims to be if this claim were false — not just become less compelling? If yes → Spine, regardless of surface content. The 2–3 claim hard cap still governs how many claims can actually hold this tier.
2. **If Spine fails, classify by content type:**
   - Soul → asks *why* (motivation)
   - Skeleton → asks *what documented event*
   - Flesh → personal/relationship detail, not load-bearing, not broadly historical
   - Skin → purely visual, no bearing on plot/motive
3. **Exhaustiveness guarantee:** if a claim fits nowhere, it's too vague — tighten it, never discard it.
4. **Hybrid claims** split into separate claims per content type rather than forced into one tier.

## 2. First-Encounter Rule

Claims are logged in the order narratively encountered, chosen on significance/specificity alone — never on a prediction of how they'll score. Once logged, a claim cannot be swapped for a "better" one in the same tier. The only valid removal reason is a structural defect (too vague, not a real checkable assertion) — never preference for how it might score.

## 3. Generalization Validity Rule

1. **No solo generalization** — an individual's specific action can never be reworded into a claim about their nationality or group (e.g. one British character helping one Indian character ≠ "the British were helpful to Indians").
2. **Generalization requires a real repeated pattern** across multiple distinct instances, not one scene — and even then, capped at 0.3 accuracy (same logic as the mythology-only-source ceiling).

## 4. Quota Lock-Out

A tier's dropdown option disables once its dynamic quota (METHODOLOGY.md §3) is full for the current claim count. Editing an already-logged claim temporarily unlocks its own tier so it can be re-saved.

## 5. Accuracy Ceilings

Claim type determines a soft ceiling on accuracy (see METHODOLOGY.md §5). The app suggests a ceiling by keyword match — this is a suggestion only, never an auto-assignment. The rater always makes the final call.

## 6. Spine-Floor Override

If any Spine-tier claim scores ≤0.2, or the tagged Absolute Premise claim scores ≤0.3, the film's classification label cannot register below "High," regardless of the raw weighted RPDI. Raw D/L/RPDI still display unchanged — only the label is overridden. See METHODOLOGY.md §7 for the reasoning and evidence this is based on.

## 7. Duplicate / Near-Duplicate Claim Caution

Fuzzy, transposition-aware matching (Damerau-Levenshtein) with an overlap-coefficient similarity score (threshold 0.6), tuned to catch typo'd/paraphrased duplicates of very different lengths. Flags, does not block — the rater decides whether it's a true duplicate.

## 8. Per-Dimension L-Score Evidence

Any of the four L dimensions (S/P/F/E) raised above weight 1 requires its own independent, specific, citable evidence from the film itself — never genre assumption, and never another dimension's evidence reused. See METHODOLOGY.md §6.

## 9. Pending Claims

Accuracy can be left blank ("Pending") at capture time. Pending claims are fully excluded from D calculation and from Spine-Floor checks until scored — a claim never silently counts as 0 or as passing the floor check while pending.

## 10. The 1.0 Requirement (documentation-only — not yet code-enforced)

1.0 accuracy should only be assigned when two or more independent sources confirm the exact same claim, with extra scrutiny on Spine claims. The tool does not currently block a 1.0 entry that lacks this — see LIMITATIONS.md.
