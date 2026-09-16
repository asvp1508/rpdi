# RPDI — Reality-Portrayal Distortion Index

An original composite-index framework measuring historical distortion
in cinema, separating factual accuracy (D) from cinematic portrayal
technique (L).

## The Formula
D = 1 − (Σ weight × accuracy) / (Σ weight)
L = (wS·S + wP·P + wF·F + wE·E) / (wS+wP+wF+wE)
RPDI = 0.6(D) + 0.4(L)
Gap = |D − L|

## Repo Structure
- METHODOLOGY.md — full process, formulas, definitions
- RULES.md — ceilings, scoring scale, claim distribution quota
- LIMITATIONS.md — known gaps, stated honestly
- data/ — scored film datasets
- website-code/ — source for the public RPDI Score site
- app-code/ — source for the interactive scoring tool
- tool/ — Python engine + stress tests

## Status
One film (RRR) currently scored under the full current methodology.
Framework designed to scale to more.

Live scoring tool: [your artifact link]
Live results site: [your Vercel link]
Essay series documenting development: [Medium/Substack link]
