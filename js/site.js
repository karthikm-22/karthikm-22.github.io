/* Applies the settings from config.js to the page.
   You shouldn't need to edit this file — edit config.js instead. */
(function () {
  var S = window.SITE || {};
  var photos = S.photos || {};
  var has = function (v) { return typeof v === "string" && v.trim() !== ""; };
  var $$ = function (sel) { return Array.prototype.slice.call(document.querySelectorAll(sel)); };

  // Links: <a data-link="github"> gets its href from config, or is hidden.
  $$("[data-link]").forEach(function (a) {
    var key = a.getAttribute("data-link");
    var val = S[key];
    if (!has(val)) { a.classList.add("is-hidden"); return; }
    if (key === "email") {
      a.href = "mailto:" + val.trim();
      if (a.hasAttribute("data-show-value")) a.textContent = val.trim();
    } else {
      a.href = val.trim();
      if (/^https?:/i.test(val)) { a.target = "_blank"; a.rel = "noopener"; }
    }
  });

  // Photos: <div data-photo="sobel"> shows the image, or a tidy placeholder tile.
  $$("[data-photo]").forEach(function (box) {
    var key = box.getAttribute("data-photo");
    var src = photos[key];
    var fallback = function () {
      if (box.hasAttribute("data-hide-if-empty")) { box.classList.add("is-hidden"); return; }
      box.classList.add("empty");
      box.innerHTML = "";
      var s = document.createElement("span");
      s.setAttribute("aria-hidden", "true");
      s.textContent = box.getAttribute("data-mark") || "";
      box.appendChild(s);
    };
    if (!has(src)) { fallback(); return; }
    var img = new Image();
    img.alt = box.getAttribute("data-alt") || "";
    img.loading = "lazy";
    img.onerror = fallback;            // wrong path → placeholder instead of a broken image
    img.src = src.trim();
    box.innerHTML = "";
    box.appendChild(img);
  });

  // Hide a group (e.g. the whole Contact section) when everything inside it is hidden.
  $$("[data-hide-when-empty]").forEach(function (group) {
    var visible = $$("[data-hide-when-empty] [data-link]").filter(function (el) {
      return group.contains(el) && !el.classList.contains("is-hidden");
    });
    if (visible.length === 0) {
      group.classList.add("is-hidden");
      var id = group.id;
      if (id) $$('a[href="#' + id + '"]').forEach(function (a) { a.classList.add("is-hidden"); });
    }
  });

  var y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();
})();
