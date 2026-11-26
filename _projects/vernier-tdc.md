---
title: All-Digital Vernier TDC with Statistical Calibration
order: 3
tag: FPGA · Time Measurement
summary: An all-digital Vernier time-to-digital converter on FPGA with a coarse–fine counting architecture and jitter-based statistical calibration.
meta: 480 ps theoretical resolution
image: ""
mark: TDC

# ── Detail page ──
heading: All-Digital Vernier TDC with Statistical Calibration
eyebrow: Verilog · FPGA · Vivado
intro: A time-to-digital converter built entirely from FPGA logic, using two asynchronous clocks and a coarse–fine counting architecture to reach a theoretical resolution of 480 ps, with a calibration method based on measured clock jitter.
cover: ""
cover_caption: ""
report: ""
---

## Architecture

A time-to-digital converter (TDC) measures the interval between two events. A Vernier TDC does this with two clocks whose periods differ slightly: the faster clock gains on the slower one by that difference every cycle, so the number of cycles it takes to catch up gives the fine part of the measurement.

This design uses two asynchronous clocks in a coarse–fine counting architecture. A coarse counter measures the interval in whole clock periods, and the Vernier stage resolves the remainder. The result is a theoretical measurement resolution of 480 ps.

## Ring oscillators on the FPGA

The two clocks come from ring oscillators built inside the FPGA from cascaded CARRY4 primitives. Their physical placement was optimised to control routing parasitics, which directly affect the oscillator period and the quality of the clock waveform.

## Statistical calibration

An ideal Vernier TDC assumes the step size, the period difference between the two clocks, is a fixed constant. Real ring oscillators jitter, so that assumption does not hold. Clock jitter was characterised with oscilloscope measurements, and a statistical calibration method was developed to estimate the Vernier step size from experiment. The measured value replaces the ideal constant in the conversion.
