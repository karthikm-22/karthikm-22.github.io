---
title: Configurable 3×3 Convolution Engine for FPGA-Based Image Processing
order: 2
tag: FPGA · Image Processing
summary: A streaming 3×3 convolution engine on a Nexys A7, configured as a Sobel edge detector and verified end to end from MATLAB over UART.
meta: 2.015 ms per 256 × 256 image
image: images/sobel/card.jpg
mark: FPGA

# ── Detail page (only used because this file has text below the ---) ──
heading: Configurable 3×3 Convolution Engine for FPGA-Based Image Processing
eyebrow: FPGA · Image processing · Nexys A7
intro: A 3×3 convolution engine for grayscale images on a Nexys A7 FPGA, configured here as a Sobel edge detector. Images travel from MATLAB to the FPGA and back over UART, so the whole pipeline is verified end to end in hardware.
video: CXS-B9Ilgyo   # YouTube video ID, shown at the top of the page
cover: ""
cover_caption: ""
report: ""
---

## Motivation

Edge detection is a window operation: every output pixel needs its eight neighbours. In software it runs pixel by pixel, while hardware can stream the image through line buffers and compute continuously. I wanted to see the whole path working, from image on a PC to edge map on the FPGA and back, not only in simulation.

## What I built and why

A streaming 3×3 convolution engine in Verilog (BRAM image storage, three line buffers, a sliding window, coefficients held in a configurable window; Sobel is the configuration shown), a MATLAB–UART–FPGA framework that sends the image and rebuilds the edge map, and a check against a golden MATLAB model: the edge maps match.

![System-level block diagram of the pipeline](images/sobel/system-block.png){: .wide}
*Fig. 1 — System-level block diagram: MATLAB sends the image over UART into BRAM, the FPGA computes the edge map, and UART returns it to MATLAB.*

- **A configurable window, not a hard-wired Sobel.** Changing the coefficients adapts the same hardware to other window-based operations. Sobel is one example.
- **E ≈ |Gx| + |Gy| instead of √(Gx² + Gy²).** One addition replaces two multiplications and a square root. The cost: the approximation overestimates the gradient by up to √2 (about 41%) when both components are equal, so diagonal edges look stronger than horizontal or vertical ones.
- **Line buffers and a sliding window.** Pixels are processed as a stream, so the image is read once.
- **Threshold of 120.** I compared thresholds and chose the value that removes noise without losing too much detail.

## Results

| Measure | Value |
| --- | --- |
| Compute time, excluding UART | 2.015 ms per 256 × 256 image |
| Cycles per row at 100 MHz | 775 (516 compute, 257 load, 2 overhead), about 3 cycles per pixel |
| UART in / out at 115200 baud | 5.73 s / 11.47 s |
| Output | matches the golden MATLAB model on test images |

Compute is about 1/8,500 of the end-to-end time, so the system is limited by the serial link, not by the engine.

![Input images in MATLAB before transmission](images/sobel/inputs.png){: .wide}
*Fig. 2 — Input images, converted to grayscale in MATLAB: the standard Lena test image and a photograph of three penguins.*

![Edge maps rebuilt in MATLAB from the FPGA's output hex file](images/sobel/outputs.png){: .wide}
*Fig. 3 — Edge maps computed on the FPGA and rebuilt in MATLAB from the output hex file.*

## Limitations

- The UART link is simple and good for verification, but it dominates the run time: 5.73 s in and 11.47 s out, against 2.015 ms of compute.
- Each row is loaded and then computed (257 + 516 cycles). Overlapping the next row's load with the current computation would shorten compute time.

## Future work and applications

- **Higher throughput.** Reduce wait states, raise the UART baud rate, or move to a faster communication protocol.
- **Real-time video.** The line buffers and the low compute time per frame mean the design can extend to edge detection on video frames once the link is faster.
- **Features for classification.** The horizontal and vertical gradients are computed separately, so they can serve as features for classifying images by edges, corners and textures, for example with a neural network.
