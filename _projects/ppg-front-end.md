---
title: PPG Signal Acquisition and Conditioning
order: 4
tag: Analog Front End · Biomedical
summary: A transmission-mode IR sensor and a two-stage band-pass filter that removes the DC offset and amplifies the pulsatile signal for heart-rate estimation.
meta: 0.5–3.4 Hz pass band · gain 48 · HR ≈ 85 bpm
image: images/ppg/p5-6.jpg
mark: PPG

# ── Detail page (only used because this file has text below the ---) ──
heading: Photoplethysmography Signal Acquisition and Conditioning
eyebrow: Individual Project · Analog Front End · Biomedical
intro: An analog front-end for PPG signal processing, as a fundamental module for applications like estimation of heart rate, SBP and DBP, and blood glucose levels on wearable devices.
cover: images/ppg/p5-6.jpg
cover_caption: "Fig. 1 — Complete circuit on breadboard: PPG probe, acquisition circuit, two filter stages, potentiometer and ESP32."
report: files/PPG-Report.pdf
---

## Basic principle

Photoplethysmography is an optical method to measure blood-volume changes in tissue. An IR LED projects light into the skin, and a photodiode on the opposite side (or the same side) produces a photocurrent depending on the intensity of light transmitted (or reflected) by the tissue. As the heart pumps, blood volume in the tissue changes, causing small periodic variations in the absorbed light giving a waveform called the PPG signal.

![Typical PPG cycle with labelled features](images/ppg/p1-1.png)
*Fig. 2 — A typical PPG cycle. Source: ResearchGate (see report).*

### Why the DC component matters

A portion of the emitted light is absorbed by the skin, bones and tissues independent of the heartbeat, creating a large DC baseline. It depends on the thickness and color of the skin, so it varies from person to person. The raw signal from the fingertip is also noisy, so a circuit is needed to acquire and condition it.

![AC and DC components of a PPG signal](images/ppg/p2-2.png)
*Fig. 3 — AC vs. DC components.*

## Acquisition circuit

The EN signal switches the IR LED on, which emits infrared light through the finger. The photodiode produces a photocurrent depending on the intensity of light received from the other side, which depends on the amount of light absorbed by the blood.

Heartbeat-driven changes in blood volume cause small periodic variations in the photocurrent. This forms the raw PPG signal.

![PPG acquisition circuit schematic](images/ppg/p3-4.png)
*Fig. 5 — Acquisition circuit.*

## Conditioning circuit

The useful signal lies between 0.5 Hz and 8 Hz, on top of a large unwanted DC component. A two-stage band-pass active filter amplifies the AC component and attenuates the DC component and unwanted frequencies.

![Two-stage band-pass conditioning circuit](images/ppg/p4-5.png)
*Fig. 6 — Two cascaded stages with a potentiometer between them.*

## Results

### Raw vs. filtered signal

CH1 shows the filtered signal and CH2 the raw signal (on different voltage scales in each figure). The raw signal is dominated by its DC component, while the filtered signal shows the amplified pulsatile AC component.

![Oscilloscope: filtered vs raw signal, CH2 at 2 V/div](images/ppg/p6-7.png)
*Fig. 7a — CH2 at 2.00 V/div.*

![Oscilloscope: filtered vs raw signal, CH2 at 50 mV/div](images/ppg/p6-8.png)
*Fig. 7b — CH2 at 50.0 mV/div.*


## Continued in the ULP-IC Lab

This front end grew into a research system in the ULP-IC Lab at DAU, under Prof. Biswajit Mishra. The later PPG acquisition system uses a two-stage analog front end with a transimpedance amplification stage and filtering, on a custom PCB. I handled the circuit design and PCB design independently, and validated the system by capturing PPG waveforms with visible morphological features such as the dicrotic notch.

On top of it, I developed a rule-based arterial-stiffness classification algorithm. It uses morphological features from the first and second derivatives of the PPG signal to sort subjects into two stiffness categories.

## References

1. E. Mejía-Mejía, J. Allen, K. Budidha, C. El-Hajj, P. A. Kyriacou, P. H. Charlton. *Photoplethysmography Signal Processing and Synthesis*, Chapters 2 and 3.
2. R. Wang, W. Jia, Z.-H. Mao, R. J. Sclabassi, M. Sun. Cuff-Free Blood Pressure Estimation Using Pulse Transit Time and Heart Rate.
3. S. Sun, E. Bresch, J. Muehlsteff, L. Schmitt, X. Long, R. Bezemer, I. Paulussen, G. J. Noordergraaf, R. M. Aarts. Systolic blood pressure estimation using ECG and PPG in patients undergoing surgery.
