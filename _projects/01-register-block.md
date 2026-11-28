---
title: "8-bit Processor: From Breadboards to Tape-out"
order: 1
tag: ASIC · Digital Systems
summary: An 8-bit processor taken from a breadboard SAP computer to fabricated silicon.
meta: 110 MHz · 13,110 µm² (register block)
image: images/8bit/card.jpg
mark: ASIC

# ── Detail page ──
heading: "8-bit Processor: From Breadboards to Tape-out"
eyebrow: ASIC · Digital systems · 180 nm CMOS, fabricated at SCL Chandigarh
intro: An 8-bit Simple-As-Possible (SAP) processor, first built and debugged on breadboards and then redesigned full-custom in a 180 nm CMOS process and fabricated at SCL, Chandigarh. My contributions were the RAM module at the breadboard stage and the register block on the chip.
cover: images/8bit/breadboard-to-tapeout.jpg
cover_wide: true
cover_caption: "Fig. 1 — From breadboard to silicon: the breadboard SAP computer, its PCB, the chip layout, the fabricated die and the packaged chip on its test board."
report: ""
---

## Motivation

This project takes a Simple-As-Possible (SAP) 8-bit computer from breadboards to a fabricated chip. The register blocks sit between the ALU and the shared system bus, so I designed them for the two things that matter on a chip: the smallest area and the highest operating frequency.

## Design and rationale

Two stages. On the breadboard, a 16 × 8 RAM built from gates and flip-flops, addressed by the Memory Address Register and sharing the bus with the rest of the SAP computer; I helped integrate and debug the complete computer.

![The RAM module built on breadboard](images/8bit/ram-breadboard.jpg){: .pair}
*Fig. 2 — The RAM module on breadboard.*

![PCB layout of the RAM module](images/8bit/ram-pcb.png){: .pair}
*Fig. 3 — PCB layout of the RAM module, with inputs from the Memory Address Register, the bus and the control logic.*

On the chip, the 8-bit register block in Cadence Virtuoso, 180 nm CMOS: each bit is a D-register with a tristate buffer onto the shared bus, controlled by OE, IE and CLK.

![Layout of the 8-bit register block in Cadence Virtuoso](images/8bit/register-block-layout.jpg){: .pair}
*Fig. 4 — Full layout of the 8-bit register block in Cadence Virtuoso, with its eight bus lines, the ALU outputs and the OE, IE and CLK control signals.*

![Close-up of the register block layout](images/8bit/register-block-detail.jpg){: .pair}
*Fig. 5 — Close-up of the layout, marking the tristate buffers and a 1-bit D-register.*

- **Tristate buffers on the bus.** Several blocks on the chip share the bus, and two cannot drive it at the same time. A register therefore drives the bus only while its output-enable is on.
- **Placement chosen by comparison.** I explored several placement configurations and compared area, aspect ratio and frequency. Each had to avoid routing congestion and pass the design-rule check. The final layout is close to square.
- Tristate logic was new to me, and a tristate problem was the main bug I debugged on the breadboard RAM.

## Results

For the register block, from post-layout simulation at the typical corner. Function verified.

| Parameter | Value |
| --- | ---: |
| Maximum frequency | 110 MHz |
| Length | 116.385 µm |
| Width | 112.645 µm |
| Area | 13,110.188 µm² |
| Aspect ratio | 1.033 |
| Process | 180 nm CMOS |
| Fabrication | SCL, Chandigarh |

## Future work

- The fabricated chip will be tested in my final semester.
