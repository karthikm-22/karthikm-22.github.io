---
title: Polyphase Multi-level DWT
order: 6
tag: VLSI DSP Architecture
summary: RTL architecture for a three-level forward discrete wavelet transform, built from polyphase filter banks with a pipelined fixed-point datapath.
meta: 3-level DWT · Daubechies wavelets
image: ""
mark: DWT

# ── Detail page ──
heading: RTL Design of a Multi-Level Polyphase DWT Architecture
eyebrow: Verilog · Fixed-Point DSP · MATLAB · Vivado
intro: A modular RTL architecture that computes a three-level forward discrete wavelet transform (DWT) as a stream, using polyphase filter banks, a pipelined fixed-point datapath and BRAM-based memory.
cover: ""
cover_caption: ""
report: ""
---

## Architecture

The design performs a three-level forward DWT decomposition. Each level is built from polyphase filter-bank structures, which split the filters into even and odd phases so that only the samples kept after downsampling are computed.

The datapath is pipelined and uses fixed-point arithmetic. Intermediate results are held in BRAM-based memory, and the stages pass data to each other through handshake protocols, so the whole transform runs efficiently on a continuous stream of samples.

## Verification and quantization

The RTL was verified against a MATLAB reference model. The effect of coefficient quantization, rounding the filter coefficients to fixed-point, was evaluated across several Daubechies wavelets.
