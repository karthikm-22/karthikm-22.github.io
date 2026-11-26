---
title: "8-bit Processor: Register Block"
order: 1
tag: ASIC · Physical Design
summary: An 8-bit register block interfacing with the ALU and bus, laid out in Cadence Virtuoso for minimum area and fabricated at SCL Chandigarh.
meta: 110 MHz · 13110.188 µm² · AR 1.033
image: ""
mark: ASIC

# ── Detail page ──
heading: 8-bit Processor Design and Fabrication
eyebrow: Full-Custom VLSI · Cadence Virtuoso · 180 nm CMOS
intro: The register blocks of an 8-bit processor, designed full-custom in a 180 nm CMOS process, laid out in Cadence Virtuoso for small area and high clock frequency, and fabricated at SCL, Chandigarh.
cover: ""          # upload a layout screenshot to images/8bit/ and put its path here, e.g. images/8bit/layout.png
cover_caption: ""  # e.g. "Fig. 1 — Final layout of the register block in Cadence Virtuoso."
report: ""
---

## Design

The work covered the register blocks of an 8-bit processor, including the architectural and implementation decisions for how they interface with the ALU and the system bus. Every choice was driven by two goals: the smallest possible area and the highest possible operating frequency.

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
