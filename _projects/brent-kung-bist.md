---
title: 12-bit Brent–Kung Adder with Built-In Self-Test
order: 5
tag: Digital Design · Design for Test
summary: A 12-bit parallel-prefix adder with built-in self-test, raising single stuck-at fault coverage from 52.67% to 97.89%.
meta: 710 faults
image: images/bk/bist-architecture.png
mark: BIST

# ── Detail page ──
heading: 12-bit Brent–Kung Adder Design with Built-In Self-Test (BIST)
eyebrow: Digital design · Design for test · Verilog · Vivado
intro: A 12-bit Brent–Kung parallel-prefix adder that tests itself, using BILBO registers to generate pseudo-random test patterns and a MISR to compress the results into a signature.
cover: ""
cover_caption: ""
report: ""
---

## Motivation

Built-in self-test lets a circuit test itself without external equipment, using a pattern generator and a signature register. The catch is that a short pseudo-random generator feeds correlated patterns to the circuit and leaves faults untested. Here the adder has 25 inputs but the generator is only 13 bits wide.

## What I built and why

A 12-bit Brent–Kung adder (a parallel-prefix design that finds carries in a logarithmic number of stages with modest wiring), surrounded by 13-bit BILBO registers that generate test patterns and a MISR that compresses the outputs into a signature. Single stuck-at faults are injected through LUTs and the signature is compared automatically. All runs are in simulation, over 710 faults.

![BIST architecture around the Brent–Kung adder](images/bk/bist-architecture.png){: .wide}
*Fig. 1 — The synthesised BIST architecture: 12-bit BILBO modules around the Brent–Kung adder (the circuit under test), with 2-input LUTs that model stuck-at-0 and stuck-at-1 faults.*

- **Decorrelate the operands.** With 13 generator bits for 25 inputs, the two operands would otherwise be correlated. I changed the bit combinations that reach the second operand (reversing, inverting and shifting, or cyclic shifting) so the adder sees more varied input combinations.
- **Compare signature widths.** I compared an 8-bit (truncated) signature with a 13-bit one to see how truncating the signature affects detection.
- **Inject faults with LUTs and check automatically.** This makes each variant measurable as a fault-coverage number.

## Results

| Configuration | Stuck-at-0 | Stuck-at-1 | Combined |
| --- | ---: | ---: | ---: |
| Same input on both operands, 8-bit signature | 59.15% | 46.19% | 52.67% |
| Reversed inputs, 8-bit signature | 99.15% | 84.50% | 91.82% |
| 5-bit inverted shift, 8-bit signature | 98.87% | 95.49% | 97.18% |
| 5-bit cyclic shift, 8-bit signature | 99.43% | 95.77% | 97.60% |
| 7-bit cyclic shift, 8-bit signature | 99.43% | 95.77% | 97.60% |
| 5-bit cyclic shift, 13-bit signature | 100% | 95.77% | 97.89% |

Decorrelation does most of the work, lifting combined coverage from 52.67% to 97.60%. The wider signature adds 0.29 points and brings stuck-at-0 coverage to 100%.

## Trade-offs, limitations and future work

- The remaining 2.11% (about 15 of the 710 faults) are all stuck-at-1 faults on a long NAND chain in the adder. They cannot be exposed because the BILBO generator never produces the all-zeros pattern they need.
- Reaching them would need a generator that can reach the all-zeros state.
