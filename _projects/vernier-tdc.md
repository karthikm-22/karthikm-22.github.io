---
title: All-Digital Vernier TDC with Statistical Calibration
order: 3
tag: FPGA · Time Measurement
summary: An all-digital Vernier time-to-digital converter on an FPGA, with ring-oscillator clocks and a calibration for clock jitter.
meta: 480 ps theoretical resolution · Ongoing
image: images/tdc/tdc_setup.jpeg
mark: TDC

# ── Detail page ──
heading: All-Digital Vernier TDC with Statistical Calibration
eyebrow: Ongoing project · Verilog · FPGA · Vivado · Nexys A7
intro: A time-to-digital converter built entirely from FPGA logic, using two ring-oscillator clocks and a coarse–fine counting architecture to reach a theoretical resolution of 480 ps, with a calibration for clock jitter.
cover: images/tdc/architecture.png
cover_caption: "Fig. 1 — Architecture: a slow and a fast clock generator, an edge detector, and coarse and fine counters controlled by the start and stop signals."
report: ""
---

## Motivation

A time-to-digital converter (TDC) turns the time between a START and a STOP event into a number. A Vernier TDC gets a resolution finer than its clock period by letting two clocks of slightly different periods chase each other. The question I worked on: with real, jittery FPGA clocks, how far can the ideal resolution be trusted, and can measurement correct for the difference?

## What I built and why

Two ring-oscillator clocks from cascaded CARRY4 primitives, one slow (25.24 ns) and one fast (24.76 ns); a D flip-flop edge detector with coarse and fine counters controlled by START and STOP; a calibration that replaces the ideal 0.48 ns step with a measured one; and a Nexys A7 test setup with the clocks probed on an oscilloscope.

![The fast clock edge closing on the slow clock edge until the transition is detected](images/tdc/edge-detection.png){: .wide}
*Fig. 2 — Detecting the catch-up. The fast clock edge (black) closes on the slow clock edge (blue) each cycle and the count increments until the transition is detected. In the shaded cases, setup-time limits and jitter can make the flip-flop miss the transition.*

- **Ring oscillators instead of MMCM clocks.** MMCM clocks all derive from the board crystal, so they cannot be started at an arbitrary START or STOP, and they take a long, unpredictable time to settle each time they are enabled. A ring oscillator starts on demand.
- **A distributed CARRY4 layout instead of one long chain.** In a long chain the feedback wire adds RC delay that is hard to tune by adding or removing blocks, and it low-pass filters the clock. Splitting the chain into shorter vertical chains gave sharper edges.

![Floorplan of the two ring oscillators in Vivado](images/tdc/ring-oscillators.png)
*Fig. 3 — Floorplan in Vivado: the ring oscillator for the fast clock and the one for the slow clock, each placed as a vertical chain in its own clock region.*

- **Resolution set by the period difference.** The step is Ts − Tf = 0.48 ns. A smaller difference gives finer resolution but needs more fast-clock cycles to catch up: the maximum fine count is Ts / (Ts − Tf), about 53, and the dead time is about 1.3 µs. Halving the step would roughly double both.
- **Calibrate the step from measurement.** Jitter makes the real step vary from count to count, so I replaced the ideal constant with the step for each count, averaged over 10 oscilloscope datasets.

![The same residual interval measured with the ideal, shorter and longer counts](images/tdc/residual-counting.png){: .wide}
*Fig. 4 — Counting across the same residual interval T_residual: the ideal run takes 7 counts, while larger steps give an under-count (6) and smaller steps an over-count (8). The red lines mark the start and end of the interval, and the error is the overshoot past it.*

## Results

- Measured clock periods are 25.24 ns (slow) and 24.76 ns (fast), which gives the 0.48 ns step. The fast clock runs at 40.38 MHz.
- Over fine counts 1 to 56, the calibrated sums differ from the ideal sums by 0.02 to 0.36 ns, so the step is not the constant the ideal model assumes.

![Experimental setup with the FPGA board and oscilloscope](images/tdc/experimental-setup.jpg){: .wide}
*Fig. 5 — (a) The complete setup: Nexys A7 board and oscilloscope. (b) The fine count on the board's LEDs, with the start, stop and reset buttons.*

![Oscilloscope captures of the slow and fast clocks](images/tdc/clock-waveforms.png){: .wide}
*Fig. 6 — (c) Cursors marking the residual interval between the slow clock (sclk) and the fast clock (fclk). (d) The sclk and fclk waveforms.*

## Trade-offs, limitations and future work

- The oscilloscope cursor resolves 50 ps, which adds up to about 200 ps of measurement error. That is large against a 480 ps step.
- START and STOP currently come from two switches, so the input cannot be controlled or swept over the full range.
- The fast clock is limited to about 40 MHz. Going faster needs fewer CARRY4 blocks, and then wire delay, which is hard to control, dominates.
- Next: quantify the calibration benefit over repeated readings, and drive START and STOP with a controlled interval.
