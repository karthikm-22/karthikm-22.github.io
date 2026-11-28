---
title: Cardiac Parameter Estimation using ECG, PPG and PCG signals
order: 3
tag: Research · Biomedical Hardware
summary: Analog front ends and lightweight non-ML algorithms for LVET, SV and CO from PCG and PPG signals. Ultra-low power IC design Lab, under Prof. Biswajit Mishra.
meta: First author · Accepted, CMES 2027
image: images/lvet/pcg-hardware.jpg
research: true   # shown under Research instead of Projects
mark: LVET

# ── Detail page ──
heading: Cardiac Parameter Estimation using ECG, PPG and PCG signals
eyebrow: Research · Ongoing · ULP-IC Lab, DAU · Prof. Biswajit Mishra
intro: Custom analog front-end hardware and computationally light algorithms that estimate left-ventricular ejection time (LVET), stroke volume (SV) and cardiac output (CO) from synchronized heart-sound (PCG) and PPG signals. First-author paper accepted at CMES 2027, IIT Guwahati.
cover: images/lvet/acquisition-system.jpg
cover_caption: "Fig. 1 — The complete acquisition system: (a) raw and conditioned PCG signals with S1 and S2 marked, (b) raw and conditioned PPG signals with the systolic peak, dicrotic notch and diastolic peak, sent wirelessly to a mobile application."
report: ""
---

## Hardware

A custom analog front end was designed for PCG signal conditioning and acquisition. It captures the S1 and S2 heart sounds, which mark the closing of the heart valves and so bound the ejection phase of each beat.

![PCG conditioning board layout, top and bottom layers](images/lvet/pcg-board-layout.png){: .big}
*Fig. 2 — The PCB design of the custom PCG conditioning board (79.5 × 49.3 mm), top and bottom layers.*

![Assembled PCG hardware with stethoscope and ESP32](images/lvet/pcg-hardware.jpg){: .big}
*Fig. 3 — The fabricated PCG hardware: stethoscope pickup, conditioning board and ESP32.*

A matching custom board conditions the PPG signal.

![PPG conditioning board layout, top and bottom layers](images/lvet/ppg-board-layout.png){: .big}
*Fig. 4 — The PCB design of the custom PPG conditioning board, top and bottom layers.*

![Assembled PPG conditioning board](images/lvet/ppg-hardware.jpg){: .big}
*Fig. 5 — The fabricated PPG conditioning board.*

## Algorithms

An adaptive state-machine algorithm detects S1 and S2 in the PCG signal and estimates LVET from them. A Windkessel model-based framework then estimates stroke volume and cardiac output using the synchronized PCG and PPG signals.

The same work developed computationally efficient algorithms for multimodal cardiovascular feature extraction from synchronized ECG, PPG and PCG signals: pre-ejection period (PEP), pulse transit time (PTT), pulse arrival time (PAT), SV and CO. These features are chosen to support lightweight cardiac disease classification.

## Validation

The heart-sound segmentation algorithm was validated on 2,192 recordings from PhysioNet. Against the reference annotations it achieved an LVET mean error of 1.55 ms and an 87.2% match rate for S1–S2 detection.

![Adaptive S1–S2 detection compared with database annotations](images/lvet/s1-s2-detection.png){: .wide}
*Fig. 6 — The adaptive algorithm on a PhysioNet recording: raw PCG, detected S1 and S2, the ground-truth annotations, and the smoothed Hilbert envelope with its learning and classification windows.*

| Metric | Result |
| --- | ---: |
| Recordings tested (PhysioNet) | 2,192 |
| LVET mean error | 1.55 ms |
| S1–S2 detection match rate | 87.2% |

## Publication

"A Framework for LVET and CO Estimation on a Custom-Built Front-End Hardware", first author. Formally accepted for presentation at the IEEE Conference on Medical Engineering and Sciences 2027 (CMES 2027), IIT Guwahati, February 2027.

## Continuing work

During a summer research internship (May–July 2026), I extended this into a computationally light framework for uncalibrated, beat-to-beat stroke volume estimation using a Windkessel model, evaluating how physiologically significant the multimodal cardiovascular features are and how they relate to each other.
