# RPDI — Reality-Perception Distortion Index

An original composite-index framework measuring historical distortion
in cinema, separating factual accuracy (D) from cinematic portrayal
technique (L).

## The Formula
D = 1 − (Σ weight × accuracy) / (Σ weight)
L = (wS·S + wP·P + wF·F + wE·E) / (wS+wP+wF+wE)
RPDI = 0.6(D) + 0.4(L)
Gap = D − L   (signed: negative = Gaslighting, positive = Sanitized Fabrication)

## What is in this repository
- methodology.md — full process, formulas, definitions
- RULES.md — the operational rules the scoring tool applies
- LIMITATIONS.md — known gaps, stated honestly
- rpdi_internal_benchmark_report.md — statistics for the 16 scored films
- index.html — source of the public results site
- rpdi_scoring_tool — source of the scoring tool (a single HTML file)

## Status
16 films scored, project closed. Two of the 16 (All the President's Men and
U-571) were scored by AI as stress tests, and RRR was rescored as a stress
test; the results site marks all three.

- Results site: https://rpdi-phi.vercel.app
- Scoring tool: https://arjun-pathi-portfolio.vercel.app/rpdi-tool/

## Write-up
The development is written up as an 11-part series on Medium:

1. [There's No Rating for How Much a Movie Bends History. So I Started Building One.](https://pathiarjun15.medium.com/part-1-the-movie-rating-that-had-to-exist-9460731cd9d5)
2. [Not Every Historical Mistake in a Movie Deserves the Same Punishment](https://pathiarjun15.medium.com/part-2-not-every-mistake-in-a-movie-deserves-the-same-punishment-f55eb8812bd4)
3. [A Film Can Get the Facts Right and Still Show Them Wrong](https://pathiarjun15.medium.com/part-3-why-cinematic-portrayal-mattered-more-than-youd-expect-2d1d3fefb01f)
4. [A Spreadsheet Mistake Showed Me the Gap Between History and How Films Show It](https://pathiarjun15.medium.com/part-4-how-i-accidently-discovered-the-distance-between-truth-and-portrayal-b929852fd073)
5. [Why My Film-Scoring Rule Kept Breaking Itself](https://pathiarjun15.medium.com/part-5-the-rule-that-kept-breaking-itself-390edbc52db8)
6. [Building a Scoring Tool Exposed a Loophole in My Own Rules](https://pathiarjun15.medium.com/part-6-how-the-new-tool-introduced-a-new-rule-c516c3ee4b9c)
7. [How Historically Accurate Is Dhurandhar? Scoring It Claim by Claim](https://pathiarjun15.medium.com/part-7-scoring-dhurandhar-1-the-first-real-test-16bb30ad817f)
8. [Two Scored Films Lost to a Bug, and the Tool I Rebuilt After](https://pathiarjun15.medium.com/part-8-four-films-down-so-is-the-tool-d19964a8f2cc)
9. [What Happens When You Score a Film That Was Built to Be Accurate](https://pathiarjun15.medium.com/part-9-the-hollywood-scores-and-the-gap-revamp-b09832f7cb60)
10. [Can AI Score a Film's Historical Accuracy? I Let Gemini Try](https://pathiarjun15.medium.com/part-10-the-ai-automation-stress-test-03123c512058)
11. [16 Films, One Index: What I Learned Measuring How Movies Bend History](https://pathiarjun15.medium.com/part-11-everything-rpdi-is-all-at-once-48f0fdc6560c)

The posts record the rules as they were at each stage. Where a rule changed
later (the Spine-Floor Rule, the Gap classification), methodology.md and
RULES.md hold the current version.
