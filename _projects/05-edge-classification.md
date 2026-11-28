---
title: Cuffless Blood Pressure Estimation and Cardiac Disease Classification
order: 5
tag: Research · Edge Hardware
summary: A wearable 2-lead ECG and finger-PPG system with on-phone analysis for cardiac disease classification and cuffless blood pressure. I built the PPG hardware.
meta: ICEdge 2025
image: images/edge/card.png
research: true   # shown under Research instead of Projects
mark: Edge

# ── Detail page ──
heading: Cuffless Blood Pressure Estimation and Cardiac Disease Classification
eyebrow: Research · R&D Forum, ICEdge 2025, IISc Bengaluru
intro: A wearable 2-lead ECG and finger-PPG system with on-phone analysis for cardiac disease classification and cuffless blood pressure. Poster co-author; my part was the PPG acquisition hardware.
cover: ""
cover_caption: ""
report: ""
---

## Motivation

Hypertension is called a silent killer, and measuring blood pressure or ECG normally needs a cuff, a needle or a trained professional, which is hard in resource-constrained regions. A wearable that records ECG and PPG without a cuff could close that gap.

## Design and rationale

A 2-lead ECG (limb electrodes only) and a finger-mounted PPG sensor stream over Wi-Fi to an Android phone, which classifies cardiac anomalies and computes systolic and diastolic pressure from pulse transit time. My part was the PPG acquisition hardware; the other points describe the system around it.

![System overview: ECG and PPG acquisition, Wi-Fi link, phone-side processing](images/edge/card.png){: .wide}
*Fig. 1 — System overview: the PPG and 2-lead ECG acquisition chains stream over Wi-Fi from ESP32 nodes to the phone, which synchronises the signals, classifies cardiac disease and computes systolic and diastolic pressure.*

- **PPG band-pass of 0.5–8 Hz in two active stages (my contribution).** I kept the upper corner at 8 Hz because of the dicrotic notch, a feature of interest. A potentiometer between the two stages sets the gain for each subject, because pulse amplitude varies from person to person and could otherwise saturate the signal.
- **Sub-millisecond synchronisation of ECG and PPG.** Pulse transit time is the delay between the ECG R-peak and the PPG pulse, so the two signals need a shared time base. A synchronisation algorithm over the Wi-Fi link aligns them to better than ±1 ms.
- **Limb electrodes only.** No chest placement and no trained assistance, which suits resource-constrained settings.
- **Processing on the phone.** The wearable only acquires and streams. Classification and blood-pressure computation run on the phone's processor.

## Results

System-level results as reported on the group's poster:

| Metric | Result |
| --- | --- |
| R-peak false detection rate | below 1.3% |
| Myocardial infarction detection (PTB database) | PPV 94.6%, sensitivity 84.2%, specificity 86.5%, accuracy 85% |
| Atrial fibrillation detection (MIT-BIH database) | sensitivity 100% |
| Validation | databases, then a hospital setup with 300+ patients under ethical clearance |

## Limitations

- Battery life is about 5 hours; a solar module extends it, which matters in rural areas.
- The accuracy figures above are system-level results from the group's work.
