/* ==========================================================================
   SITE SETTINGS — this is the only file you need to edit to fill things in.

   Rules:
   - Leave a value as ""  → that button / link / photo is hidden on the site.
   - Fill it in           → it appears automatically. No other file to touch.
   - Keep the quotes and the comma at the end of each line.
   ========================================================================== */

window.SITE = {

  /* ---------- Contact & links ---------- */
  email:    "",   // e.g. "karthik@example.com"
  github:   "",   // e.g. "https://github.com/karthik-m"
  linkedin: "",   // e.g. "https://www.linkedin.com/in/karthik-m"
  scholar:  "",   // e.g. "https://scholar.google.com/citations?user=XXXX"

  /* ---------- CV ----------
     Put the PDF inside the "files" folder, then write its path here. */
  cv: "",         // e.g. "files/Karthik-Maddimsetti-CV.pdf"

  /* ---------- Photos ----------
     Put the image inside the "images" folder, then write its path here.
     Any format works (.jpg, .png, .webp). Good sizes:
       profile  → portrait, about 800 × 1000 px
       projects → landscape, about 1600 × 1000 px                         */
  photos: {
    profile:   "",   // e.g. "images/profile.jpg"
    processor: "",   // 8-bit Processor: Register Block  (Virtuoso layout)
    sobel:     "",   // Sobel Edge Detection on FPGA      (input vs. edges)
    cardiac:   "",   // LVET and Cardiac Output           (hardware / waveforms)
    ppg:       "images/ppg/p5-6.jpg",   // PPG project — already set
    edge:      "",   // On-edge Disease Classification    (hardware + app)
    dwt:       "",   // Polyphase Multi-level DWT         (architecture)
    fir:       "",   // FIR Filter                        (block diagram)
    sap:       "",   // Simple-As-Possible Computer       (breadboard)
  },

};
