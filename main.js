(function () {
  "use strict";
  var S = window.SITE || {};
  document.documentElement.classList.remove("no-js");

  /* ---------- Textos configurables ---------- */
  document.querySelectorAll("[data-site]").forEach(function (el) {
    var v = S[el.getAttribute("data-site")];
    if (v) el.textContent = v;
  });
  var R = S.reservas || {};
  document.querySelectorAll("[data-res]").forEach(function (el) {
    var v = R[el.getAttribute("data-res")];
    if (v) el.textContent = v;
  });

  /* ---------- WhatsApp ---------- */
  var num = String(S.whatsapp || "").replace(/\D/g, "");
  if (num) {
    var waUrl = "https://wa.me/" + num +
      (S.mensajeWhatsapp ? "?text=" + encodeURIComponent(S.mensajeWhatsapp) : "");
    document.querySelectorAll("[data-wa]").forEach(function (a) {
      a.href = waUrl;
      a.target = "_blank";
      a.rel = "noopener";
    });
  } else {
    console.warn("[config.js] Falta el número de WhatsApp (SITE.whatsapp).");
  }

  /* ---------- Email opcional ---------- */
  if (S.email) {
    var el = document.getElementById("email-link");
    el.href = "mailto:" + S.email;
    el.textContent = S.email;
    document.getElementById("email-line").hidden = false;
  }

  /* ---------- Mapa y enlaces de Google Maps ---------- */
  if (S.direccionMapa) {
    var q = encodeURIComponent(S.direccionMapa);
    var frame = document.getElementById("map-frame");
    if (frame) frame.src = "https://www.google.com/maps?q=" + q + "&output=embed";
    var open = document.getElementById("maps-open");
    if (open) open.href = "https://www.google.com/maps/search/?api=1&query=" + q;
    document.querySelectorAll(".map-fallback").forEach(function (a) { a.href = open.href; });
    var dir = document.getElementById("maps-dir");
    if (dir) dir.href = "https://www.google.com/maps/dir/?api=1&destination=" + q;
  }

  /* ---------- Carrusel ---------- */
  var items = Array.isArray(S.galeria) ? S.galeria : [];
  var track = document.getElementById("car-track");
  var dots = document.getElementById("car-dots");
  var thumbs = document.getElementById("car-thumbs");
  var cap = document.getElementById("car-caption");
  var idxEl = document.getElementById("car-index");
  var prev = document.querySelector(".car-prev");
  var next = document.querySelector(".car-next");
  var current = 0;

  if (track && items.length) {
    track.innerHTML = "";
    items.forEach(function (it, i) {
      var li = document.createElement("li");
      li.className = "car-slide";
      li.setAttribute("aria-roledescription", "foto");
      li.setAttribute("aria-label", (i + 1) + " de " + items.length + ": " + (it.titulo || ""));
      var img = document.createElement("img");
      img.src = it.thumb || it.src;
      if (it.thumb) {
        img.srcset = it.thumb + " 820w, " + it.src + " 1800w";
        img.sizes = "(min-width: 960px) 60vw, 100vw";
      }
      img.alt = it.alt || it.titulo || "";
      img.width = 1800; img.height = 1350;
      img.draggable = false;
      if (i > 1) img.loading = "lazy";
      img.decoding = "async";
      if (it.pos) img.style.objectPosition = it.pos;
      li.appendChild(img);
      li.addEventListener("click", function () { if (!dragMoved) openLb(i); });
      track.appendChild(li);

      var d = document.createElement("button");
      d.type = "button";
      d.setAttribute("aria-label", "Foto " + (i + 1) + ": " + (it.titulo || ""));
      d.addEventListener("click", function () { go(i); });
      dots.appendChild(d);

      var t = document.createElement("button");
      t.type = "button";
      t.setAttribute("aria-label", "Ver foto " + (i + 1) + ": " + (it.titulo || ""));
      var ti = document.createElement("img");
      ti.src = it.thumb || it.src; ti.alt = ""; ti.loading = "lazy";
      if (it.pos) ti.style.objectPosition = it.pos;
      t.appendChild(ti);
      t.addEventListener("click", function () { go(i); });
      thumbs.appendChild(t);
    });
    document.getElementById("car-total").textContent = items.length;
  }
  var slides = track ? track.children : [];

  function width() { return track.clientWidth || 1; }
  function go(i, instant) {
    i = Math.max(0, Math.min(items.length - 1, i));
    track.scrollTo({ left: i * width(), behavior: instant ? "instant" : "smooth" });
  }
  function update(i) {
    if (i === current && cap.dataset.init) return;
    current = i;
    cap.dataset.init = "1";
    var it = items[i] || {};
    cap.textContent = it.titulo || "";
    idxEl.textContent = i + 1;
    if (prev) prev.disabled = i === 0;
    if (next) next.disabled = i === items.length - 1;
    [dots, thumbs].forEach(function (group) {
      Array.prototype.forEach.call(group.children, function (b, j) {
        b.setAttribute("aria-current", j === i ? "true" : "false");
      });
    });
    var tb = thumbs.children[i];
    if (tb && thumbs.offsetParent) {
      thumbs.scrollTo({ left: tb.offsetLeft - thumbs.clientWidth / 2 + tb.clientWidth / 2, behavior: "smooth" });
    }
  }
  if (track && items.length) {
    var raf = null;
    track.addEventListener("scroll", function () {
      if (raf) return;
      raf = requestAnimationFrame(function () {
        raf = null;
        update(Math.round(track.scrollLeft / width()));
      });
    }, { passive: true });
    prev.addEventListener("click", function () { go(current - 1); });
    next.addEventListener("click", function () { go(current + 1); });
    track.addEventListener("keydown", function (e) {
      if (e.key === "ArrowRight") { e.preventDefault(); go(current + 1); }
      else if (e.key === "ArrowLeft") { e.preventDefault(); go(current - 1); }
      else if (e.key === "Enter") { openLb(current); }
    });
    document.querySelector(".car-zoom").addEventListener("click", function () { openLb(current); });
    window.addEventListener("resize", function () { go(current, true); });
    update(0);
  }

  /* Arrastre con mouse (en pantallas táctiles el deslizamiento es nativo) */
  var dragMoved = false;
  if (track) {
    var startX = 0, startLeft = 0, dragging = false;
    track.addEventListener("pointerdown", function (e) {
      if (e.pointerType !== "mouse" || e.button !== 0) return;
      dragging = true; dragMoved = false;
      startX = e.clientX; startLeft = track.scrollLeft;
    });
    window.addEventListener("pointermove", function (e) {
      if (!dragging) return;
      var dx = e.clientX - startX;
      if (!dragMoved && Math.abs(dx) > 6) { dragMoved = true; track.classList.add("dragging"); }
      if (dragMoved) track.scrollLeft = startLeft - dx;
    });
    window.addEventListener("pointerup", function (e) {
      if (!dragging) return;
      dragging = false;
      if (!dragMoved) return;
      track.classList.remove("dragging");
      var dx = e.clientX - startX, base = Math.round(startLeft / width());
      var target = Math.abs(dx) > width() * 0.12 ? base + (dx < 0 ? 1 : -1) : base;
      go(target);
      setTimeout(function () { dragMoved = false; }, 50);
    });
  }

  /* ---------- Visor en pantalla completa ---------- */
  var lb = document.getElementById("lightbox");
  var lbImg = document.getElementById("lb-img");
  var lbCap = document.getElementById("lb-cap");
  var lbIdx = 0, lastFocus = null;
  function show(i) {
    lbIdx = (i + items.length) % items.length;
    var it = items[lbIdx];
    lbImg.src = it.src;
    lbImg.alt = it.alt || "";
    lbCap.textContent = (it.titulo || "") + " · " + (lbIdx + 1) + " / " + items.length;
  }
  function openLb(i) {
    if (!items.length) return;
    lastFocus = document.activeElement;
    show(i);
    lb.hidden = false;
    requestAnimationFrame(function () { lb.classList.add("open"); });
    document.body.style.overflow = "hidden";
    lb.querySelector(".lb-close").focus();
  }
  function closeLb() {
    lb.classList.remove("open");
    document.body.style.overflow = "";
    lb.hidden = true;
    go(lbIdx, true);           // el carrusel queda en la última foto vista
    if (lastFocus) lastFocus.focus();
  }
  if (lb) {
    lb.querySelector(".lb-close").addEventListener("click", closeLb);
    lb.querySelector(".lb-prev").addEventListener("click", function () { show(lbIdx - 1); });
    lb.querySelector(".lb-next").addEventListener("click", function () { show(lbIdx + 1); });
    lb.addEventListener("click", function (e) { if (e.target === lb) closeLb(); });
    document.addEventListener("keydown", function (e) {
      if (lb.hidden) return;
      if (e.key === "Escape") closeLb();
      else if (e.key === "ArrowRight") show(lbIdx + 1);
      else if (e.key === "ArrowLeft") show(lbIdx - 1);
      else if (e.key === "Tab") {
        var f = lb.querySelectorAll("button"), first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    });
    var sx = null;
    lb.addEventListener("touchstart", function (e) { sx = e.touches[0].clientX; }, { passive: true });
    lb.addEventListener("touchend", function (e) {
      if (sx === null) return;
      var dx = e.changedTouches[0].clientX - sx;
      if (Math.abs(dx) > 45) show(lbIdx + (dx < 0 ? 1 : -1));
      sx = null;
    });
  }
})();
