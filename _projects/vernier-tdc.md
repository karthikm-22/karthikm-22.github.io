---
title: All-Digital Vernier TDC with Statistical Calibration
order: 3
tag: FPGA · Time Measurement
summary: An all-digital Vernier time-to-digital converter on FPGA with a coarse–fine counting architecture and jitter-based statistical calibration. Ongoing project.
meta: 480 ps theoretical resolution · Ongoing
image: images/tdc/architecture.png
mark: TDC

# ── Detail page ──
heading: All-Digital Vernier TDC with Statistical Calibration
eyebrow: Ongoing Project · Verilog · FPGA · Vivado
intro: A time-to-digital converter built entirely from FPGA logic, using two asynchronous clocks and a coarse–fine counting architecture to reach a theoretical resolution of 480 ps, with a calibration method based on measured clock jitter.
cover: images/tdc/architecture.png
cover_caption: "Fig. 1 — Architecture: a slow and a fast clock generator, an edge detector, and coarse and fine counters controlled by the start and stop signals."
report: ""
---

## Architecture

A time-to-digital converter (TDC) measures the interval between two events. A Vernier TDC does this with two clocks whose periods differ slightly: the faster clock gains on the slower one by that difference every cycle, so the number of cycles it takes to catch up gives the fine part of the measurement.

This design uses two asynchronous clocks in a coarse–fine counting architecture (Fig. 1). The start signal launches the slow clock (sclk) and the stop signal launches the fast clock (fclk). The coarse counter counts slow-clock cycles to give Nc, the fine counter counts fast-clock cycles to give Nf, and an edge-detection block stops the count once the fast clock has caught up with the slow one. The result is a theoretical measurement resolution of 480 ps.

## Ring oscillators on the FPGA

The two clocks come from ring oscillators built inside the FPGA from cascaded CARRY4 primitives. Their physical placement was optimised to control routing parasitics, which directly affect the oscillator period and the quality of the clock waveform.

## Statistical calibration

An ideal Vernier TDC assumes the step size, the period difference between the two clocks, is a fixed constant. Real ring oscillators jitter, so that assumption does not hold. Clock jitter was characterised with oscilloscope measurements, and a statistical calibration method was developed to estimate the Vernier step size from experiment. The measured value replaces the ideal constant in the conversion.

## Experimental setup

The design runs on a Nexys A7 board, with the fine count shown on the board's LEDs and the two clocks probed on an oscilloscope. The measured clock periods were 25.24 ns for the slow clock and 24.76 ns for the fast clock, a difference of 0.48 ns, which sets the 480 ps step.

![Experimental setup with the FPGA board and oscilloscope](images/tdc/experimental-setup.jpg)
*Fig. 2 — (a) The complete setup: Nexys A7 board and oscilloscope. (b) The fine count on the board's LEDs, with the start, stop and reset buttons.*

![Oscilloscope captures of the slow and fast clocks](images/tdc/clock-waveforms.png)
*Fig. 3 — (c) Cursors marking the residual interval between the slow clock (sclk) and the fast clock (fclk). (d) The sclk and fclk waveforms.*
