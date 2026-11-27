---
title: Configurable 3×3 Convolution Engine for FPGA-Based Image Processing
order: 2
tag: FPGA · Image Processing
summary: Sobel algorithm in Verilog with a complete PC-FPGA-PC pipeline over UART on a Xilinx Nexys7.
meta: 2.015 ms per 256 × 256 image
image: images/sobel/outputs.png
mark: FPGA

# ── Detail page (only used because this file has text below the ---) ──
heading: Configurable 3×3 Convolution Engine for FPGA-Based Image Processing
eyebrow: FPGA · Image Processing · Digital Systems
intro: A 3×3 convolution engine for grayscale images on a Nexys A7 FPGA, configured here as a Sobel edge detector. Images travel from MATLAB to the FPGA and back over UART, so the whole pipeline is verified end to end in hardware. EL467 Digital Programming course project, with Udita Chatwani.
cover: images/sobel/system-block.png
cover_caption: "Fig. 1 — System-level block diagram: MATLAB sends the image over UART into BRAM, the FPGA computes the edge map, and UART returns it to MATLAB."
report: ""
---

## Overview

The image goes through a complete MATLAB → FPGA → MATLAB flow. MATLAB pre-processes the image and sends it to the FPGA over UART. The FPGA computes the edge map in hardware and streams the processed pixels back over UART, where MATLAB rebuilds and displays the final edge-detected image.

The architecture uses BRAM buffering, three line buffers and a 3×3 sliding window, so pixels are processed as a stream. The gradient computation reads its coefficients from a configurable 3×3 window: changing the kernel coefficients adapts the same hardware to other window-based image-processing and detection algorithms.

The hardware output was checked against a golden MATLAB reference model, and the edge maps match.

## Sobel edge detection

Sobel finds edges by convolving the image A with two 3×3 kernels. One measures the horizontal gradient, the other the vertical gradient. Where the intensity changes sharply, the gradient is large and an edge is marked.

```
       [ −1   0  +1 ]
  Gx = [ −2   0  +2 ] * A
       [ −1   0  +1 ]

       [ −1  −2  −1 ]
  Gy = [  0   0   0 ] * A
       [ +1  +2  +1 ]
```

Taking H and V as the absolute values of Gx and Gy, the true edge strength is E = √(H² + V²). On the FPGA this is approximated as `E ≈ H + V`, because an addition costs far less logic than squaring (a multiplication) and a square root.

Each 8-bit output pixel is then thresholded: `I = 255` if E is above the threshold, otherwise `I = 0`. A high threshold keeps only strong edges and suppresses noise but can miss fine detail. A low threshold catches weaker edges but lets noise through. The value is chosen for each image to balance edge clarity against noise.

## Implementation

### Pre-processing in MATLAB

The script reads the input image, converts it to grayscale, resizes it to 256 × 256 and zero-pads it into a square matrix. The image is flattened row by row into a 1-D array of 2-digit hex values. Then 256 leading and 256 trailing `00` entries are added, forming a 256 × 258 stream that handles the image borders. This padded data is written to a `.hex` file for loading into the FPGA's BRAM.

### UART formatting and transmission

A second part of the script opens a serial port, reads the hex file and converts each entry back to an 8-bit integer. A `00` byte is inserted after every pixel to match the reception speed of the FPGA's UART receiver. The byte stream is then sent to the FPGA at 115200 bps and the port is closed.

### Processing on the FPGA

The design is split into five Verilog modules and two block RAMs (Fig. 1):

1. `top_sobel_final_io`: the top-level module that connects the blocks below.
2. `sobel_control`: receives the image through the UART receiver and writes it into `img_mem2`, a dual-port read-write BRAM of 66,048 × 8 bits (256 × 258 pixels).
3. `sobel`: runs the gradient computation, stores the edge map in `edge_mem`, a dual-port BRAM of 66,049 × 8 bits, and sends it out through the UART transmitter.
4. `uart_rx`: the UART receiver, 115200 bps.
5. `uart_tx`: the UART transmitter, 115200 bps.

Pixels move between the two halves of the design over an 8-bit bus, one pixel at a time.

## Results

Two test images were processed end to end: the standard Lena test image and a photograph of three penguins.

![Input images in MATLAB before transmission](images/sobel/inputs.png)
*Fig. 2 — Input images, converted to grayscale in MATLAB.*

![Edge maps rebuilt in MATLAB from the FPGA's output hex file](images/sobel/outputs.png)
*Fig. 3 — Edge maps computed on the FPGA and rebuilt in MATLAB from the output hex file.*

## Demonstration

A video demonstration of the project.

<div class="video"><iframe src="https://www.youtube-nocookie.com/embed/CXS-B9Ilgyo" title="Demonstration of the FPGA convolution engine" loading="lazy" allow="accelerometer; encrypted-media; gyroscope; picture-in-picture; fullscreen" allowfullscreen></iframe></div>

*[Watch on YouTube](https://youtu.be/CXS-B9Ilgyo)*
