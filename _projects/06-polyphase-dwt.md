---
title: Polyphase Multi-level DWT
order: 6
tag: VLSI DSP Architecture
summary: A three-level polyphase DWT in Verilog with a pipelined fixed-point datapath, and a study of coefficient quantization across Daubechies wavelets.
meta: 3 levels · Q1.7
image: images/dwt/polyphase-stage.png
mark: DWT

# ── Detail page ──
heading: RTL Design of a Multi-Level Polyphase DWT Architecture
eyebrow: VLSI DSP architecture · Verilog · MATLAB · Vivado
intro: A modular RTL architecture that computes a three-level forward discrete wavelet transform (DWT) as a stream, using polyphase filter banks, a pipelined fixed-point datapath and BRAM-based memory.
cover: images/dwt/vivado-schematic.png
cover_caption: "Fig. 1 — Synthesised RTL schematic of the three-level DWT in Vivado."
report: ""
---

## Motivation

The discrete wavelet transform (DWT) splits a signal into frequency bands, and each level filters and then discards every second output. In direct form that wastes half of the arithmetic. I wanted an architecture that computes only the outputs that are kept, as a stream, and I wanted to understand how many bits the coefficients need.

## What I built and why

A three-level forward DWT in Verilog (polyphase filter banks, a pipelined Q1.7 datapath, BRAM storage with approximation and detail coefficients in separate memories, valid handshakes between levels, 8 kHz input rate), a MATLAB reference model with Vivado simulation on synthetic multi-tone signals (50, 100, 150 and 1000 Hz), and a coefficient-quantization study for db1, db2, db4 and db8 in Q1.7 and Q1.15.

![Polyphase structure of a single DWT stage](images/dwt/polyphase-stage.png){: .big}
*Fig. 2 — Polyphase structure of one DWT stage. The input is split into even and odd samples and downsampled first, so the four sub-filters run at half the input rate.*

- **Polyphase filter banks.** Each filter is split into even and odd sub-filters and the input is downsampled first, so every multiplication contributes to a kept coefficient (100% efficiency against 50% in direct form). The price is more complex control to handle even and odd samples. In analysis this doubles throughput to two samples per clock at half the clock rate.
- **Valid handshakes between levels.** A counter-based schedule would add overhead, and simple valid logic is enough here.
- **Q1.7 with a quantization study.** Rounding the coefficients to 8 bits costs up to about 0.004 per coefficient, against about 0.000015 in Q1.15, roughly 250 times smaller. The effect is worse for higher-order Daubechies wavelets: db-N has an N-fold zero at z = −1, and rounding scatters that cluster of zeros, which reduces stopband attenuation. So higher orders need more bits.
- **Coefficients derived, not copied.** I derived db4 from its vanishing-moment and orthogonality conditions (spectral factorisation) and obtained the standard values.

## Results

| Wavelet | Max coefficient error, Q1.7 | Max coefficient error, Q1.15 |
| --- | ---: | ---: |
| db1 | 0.0038 | 0.000014 |
| db2 | 0.0034 | 0.000015 |
| db4 | 0.0039 | 0.000015 |
| db8 | 0.0038 | 0.000015 |

The RTL output was verified against the MATLAB reference model, and the plot of approximation and detail coefficients at three levels shows each level separating a different band.

![Synthetic test signal](images/dwt/test-signal.png)
*Fig. 3 — Synthetic test signal used as the input.*

![Approximation and detail coefficients at three levels](images/dwt/dwt-output.png){: .wide}
*Fig. 4 — Output of the RTL design, plotted from the Vivado simulation results: approximation (cA) and detail (cD) coefficients at levels 1 to 3.*

## Trade-offs, limitations and future work

- The RTL uses Q1.7, which the study suggests is adequate only for low-order wavelets, but a longer format will increase hardware overhead. So the decision needs to be made depending on the specification or application.
- Next: an inverse DWT to check perfect reconstruction, a lifting-scheme comparison, and tests on real signals such as ECG.
