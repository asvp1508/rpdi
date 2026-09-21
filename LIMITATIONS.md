# RPDI Limitations

Honest, explicit documentation of known gaps in the framework and the tool — not hidden, not dressed up as more solved than they are.

## Framework Limitations

**Ceilings are intuition-calibrated, not derived.** The accuracy ceilings by claim type (METHODOLOGY.md §5) come from judgment about how confident a claim type can reasonably be, not from a formula. They were revised once already as that judgment improved. Treat them as a considered starting point, not a constant.

**Gap thresholds are provisional.** The four Gap bands (Honest / Partially Misleading / Gaslighting / Extreme Gaslighting) currently sit on clean quarter-boundaries (0.25/0.50/0.75) for simplicity, not because those are the empirically correct breakpoints. Should be revisited once a larger real dataset exists — possibly something like 0.26/0.41 instead.

**The 0.6/0.4 RPDI weighting is a design decision, not a derived constant.** Original survey data (n=23) supports the *direction* — that factual accuracy (D) should outweigh portrayal technique (L) — but not the specific 0.6/0.4 split. A different split within reason would be equally defensible from the same survey.

**Single-rater subjectivity.** Every claim's accuracy score, tier assignment, and L-dimension weight is currently assigned by one rater (the author). The First-Encounter Rule and Tier Assignment Decision Procedure reduce but don't eliminate this — a second independent rater scoring the same film would be the real test of consistency, and hasn't been done yet.

**AI-assisted rule brainstorming.** Several edge-case rules (ceilings, the Spine-Floor mechanism, ceiling values) were developed with AI assistance in identifying and stress-testing edge cases. This is openly disclosed (see Post 5) as a feature of the project's process, not something to hide.

## Tool (Code) Limitations

**The 1.0-requires-two-sources rule is documentation-only.** METHODOLOGY.md §5 states that a 1.0 accuracy score should require two independent confirming sources, with extra scrutiny on Spine claims. The tool does not currently enforce or check this at entry time — a rater could assign 1.0 to a single-source claim and nothing would flag it. Documented, not yet closed.

**Speech-to-text does not work in this hosted environment.** Built with real feature detection and wired up correctly, but the browser reports a `not-allowed` microphone permission error — a platform-level sandbox restriction of this specific hosting environment, not a bug in the code. Would likely work if the tool were hosted elsewhere (e.g. Vercel). Explicitly deprioritized rather than worked around.

**No automated stress-test suite for the current web app.** The original Python CLI prototype has 9 passing tests, but they test the *deprecated* rule set (fixed 20-claim quota, old ceiling values) and were archived once the web app became primary. The current vanilla-JS web app has no automated tests — verification so far has been manual (independent recalculation against saved film data) rather than a real test suite.

**RRR's Framing (F) weight-2 evidence needs re-verification.** Before the per-dimension evidence fix (METHODOLOGY.md §6), RRR's F and E dimensions shared one evidence string that only actually justified E. The migrated evidence is flagged `[MIGRATED — VERIFY THIS ACTUALLY JUSTIFIES THIS SPECIFIC DIMENSION]` in the saved data but has not yet been re-confirmed with dedicated Framing-specific evidence.

**Storage is per-artifact, not backed up externally by default.** The tool's durable store (an artifact database) survives page reloads and republishes, and is the source of truth — but Export All / Import All is the only external backup path, and it's optional/manual. Two full film scorings were permanently lost earlier in development when localStorage (then the source of truth) did not survive a tool republish; that's what triggered the current db-backed architecture, but it's still worth periodically exporting.

## Open Data Questions (not code bugs, need author judgment)

- Amaran has no claim tagged Absolute Premise, unlike Dhurandhar/RRR/Sardar Udham — confirm whether that's intentional for this film or an oversight during scoring.
- Amaran's RPDI (0.2735) sits close to the Moderate/Minimal classification boundary (0.25) — worth knowing if classification-boundary sensitivity is ever discussed.
