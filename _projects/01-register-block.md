---
title: "8-bit Processor: Register Block"
order: 1
tag: ASIC · Physical Design
summary: An 8-bit register block interfacing with the ALU and bus, laid out in Cadence Virtuoso for minimum area and fabricated at SCL Chandigarh.
meta: 110 MHz · 13110.188 µm² · AR 1.033
image: ""
mark: ASIC

heading: 8-bit Processor: Register Block
eyebrow: ASIC · Physical Design
intro: An 8-bit register block interfacing with the ALU and bus, laid out in Cadence Virtuoso for minimum area and fabricated at SCL Chandigarh.
cover: images/8bit/cadence_img.jpg
cover_caption: "Fig. 1 — Complete circuit on breadboard: PPG probe, acquisition circuit, two filter stages, potentiometer and ESP32."
report: files/PPG-Report.pdf
---

## Design and Implementation

- Designed register blocks for an 8-bit processor, including architectural and implementation decisions for interfacing with the ALU and system bus, with a focus on minimizing area and maximizing operating frequency.
- Explored alternative placement configurations to optimize layout area, aspect ratio, and operating frequency while avoiding routing congestion and ensuring DRC compliance.
- Achieved a maximum operating frequency of 110 MHz, a layout area of 13,110.188 µm², and an aspect ratio of 1.033. The design was subsequently fabricated at SCL, Chandigarh.

## Layout Dimensions

| Parameter | Value |
|---|---:|
| Length | 116.385 µm |
| Width | 112.645 µm |
| Area | 13,110.188 µm² |
| Aspect ratio | 1.033 |
