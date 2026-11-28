---
title: All-Digital Vernier TDC with Statistical Calibration
order: 3
tag: FPGA · Time Measurement
summary: An all-digital Vernier time-to-digital converter on FPGA with a coarse–fine counting architecture and jitter-based statistical calibration. Ongoing project.
meta: 480 ps theoretical resolution · Ongoing
image: images/tdc/experimental-setup.jpg
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

The two clocks come from ring oscillators built inside the FPGA from cascaded CARRY4 primitives. Their physical placement was optimised to control routing parasitics, which directly affect the oscillator period and the quality of the clock waveform. Each oscillator is placed as a long vertical chain in its own region of the device, one for the fast clock and one for the slow clock (Fig. 2).

![Floorplan of the two ring oscillators in Vivado](images/tdc/ring-oscillators.png)
*Fig. 2 — Floorplan in Vivado: the ring oscillator for the fast clock and the one for the slow clock, each placed as a vertical chain in its own clock region.*

## Edge detection and its limits

The edge detector is a D flip-flop that takes the fast clock as its clock and the slow clock as its data input. After a measurement starts, the fast clock edge arrives behind the slow clock edge and closes on it by one step every cycle. While the slow edge is still ahead, the flip-flop keeps sampling a high value and the count keeps incrementing. When the fast edge finally reaches the slow edge, the flip-flop output switches from high to low, the detected signal goes high and the count stops (Fig. 3).

This works cleanly only while the two edges are well separated. If the gap between them is smaller than the flip-flop's setup time, or jitter pushes one edge across the other, the flip-flop can resolve the wrong way or become metastable. The transition is then caught a cycle too early or too late, which shows up as an under-count or an over-count (the shaded cases in Fig. 3).

![The fast clock edge closing on the slow clock edge until the transition is detected](images/tdc/edge-detection.png){: .wide}
*Fig. 3 — Detecting the catch-up. The fast clock edge (black) closes on the slow clock edge (blue) each cycle and the count increments until the transition is detected. In the shaded cases, setup-time limits and jitter can make the flip-flop miss the transition.*

## Statistical calibration

An ideal Vernier TDC assumes the step size, the period difference between the two clocks, is a fixed constant. Real ring oscillators jitter, so that assumption does not hold. Clock jitter was characterised with oscilloscope measurements, and a statistical calibration method was developed to estimate the Vernier step size from experiment. The measured value replaces the ideal constant in the conversion.

To see why, write Δ<sub>n</sub> for the gap between the two edges in cycle n, so the ideal step is <span class="eq">δ<sub>n</sub> = Δ<sub>n−1</sub> − Δ<sub>n</sub></span>. Jitter shifts each edge's arrival time by a small random amount, so the step actually seen is <span class="eq">δ<sub>n</sub> = Δ<sub>n−1</sub> − Δ<sub>n</sub> + E<sub>n</sub></span>, where E<sub>n</sub> gathers the jitter errors of that cycle. It cannot be eliminated, and it makes the step vary from cycle to cycle instead of staying at 480 ps.

A varying step changes how many fast-clock cycles are needed to cover the same residual interval: fewer when the steps run large, more when they run small (Fig. 4). To correct for this, the step for each count was averaged across experiments, giving δ<sub>n,avg</sub>. The measured residual is then the sum of these calibrated steps up to the final count: <span class="eq">T<sub>measured</sub> = δ<sub>1,avg</sub> + δ<sub>2,avg</sub> + … + δ<sub>(Nf−1),avg</sub></span>.

![The same residual interval measured with the ideal, shorter and longer counts](images/tdc/residual-counting.png){: .big}
*Fig. 4 — Counting across the same residual interval T_residual: the ideal run takes 7 counts, while larger steps give an under-count (6) and smaller steps an over-count (8). The red lines mark the start and end of the interval, and the error is the overshoot past it.*

## Experimental setup

The design runs on a Nexys A7 board, with the fine count shown on the board's LEDs and the two clocks probed on an oscilloscope. The measured clock periods were 25.24 ns for the slow clock and 24.76 ns for the fast clock, a difference of 0.48 ns, which sets the 480 ps step.

![Experimental setup with the FPGA board and oscilloscope](images/tdc/experimental-setup.jpg){: .wide}
*Fig. 5 — (a) The complete setup: Nexys A7 board and oscilloscope. (b) The fine count on the board's LEDs, with the start, stop and reset buttons.*

![Oscilloscope captures of the slow and fast clocks](images/tdc/clock-waveforms.png){: .wide}
*Fig. 6 — (c) Cursors marking the residual interval between the slow clock (sclk) and the fast clock (fclk). (d) The sclk and fclk waveforms.*
