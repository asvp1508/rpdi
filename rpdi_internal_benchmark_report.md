# Internal Benchmark Report: 16-Film Historical Distortion Cohort (RPDI Framework)

## 1. Study Overview & Methodological Scope
This dataset analyzes historical narrative fidelity, cinematic portrayal, and distortion severity across an exploratory cohort of 16 feature films ($N = 16$). 

> **Methodological Boundary:** This sample is an exploratory convenience cohort rather than a globally randomized inferential sample. The metrics, quadrant categorizations, and correlation values represent an **internal benchmark** for this specific experimental group and must not be extrapolated as universal truths of global cinema.

---

## 2. Core Metrics & Central Tendency Baselines
Each film was evaluated across 20 to 21 distinct historical claims ($320+$ total claims analyzed). Any film within this experiment is benchmarked against the following cohort baselines:

| Metric | Description | Mean | Median | SD | Min | Max | IQR ($Q_1 \to Q_3$) |
| :--- | :--- | :---: | :---: | :---: | :---: | :---: | :---: |
| **$D$ (Distortion)** | Departures from historical factual record | 0.374 | 0.345 | 0.181 | 0.077 | 0.716 | 0.209 – 0.512 |
| **$L$ (Portrayal)** | Stylistic and dramatic exaggeration | 0.548 | 0.506 | 0.220 | 0.125 | 0.917 | 0.375 – 0.719 |
| **RPDI** | Compound distortion severity index | 0.443 | 0.443 | 0.180 | 0.096 | 0.796 | 0.305 – 0.567 |
| **Gap** | Directional narrative displacement | -0.174 | -0.183 | 0.164 | -0.536 | +0.137 | -0.276 – -0.103 |

### Cohort Correlations
* **$r(D, L) = 0.682$**: Moderate-to-strong positive correlation between raw distortion and dramatization.
* **$r(D, \text{RPDI}) = 0.934$ & $r(L, \text{RPDI}) = 0.898$**: Confirms that both distortion and portrayal strongly drive the composite index.
* **$r(L, \text{Gap}) = -0.592$**: Indicates that higher portrayal correlates with deeper displacement into negative Gap territory.

---

## 3. Four Functional Cohort Archetypes

```
                        High Portrayal (L)
                                ▲
                                │   [Mohenjo Daro]   [RRR (10)]
       Gaslighting Quadrant     │   [Bajirao Mastani]
      [The Kashmir Files (15)]  │   [Manikarnika]
                                │   [Tanhaji]
                                │
 Low Distortion (D) ────────────┼────────────► High Distortion (D)
                                │
       Honestly Accurate        │   [Saving Private Ryan (12)]
     [All the President's Men]  │   [U-571 (16)]
                                │
                                ▼
                        Low Portrayal (L)
```

1. **Grounded Anchor ($D < 0.10, L < 0.15$):**  
   *Title:* *All the President's Men* ($D=0.077, L=0.125, \text{RPDI}=0.096$).  
   *Function:* Serves as the negative control/factual anchor for documentary restraint.
2. **Sanitized Fabrications ($\text{Gap} > 0$):**  
   *Titles:* *Saving Private Ryan* ($\text{Gap}=+0.137$), *U-571* ($\text{Gap}=+0.137$).  
   *Function:* The only two titles with positive gaps; moderate dramatization deployed to sanitize or substitute wartime historical events.
3. **Core Mainstream Biopics ($D \approx 0.20\text{–}0.38, L \approx 0.31\text{–}0.69$):**  
   *Titles:* *Amaran*, *Gandhi*, *Oppenheimer*, *Rocketry*, *Sardar Udham*, *Shershaah*.  
   *Function:* Central cluster; macro-level historical timelines are largely respected while dialogic scenes are adapted for cinematic narrative.
4. **Maximalist / Mythic Spectacles ($D \ge 0.58, L \ge 0.75$):**  
   *Titles:* *RRR*, *Mohenjo Daro*, *Bajirao Mastani*.  
   *Function:* Inhabits the "Honestly Dramatized" quadrant where aggressive factual distortion is matched by extreme cinematic staging.

---

