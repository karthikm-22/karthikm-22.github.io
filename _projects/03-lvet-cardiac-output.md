---
title: Cardiac Parameter Estimation using ECG, PPG and PCG signals
order: 3
tag: Research · Biomedical Hardware
summary: Custom front ends and lightweight algorithms that estimate LVET, stroke volume and cardiac output from heart sounds and PPG.
meta: First author · Accepted at CMES 2027
image: images/lvet/acquisition-system.jpg
research: true   # shown under Research instead of Projects
mark: LVET

# ── Detail page ──
heading: Cardiac Parameter Estimation using ECG, PPG and PCG signals
eyebrow: Research · ULP-IC Lab, DAU · Prof. Biswajit Mishra
intro: Custom front ends and lightweight algorithms that estimate left-ventricular ejection time (LVET), stroke volume (SV) and cardiac output (CO) from heart sounds (PCG) and PPG. First-author paper accepted at CMES 2027, IIT Guwahati (February 2027).
cover: images/lvet/acquisition-system.jpg
cover_caption: "Fig. 1 — The complete acquisition system: (a) raw and conditioned PCG signals with S1 and S2 marked, (b) raw and conditioned PPG signals with the systolic peak, dicrotic notch and diastolic peak, sent wirelessly to a mobile application."
report: ""
---

## Motivation

Stroke volume and cardiac output show how well the heart pumps, but measuring them usually takes echocardiography or invasive catheters. Heart sounds and PPG can be recorded at the surface, and the time between S1 and S2 (left-ventricular ejection time, LVET) reflects each beat's ejection. I wanted estimates light enough for a wearable, without intensive machine-learning models.

## Design and rationale

Two custom front ends, one for PCG and one for PPG, stream to a mobile application.

The PCG front end: stethoscope pickup, conditioning board and ESP32.

![PCG conditioning board layout, top and bottom layers](images/lvet/pcg-board-layout.png){: .pair}
*Fig. 2 — The PCB design of the custom PCG conditioning board (79.5 × 49.3 mm), top and bottom layers.*

![Assembled PCG hardware with stethoscope and ESP32](images/lvet/pcg-hardware.jpg){: .pair}
*Fig. 3 — The fabricated PCG hardware: stethoscope pickup, conditioning board and ESP32.*

The PPG front end: a matching custom conditioning board.

![PPG conditioning board layout, top and bottom layers](images/lvet/ppg-board-layout.png){: .pair}
*Fig. 4 — The PCB design of the custom PPG conditioning board, top and bottom layers.*

![Assembled PPG conditioning board](images/lvet/ppg-hardware.jpg){: .pair}
*Fig. 5 — The fabricated PPG conditioning board.*

Three lightweight algorithms run on the signals; each choice below comes with its reason.

- **Adaptive state machine for S1, S2 and LVET, not a fixed threshold or a learned model.** Heart sounds differ from subject to subject, so the detector learns each recording's own smoothed envelope (a learning window, then a classification window). That keeps it subject-specific and interpretable without intensive modelling.
- **Windkessel model for stroke volume and cardiac output, from synchronised PCG and PPG.** A small physical model of the arteries, light enough for beat-to-beat use. In my summer internship I extended it to uncalibrated beat-to-beat stroke volume.
- **Light extraction of PEP, PTT and PAT from ECG, PPG and PCG.** These intervals support lightweight cardiac disease classification.
- **Validated first on a public, annotated dataset.** The S1–S2 algorithm was tested on 2,192 recordings from the CirCor DigiScope collection on PhysioNet.

## Results

| Metric | Result |
| --- | ---: |
| Recordings tested (CirCor DigiScope, PhysioNet) | 2,192 |
| LVET mean error | 1.55 ms |
| S1–S2 detection match rate | 87.2% |

The reference is the dataset's own S1 and S2 annotation.

![Adaptive S1–S2 detection compared with database annotations](images/lvet/s1-s2-detection.png){: .wide}
*Fig. 6 — The adaptive algorithm on a PhysioNet recording: raw PCG, detected S1 and S2, the ground-truth annotations, and the smoothed Hilbert envelope with its learning and classification windows.*

## Limitations and future work

- Stroke volume and cardiac output estimates are not yet validated against a reference.
- Next: validate stroke volume and cardiac output, and the uncalibrated beat-to-beat extension from the internship.

## Publication

"A Framework for LVET and CO Estimation on a Custom-Built Front-End Hardware", first author. Formally accepted for presentation at the IEEE Conference on Medical Engineering and Sciences 2027 (CMES 2027), IIT Guwahati, February 2027.
