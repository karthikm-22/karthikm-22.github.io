---
title: 12-bit Brent–Kung Adder with Built-In Self-Test
order: 5
tag: Digital Design · Design for Test
summary: A 12-bit parallel-prefix adder with an integrated BIST architecture, raising single stuck-at fault coverage from 52.67% to 97.89%.
meta: Fault coverage 52.67% → 97.89%
image: images/bk/bist-architecture.png
mark: BIST

# ── Detail page ──
heading: 12-bit Brent–Kung Adder Design with Built-In Self-Test (BIST)
eyebrow: Verilog · DFT · Vivado
intro: A 12-bit Brent–Kung parallel-prefix adder that tests itself, using BILBO registers to generate pseudo-random test patterns and a MISR to compress the results into a signature.
cover: ""
cover_caption: ""
report: ""
---

## Adder and BIST architecture

The adder is a 12-bit Brent–Kung design, a parallel-prefix structure that computes carries in a logarithmic number of stages with a modest amount of wiring. It was designed and verified in Verilog.

Built-in self-test (BIST) lets the circuit check itself without external test equipment. BILBO registers generate pseudo-random test patterns that drive the adder, and a multiple-input signature register (MISR) compresses the outputs into a single signature. Comparing that signature with the fault-free one shows whether the adder is working.

![BIST architecture around the Brent–Kung adder](images/bk/bist-architecture.png)
*Fig. 1 — The synthesised BIST architecture: 12-bit BILBO modules around the Brent–Kung adder (the circuit under test), with 2-input LUTs that model stuck-at-0 and stuck-at-1 faults.*

## Raising fault coverage

Pseudo-random operands from the same pattern generator are correlated, which leaves some faults untested and reduces fault coverage. Input-decorrelation techniques were developed to break that correlation.

To measure the effect, LUT-based single stuck-at fault injection and automated signature analysis were implemented. Together, these changes raised the combined fault coverage from 52.67% to 97.89%.