## 4. Deep Dive: Film #10 (*RRR*)
* **Maximum Outlier:** Holds the highest values in the entire cohort across three primary metrics:
  * $\max(D) = 0.716$
  * $\max(L) = 0.917$
  * $\max(\text{RPDI}) = 0.796$ (sole title classified as **Extreme**)
* **Quadrant Interpretation:** Situated in the extreme upper right of the $D \text{ vs. } L$ plane (**"Honestly Dramatized"**). The film makes no pretense of sober documentary fidelity; its departure is transparent, operatic, and mythic.
* **Gap Behavior:** Scores $-0.201$ (close to the dataset median of $-0.183$). The negative gap is driven by whole-cloth narrative invention rather than covert factual redaction.

---

## 5. Claim Hierarchy Benchmark (Anatomy of Accuracy)
Across all $320+$ evaluated claims, historical accuracy follows an anatomical hierarchy:

$$\text{Skin } (0.697) \approx \text{Skeleton } (0.693) > \text{Spine } (0.611) \ge \text{Soul } (0.600) > \text{Flesh } (0.534)$$

* **Skin ($0.697$ avg, $n=81$) & Skeleton ($0.693$ avg, $n=80$):** Surface aesthetics (visual motifs, uniforms) and chronological event milestones remain most intact.
* **Spine ($0.611$ avg, $n=32$) & Soul ($0.600$ avg, $n=48$):** Core premises and moral viewpoints are distorted roughly $40\%$ of the time.
* **Flesh ($0.534$ avg, $n=80$):** Interpersonal dialogue, unrecorded private moments, and connective dramatic scenes are the primary point of cinematic fabrication.

---

## 6. Master Cohort Dataset

| # | Title | $D$ | $L$ | RPDI | RPDI Class | Gap | Gap Class | Claims |
| :-: | :--- | :-: | :-: | :-: | :--- | :-: | :--- | :-: |
| 1 | All the President's Men | 0.077 | 0.125 | 0.096 | Minimal | -0.048 | Honest / Consistent | 20 |
| 2 | Amaran | 0.206 | 0.375 | 0.273 | Moderate | -0.169 | Gaslighting | 20 |
| 3 | Bajirao Mastani | 0.610 | 0.750 | 0.666 | High | -0.140 | Gaslighting | 20 |
| 4 | Dhurandhar 1 | 0.484 | 0.688 | 0.565 | High | -0.204 | Extreme Gaslighting | 20 |
| 5 | Gandhi | 0.212 | 0.563 | 0.352 | Moderate | -0.351 | Extreme Gaslighting | 20 |
| 6 | Manikarnika | 0.377 | 0.688 | 0.501 | High | -0.311 | Extreme Gaslighting | 20 |
| 7 | Mohenjo Daro | 0.583 | 0.900 | 0.710 | High | -0.317 | Extreme Gaslighting | 20 |
| 8 | Oppenheimer | 0.202 | 0.313 | 0.246 | Minimal | -0.111 | Gaslighting | 20 |
| 9 | Rocketry: The Nambi Effect | 0.196 | 0.438 | 0.293 | Moderate | -0.241 | Extreme Gaslighting | 20 |
| 10 | RRR | 0.716 | 0.917 | 0.796 | Extreme | -0.201 | Gaslighting | 21 |
| 11 | Sardar Udham | 0.279 | 0.375 | 0.317 | Moderate | -0.096 | Gaslighting | 20 |
| 12 | Saving Private Ryan | 0.512 | 0.375 | 0.457 | High | +0.137 | Sanitized Fabrication | 20 |
| 13 | Shershaah | 0.313 | 0.450 | 0.368 | Moderate | -0.137 | Gaslighting | 20 |
| 14 | Tanhaji | 0.490 | 0.688 | 0.569 | High | -0.197 | Gaslighting | 20 |
| 15 | The Kashmir Files | 0.214 | 0.750 | 0.429 | Moderate | -0.536 | Extreme Gaslighting | 20 |
| 16 | U-571 | 0.512 | 0.375 | 0.457 | Moderate | +0.137 | Sanitized Fabrication | 20 |