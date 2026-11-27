---
title: FIR Filter, Custom Adder-Multiplier
order: 7
tag: VLSI DSP Architecture
summary: FIR filter built from custom adder and multiplier blocks, with analysis of quantization errors and transition dependent delays.
meta: 15 taps · 5 multipliers · Q1.7
image: images/fir/input-output.png
mark: FIR

# ── Detail page ──
heading: FIR Filter with Custom Adder and Multiplier Blocks
eyebrow: VLSI DSP Architecture · Verilog
intro: A 15-tap FIR filter built from custom arithmetic blocks, a six-operand carry-save adder tree and 8 × 8 array multipliers, with an analysis of quantization errors and transition-dependent delays.
cover: ""
cover_caption: ""
report: ""
---

## Filter structure

The filter takes the input x(n) through a 14-stage delay line, so it sees 15 samples, x(n) to x(n−14). Its coefficients are symmetric, so pairs of taps that share a coefficient are added before they are multiplied. As a result, the 15 taps need just five multipliers, for coefficients b0, b2, b4, b6 and b7. Their five products are summed by a six-operand carry-save adder, whose sixth input is an LSB bias.

![FIR filter structure and resources](images/fir/fir-structure.png){: .big}
*Fig. 1 — Filter structure: delay line, pre-adders for symmetric taps, five coefficient multipliers and the six-operand CSA. The box lists the hardware it needs.*

The design uses five 8 × 8 unsigned × signed array multipliers, four 8-bit ripple-carry adders, a three-stage CSA tree with a final ripple-carry adder, fourteen 8-bit registers and five memory elements.

## Six-operand carry-save adder

Adding six numbers with ordinary adders would chain six carry propagations. A carry-save adder (CSA) instead reduces three operands to two, a sum and a carry, without propagating carries. Three CSA stages reduce the six operands to two, and a single ripple-carry adder (RCA) produces the final result.

Signed operands are handled with XOR logic: each operand passes through a row of XOR gates driven by its sign input, which inverts its bits when needed. Together with the LSB bias input, this lets the same adder tree both add and subtract in two's complement.

![Six-operand CSA and XOR logic](images/fir/csa-tree.png){: .big}
*Fig. 2 — The six-operand CSA tree (top) and the XOR logic that conditionally inverts each operand (bottom).*

## Results

The input and output samples are in Q1.7 fixed-point format: one sign or integer bit and seven fractional bits. The filter removes the high-frequency component riding on the input, leaving a smooth output.

![Filter input and output](images/fir/input-output.png){: .wide}
*Fig. 3 — Filter input and output, both in Q1.7.*
