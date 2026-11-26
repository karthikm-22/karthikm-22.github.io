---
title: LVET and Cardiac Output Estimation
order: 3
tag: Research · Biomedical Hardware
summary: Analog front ends and lightweight non-ML algorithms for LVET, SV and CO from PCG and PPG signals. Ultra-low power IC design Lab, under Prof. Biswajit Mishra.
meta: First author · Accepted, CMES 2027
image: ""
research: true   # shown under Research instead of Projects
mark: LVET

# ── Detail page ──
heading: A Framework for LVET and CO Estimation on a Custom-Built Front-End Hardware
eyebrow: Research · ULP-IC Lab, DAU · Prof. Biswajit Mishra
intro: Custom analog front-end hardware and computationally light algorithms that estimate left-ventricular ejection time (LVET), stroke volume (SV) and cardiac output (CO) from synchronized heart-sound (PCG) and PPG signals. First-author paper accepted at CMES 2027, IIT Guwahati.
cover: ""
cover_caption: ""
report: ""
---

## Hardware

A custom analog front end was designed for PCG signal conditioning and acquisition. It captures the S1 and S2 heart sounds, which mark the closing of the heart valves and so bound the ejection phase of each beat.

## Algorithms

An adaptive state-machine algorithm detects S1 and S2 in the PCG signal and estimates LVET from them. A Windkessel model-based framework then estimates stroke volume and cardiac output using the synchronized PCG and PPG signals.

The same work developed computationally efficient algorithms for multimodal cardiovascular feature extraction from synchronized ECG, PPG and PCG signals: pre-ejection period (PEP), pulse transit time (PTT), pulse arrival time (PAT), SV and CO. These features are chosen to support lightweight cardiac disease classification.

## Validation

The heart-sound segmentation algorithm was validated on 2,192 recordings from PhysioNet. Against the reference annotations it achieved an LVET mean error of 1.55 ms and an 87.2% match rate for S1–S2 detection.

| Metric | Result |
| --- | ---: |
| Recordings tested (PhysioNet) | 2,192 |
| LVET mean error | 1.55 ms |
| S1–S2 detection match rate | 87.2% |

## Publication

"A Framework for LVET and CO Estimation on a Custom-Built Front-End Hardware", first author. Formally accepted for presentation at the Conference on Medical Engineering and Science (CMES 2027), IIT Guwahati, February 2027.

## Continuing work

During a summer research internship (May–July 2026), I extended this into a computationally light framework for uncalibrated, beat-to-beat stroke volume estimation using a Windkessel model, evaluating how physiologically significant the multimodal cardiovascular features are and how they relate to each other.
