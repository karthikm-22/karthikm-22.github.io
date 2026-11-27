---
title: "8-bit Processor: From Breadboards to Tape-out"
order: 1
tag: ASIC · Digital Systems
summary: An 8-bit processor taken from a breadboard SAP computer to fabricated silicon. I built its RAM module on breadboard, then designed the register block in Cadence Virtuoso, taped out at SCL Chandigarh.
meta: 110 MHz · 13,110.188 µm² · AR 1.033
image: images/8bit/breadboard-to-tapeout.jpg
mark: ASIC

# ── Detail page ──
heading: "8-bit Processor: From Breadboards to Tape-out"
eyebrow: Breadboarding · Full-Custom VLSI · Cadence Virtuoso · 180 nm CMOS
intro: An 8-bit Simple-As-Possible (SAP) processor, first built and debugged on breadboards and then redesigned full-custom in a 180 nm CMOS process and fabricated at SCL, Chandigarh. My contributions were the RAM module at the breadboard stage and the register block on the chip.
cover: images/8bit/breadboard-to-tapeout.jpg
cover_caption: "Fig. 1 — From breadboard to silicon: the breadboard SAP computer, its PCB, the chip layout, the fabricated die and the packaged chip on its test board."
report: ""
---

## Breadboard stage: the RAM

The processor started as an 8-bit SAP computer built on breadboards. I contributed to its development by designing and implementing the RAM module.

The RAM was designed and tested using logic gates and flip-flops for data storage and retrieval, and works as a 16 × 8 memory. It takes its address from the Memory Address Register and exchanges data with the rest of the processor over the shared bus. I worked with the team to integrate it with the other system components, and helped debug and verify the complete SAP computer.

![The RAM module built on breadboard](images/8bit/ram-breadboard.jpg)
*Fig. 2 — The RAM module on breadboard.*

![PCB layout of the RAM module](images/8bit/ram-pcb.png)
*Fig. 3 — PCB layout of the RAM module, with inputs from the Memory Address Register, the bus and the control logic.*

## Chip stage: the register block

For the fabricated chip, the work covered the register blocks of the processor, including the architectural and implementation decisions for how they interface with the ALU and the system bus. Every choice was driven by two goals: the smallest possible area and the highest possible operating frequency.

![Layout of the 8-bit register block in Cadence Virtuoso](images/8bit/register-block-layout.jpg)
*Fig. 4 — Full layout of the 8-bit register block in Cadence Virtuoso, with its eight bus lines, the ALU outputs and the OE, IE and CLK control signals.*

Each bit is a D-register, and tristate buffers connect the register to the shared bus only when its output is enabled.

![Close-up of the register block layout](images/8bit/register-block-detail.jpg)
*Fig. 5 — Close-up of the layout, marking the tristate buffers and a 1-bit D-register.*

## Layout optimisation

Several placement configurations were explored to balance layout area, aspect ratio and operating frequency. Each candidate had to avoid routing congestion and pass the design-rule check (DRC) before it was compared with the others.

## Results

The final layout runs at up to 110 MHz, occupies 13,110.188 µm² and has an aspect ratio of 1.033, close to square. The design was then fabricated at SCL, Chandigarh.

| Parameter | Value |
| --- | ---: |
| Maximum frequency | 110 MHz |
| Length | 116.385 µm |
| Width | 112.645 µm |
| Area | 13,110.188 µm² |
| Aspect ratio | 1.033 |
| Process | 180 nm CMOS |
| Fabrication | SCL, Chandigarh |
