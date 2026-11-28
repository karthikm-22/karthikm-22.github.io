---
title: FIR Filter, Custom Adder-Multiplier
order: 7
tag: VLSI DSP Architecture
summary: A 15-tap half-band FIR in Verilog built from custom adder and multiplier blocks.
meta: 15 taps · 5 multipliers · Q1.7
image: images/fir/csa-tree.png
mark: FIR

# ── Detail page ──
heading: FIR Filter with Custom Adder and Multiplier Blocks
eyebrow: VLSI DSP architecture · Verilog · MATLAB
intro: "A 15-tap half-band FIR filter in Verilog, built from custom arithmetic blocks: 8 × 8 array multipliers and a six-operand carry-save adder tree."
cover: ""
cover_caption: ""
report: ""
---

## Motivation

The task was a 15-tap low-pass FIR (−6 dB at 1 kHz, at least 20 dB attenuation by 1.1 kHz, 8-bit samples and coefficients) built from arithmetic blocks I had designed earlier. I wanted to know how much hardware the specification really needs, and what 8-bit arithmetic does to the filter.

## What I built and why

A 15-tap FIR in Verilog: a 14-stage delay line, four 8-bit pre-adders, five 8 × 8 array multipliers (modified for unsigned × signed), and a six-operand carry-save adder tree with a final ripple-carry adder. Samples and coefficients are Q1.7, and the sampling frequency is 4 kHz.

![FIR filter structure and resources](images/fir/fir-structure.png){: .wide}
*Fig. 1 — Filter structure: delay line, pre-adders for symmetric taps, five coefficient multipliers and the six-operand CSA. The box lists the hardware it needs.*

The six-operand carry-save tree sums the products, and the XOR rows in front of it let the same tree subtract as well as add.

![Six-operand CSA and XOR logic](images/fir/csa-tree.png){: .wide .xl}
*Fig. 2 — The six-operand CSA tree (top) and the XOR logic that conditionally inverts each operand (bottom).*

- **Skip the zeros, then use symmetry.** The coefficients are half-band: every other tap is zero and the centre tap is 0.5. So only 9 taps are non-zero, and symmetric pairs share a coefficient and can be added before multiplying. Fifteen multipliers become five. (Direct form: 15 multipliers and 14 adders.)
- **Area over speed.** A new sample arrives every 250 µs, far longer than the combinational delay (in ns order), so extra speed would only wait for the next sample. I used ripple-carry pre-adders and array multipliers and minimised hardware instead. During the left over time, the circuit could be power-gated.
- **Q1.7 format.** All coefficients lie in [−1, 0.992), 8 bits are available, and the earlier blocks work in two's complement.
- **Signed values with XOR rows and an LSB bias.** The multiplier works on the coefficient's magnitude, and XOR gates driven by each coefficient's sign turn the carry-save tree into an adder-subtractor. The LSB bias supplies the +1 of two's complement.
- **Truncation points.** Pre-adder sums, products (bits 14 to 7) and the accumulator are each cut back to 8 bits.

## Results

- Quantizing the coefficients to Q1.7 leaves the −6 dB point unchanged and widens the transition band, and the filter still meets the 20 dB at 1.1 kHz specification.
- In MATLAB fixed-point models, the direct form (truncating after each of 15 additions) reaches a signal-to-quantization-noise ratio of 26.0 dB. The optimized structure, which truncates after summing the products, reaches 38.0 dB. Fewer truncation points give less noise.
- Fewer taps (11, 7, 3) widen the transition band further and leave the −6 dB point unchanged. The group delay is (N−1)/2 samples, 1.75 ms for 15 taps at 4 kHz.
- Because the filter is half-band, its output could be decimated by 2, so a converter at half the input rate would be enough.

![Filter input and output](images/fir/input-output.png){: .wide}
*Fig. 3 — Filter input and output, both in Q1.7.*

## Limitations and future work

- Pre-adder sums can overflow for large inputs, that needs input scaling or guard bits.
- Using the earlier-designed array multiplier was a requirement. Several coefficients are exact shifts (0.5, 0.0625) or shift-and-add, so a multiplier-free version would save more hardware. That is the natural next step.
