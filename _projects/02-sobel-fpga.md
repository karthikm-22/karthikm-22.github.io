---
title: Configurable 3×3 Convolution Engine for FPGA-Based Image Processing
order: 2
tag: FPGA · Image Processing
summary: Sobel algorithm in Verilog with a complete PC-FPGA-PC pipeline over UART on a Xilinx Nexys7.
meta: 2.015 ms per 256 × 256 image
image: ""
mark: FPGA

# ── Detail page (only used because this file has text below the ---) ──
heading: Configurable 3×3 Convolution Engine for FPGA-Based Image Processing
eyebrow:  FPGA · Image Processing · Digital Systems
intro: A configurable 3×3 convolution Engine for FPGA-Based architecture for grayscale images on a Nexys A7 FPGA, using BRAM-based buffering, three line buffers, and a 3×3 sliding window to support streaming image processing.
cover: images/sobel/sys_block.jpg
cover_caption: "Fig. 1 — System-level block diagram"
report: files/PPG-Report.pdf
---

## Overview of the Project:

The implementation processes an input image entirely through a MATLAB–FPGA-MATLAB flow. The image is first pre-processed in MATLAB and transmitted to the FPGA over UART. The FPGA implements the Sobel edge-detection architecture, computes the edge map in hardware, and sends the processed pixel stream back to the PC over UART. MATLAB then performs post-processing to reconstruct and display the final edge-detected image, completing the end-to-end hardware–software workflow. 

• Designed and implemented a modular Sobel edge detection architecture for grayscale images on a Nexys A7 FPGA, using BRAM-based buffering, three line buffers, and a 3×3 sliding window to support streaming image processing.
• Implemented horizontal and vertical gradient computation using a configurable 3×3 coefficient window, allowing the architecture to be adapted to other window-based image processing and detection algorithms by changing the kernel coefficients.
• Developed a MATLAB–FPGA verification framework over UART for image data transfer and hardware validation against a golden MATLAB reference model, achieving matching edge detection results.

## Results

### Input

![Input Images](images/sobel/inputs.png)

### Input

[!Output Images](images/sobel/outputs.png)

### Demonstration Video


