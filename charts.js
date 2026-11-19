/* Charts and the click-to-enlarge viewer for article pages.
   LEARN: every chart is an <svg> built here from the numbers in tariffs-data.js.
   SVG is drawing with code: <line>, <rect>, <circle>, <path> and <text>, placed by
   x/y coordinates. The colors come from classes in style.css, so the charts switch
   to dark mode along with the rest of the page. */

(function () {
  var D = window.TARIFF_DATA;
  if (!D) return;

  var NS = "http://www.w3.org/2000/svg";
  var W = 720;                         // LEARN: the viewBox width. The SVG scales to fit its box.

  // Make one SVG element: el("line", {x1: 0, ...}, "optional text")
  function el(tag, attrs, text) {
    var node = document.createElementNS(NS, tag);
    for (var k in attrs) node.setAttribute(k, attrs[k]);
    if (text !== undefined) node.textContent = text;
    return node;
  }
  function add(parent, tag, attrs, text) { var n = el(tag, attrs, text); parent.appendChild(n); return n; }
  // LEARN: <title> inside a shape is what shows when you hover over it.
  function tip(node, text) { add(node, "title", {}, text); return node; }

  function svgFor(id, height, label) {
    var box = document.querySelector('[data-chart="' + id + '"]');
    if (!box) return null;
    var svg = el("svg", { viewBox: "0 0 " + W + " " + height, role: "img", "aria-label": label, class: "chart-svg" });
    box.appendChild(svg);
    return svg;
  }

  var MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  function monthName(d) { return MONTHS[Number(d.slice(5, 7)) - 1] + " " + d.slice(0, 4); }

  /* ---------- A reusable line chart ----------
     rows: [["2025-01", 128.8], ...]   fmt: how to print a value
     o.events: dashed lines   o.extra(svg, x, y, i): draw anything else on top */
  function lineChart(id, label, rows, fmt, o) {
    o = o || {};
    var H = 360, L = 74, R = W - 24, T = 30, B = H - 40;
    var svg = svgFor(id, H, label);
    if (!svg) return;

    var vals = rows.map(function (r) { return r[1]; }).concat(o.include || []);
    var lo = Math.min.apply(null, vals), hi = Math.max.apply(null, vals), span = hi - lo;
    var vmin = o.zero ? 0 : lo - span * 0.12, vmax = hi + span * 0.22;

    var x = function (i) { return L + i * (R - L) / (rows.length - 1); };
    var y = function (v) { return B - (v - vmin) / (vmax - vmin) * (B - T); };
    // LEARN: an event can fall between two data points (a quarterly series), so use the last point at or before it.
    var indexOf = function (d) { var k = 0; rows.forEach(function (r, i) { if (r[0] <= d) k = i; }); return k; };

    // Gridlines and y-axis labels
    for (var k = 0; k <= 3; k++) {
      var v = vmin + (vmax - vmin) * k / 3;
      add(svg, "line", { x1: L, x2: R, y1: y(v), y2: y(v), class: "ch-grid" });
      add(svg, "text", { x: L - 10, y: y(v) + 5, "text-anchor": "end", class: "ch-axis" }, fmt(v));
    }
    // Year labels under each January
    rows.forEach(function (r, i) {
      if (r[0].slice(5, 7) === "01") add(svg, "text", { x: x(i), y: B + 26, "text-anchor": "middle", class: "ch-axis" }, r[0].slice(0, 4));
    });
    // Event lines. Labels go left of the line, or right if the line is near the left edge.
    (o.events || []).forEach(function (e, n) {
      var xi = x(indexOf(e.d)), right = e.side ? e.side === "right" : xi < L + 150;
      add(svg, "line", { x1: xi, x2: xi, y1: T, y2: B, class: "ch-ref" });
      add(svg, "text", { x: right ? xi + 8 : xi - 8, y: T + 14 + n * 18, "text-anchor": right ? "start" : "end", class: "ch-note" }, e.label);
    });

    // LEARN: a <path> "d" string is drawing instructions: M = move to, L = line to.
    var d = rows.map(function (r, i) { return (i ? "L" : "M") + x(i).toFixed(1) + "," + y(r[1]).toFixed(1); }).join(" ");
    add(svg, "path", { d: d, class: "ch-line" });
    rows.forEach(function (r, i) {
      tip(add(svg, "circle", { cx: x(i), cy: y(r[1]), r: 3.5, class: "ch-dot" }), (o.dateFmt || monthName)(r[0]) + ": " + fmt(r[1]));
    });

    if (o.extra) o.extra(svg, x, y, indexOf);
  }

  function point(svg, xx, yy, text, anchor, cls) {
    add(svg, "text", { x: xx, y: yy, "text-anchor": anchor || "middle", class: cls || "ch-label" }, text);
  }

  /* ================= THE CHARTS ================= */

  // 1. Who paid the tariffs: stacked bars, one per study
  (function () {
    var rows = D.whoPaid, H = 300, L = 200, BW = W - L - 20, y0 = 50, h = 36, gap = 40;
    var svg = svgFor("who-paid", H, "Share of the 2025 tariffs borne in the U.S., by study");
    if (!svg) return;
    var x = function (p) { return L + p / 100 * BW; };
    rows.forEach(function (r, i) {
      var yy = y0 + i * (h + gap);
      add(svg, "text", { x: 0, y: yy + 15, class: "ch-label" }, r.study);
      add(svg, "text", { x: 0, y: yy + 33, class: "ch-axis" }, r.period);
      add(svg, "text", { x: L, y: yy - 8, class: "ch-label ch-bold" }, r.us + "% borne in the U.S.");
      tip(add(svg, "rect", { x: L, y: yy, width: x(r.us) - L, height: h, class: "ch-bar" }), r.study + ": " + r.us + "% borne in the U.S.");
      tip(add(svg, "rect", { x: x(r.us), y: yy, width: x(100) - x(r.us), height: h, class: "ch-bar-muted" }), r.study + ": " + (100 - r.us) + "% absorbed by foreign exporters");
      if (100 - r.us >= 20) add(svg, "text", { x: x(r.us) + 10, y: yy + 24, class: "ch-label" }, (100 - r.us) + "% foreign");
    });
    add(svg, "line", { x1: x(50), x2: x(50), y1: 34, y2: H - 30, class: "ch-ref" });
    point(svg, x(50), H - 8, "50% = an even split", "middle", "ch-note");
  })();

  // 2. Customs revenue, quarterly
  lineChart("customs", "Federal customs duties, billions of dollars at an annual rate",
    D.customs, function (v) { return "$" + Math.round(v) + "B"; }, {
      events: [D.events.tariffs, { d: "2026-01", label: "Court ruling", side: "right" }],
      dateFmt: function (d) { return d.slice(0, 4) + " Q" + ((Number(d.slice(5, 7)) + 2) / 3); },
      extra: function (svg, x, y) {
        var rows = D.customs, pk = rows[0], pi = 0, bi = 0;
        rows.forEach(function (r, i) { if (r[1] > pk[1]) { pk = r; pi = i; } if (r[0] === "2024-10") bi = i; });
        point(svg, x(pi), y(pk[1]) - 14, "$" + Math.round(pk[1]) + "B", "middle", "ch-label ch-bold");
        point(svg, x(bi), y(rows[bi][1]) - 14, "$" + Math.round(rows[bi][1]) + "B", "middle", "ch-note");
      }
    });

  // 3. The toy revenue model: R(t) = 100 t (1 + t)^-e
  (function () {
    var H = 360, L = 60, R = W - 24, T = 40, B = H - 50, tmax = 1.5, vmax = 30;
    var svg = svgFor("revenue-model", H, "Toy model of tariff revenue against the tariff rate");
    if (!svg) return;
    var x = function (t) { return L + t / tmax * (R - L); };
    var y = function (v) { return B - v / vmax * (B - T); };
    var rev = function (t, e) { return 100 * t * Math.pow(1 + t, -e); };
    [0, 10, 20, 30].forEach(function (v) {
      add(svg, "line", { x1: L, x2: R, y1: y(v), y2: y(v), class: "ch-grid" });
      add(svg, "text", { x: L - 10, y: y(v) + 5, "text-anchor": "end", class: "ch-axis" }, v);
    });
    [0, 0.25, 0.5, 0.75, 1, 1.25, 1.5].forEach(function (t) {
      add(svg, "text", { x: x(t), y: B + 24, "text-anchor": "middle", class: "ch-axis" }, Math.round(t * 100) + "%");
    });
    point(svg, R, B + 46, "tariff rate t →", "end", "ch-axis");
    point(svg, L, T - 16, "revenue per $100 of pre-tariff imports", "start", "ch-axis");
    [2, 3].forEach(function (e) {
      var pts = [];
      for (var t = 0; t <= tmax + 1e-9; t += 0.025) pts.push((pts.length ? "L" : "M") + x(t).toFixed(1) + "," + y(rev(t, e)).toFixed(1));
      var main = e === 3, ts = 1 / (e - 1), py = y(rev(ts, e));
      add(svg, "path", { d: pts.join(" "), class: main ? "ch-line" : "ch-line-muted" });
      tip(add(svg, "circle", { cx: x(ts), cy: py, r: 6, class: main ? "ch-dot" : "ch-dot-muted" }),
        "ε = " + e + ": revenue peaks at t = " + Math.round(ts * 100) + "%");
      point(svg, x(ts), main ? py + 30 : py - 14, "ε = " + e + ": peak at a " + Math.round(ts * 100) + "% tariff (" + rev(ts, e).toFixed(1) + ")", "middle", "ch-label ch-bold");
    });
  })();

  // 4. Core inflation, with the Fed target and the Dallas Fed's no-tariff estimate
  lineChart("core-pce", "Core PCE inflation, percent change from a year earlier",
    D.corePce, function (v) { return v.toFixed(1) + "%"; }, {
      include: [2.0, D.corePceNoTariffs.v],
      events: [D.events.tariffs],
      extra: function (svg, x, y, indexOf) {
        var L = 74, R = W - 24, est = D.corePceNoTariffs, i = indexOf(est.d), act = D.corePce[i][1];
        add(svg, "line", { x1: L, x2: R, y1: y(2), y2: y(2), class: "ch-ref ch-ref-strong" });
        point(svg, R, y(2) - 8, "Fed target: 2%", "end", "ch-note");
        add(svg, "line", { x1: x(i), x2: x(i), y1: y(act), y2: y(est.v), class: "ch-ref" });
        tip(add(svg, "circle", { cx: x(i), cy: y(est.v), r: 6, class: "ch-hollow" }), "Dallas Fed estimate without tariffs: " + est.v + "%");
        point(svg, x(i) - 12, y(est.v) + 5, "Dallas Fed: ~" + est.v + "% without tariffs", "end", "ch-note");
        point(svg, x(i), y(act) - 16, act.toFixed(1) + "% actual", "middle", "ch-label ch-bold");
        point(svg, x(i) + 12, (y(act) + y(est.v)) / 2 + 5, "gap ≈ " + (act - est.v).toFixed(1) + " pts", "start", "ch-note");
      }
    });

  // 5. The dollar
  lineChart("dollar", "Fed broad trade-weighted dollar index, monthly average",
    D.dollar, function (v) { return v.toFixed(0); }, {
      events: [{ d: D.events.tariffs.d, label: D.events.tariffs.label, side: "right" }],
      extra: function (svg, x, y, indexOf) {
        var a = indexOf("2025-01"), b = indexOf("2025-07"), va = D.dollar[a][1], vb = D.dollar[b][1];
        point(svg, x(a), y(va) - 14, "Jan 2025: " + va.toFixed(1), "middle", "ch-label ch-bold");
        point(svg, x(b), y(vb) + 28, "Jul 2025: " + vb.toFixed(1) + " (" + ((vb / va - 1) * 100).toFixed(1) + "%)", "middle", "ch-label ch-bold");
      }
    });

  // 6. The average tariff rate over time
  (function () {
    var rows = D.tariffRate, H = 330, L = 10, R = W - 10, T = 30, B = H - 56;
    var svg = svgFor("tariff-rate", H, "Average U.S. tariff rate, 2022 to 2026");
    if (!svg) return;
    var band = (R - L) / rows.length, bw = band * 0.62;
    var vmax = Math.max.apply(null, rows.map(function (r) { return r.v; })) * 1.15;
    var y = function (v) { return B - v / vmax * (B - T); };
    add(svg, "line", { x1: L, x2: R, y1: B, y2: B, class: "ch-axis-line" });
    rows.forEach(function (r, i) {
      var cx = L + i * band + band / 2, last = i === rows.length - 1;
      tip(add(svg, "rect", { x: cx - bw / 2, y: y(r.v), width: bw, height: B - y(r.v), rx: 3, class: last ? "ch-bar" : "ch-bar-muted" }),
        r.when + (r.note ? " (" + r.note + ")" : "") + ": " + r.v.toFixed(1) + "%");
      point(svg, cx, y(r.v) - 8, r.v.toFixed(1) + "%", "middle", "ch-label ch-bold");
      point(svg, cx, B + 22, r.when, "middle", "ch-label ch-small");
      if (r.note) point(svg, cx, B + 40, r.note, "middle", "ch-axis ch-small");
    });
  })();

  // 7. Manufacturing jobs
  lineChart("manemp", "U.S. manufacturing employment, millions of jobs",
    D.manemp, function (v) { return (v / 1000).toFixed(2) + "M"; }, {
      events: [D.events.tariffs, D.events.court],
      extra: function (svg, x, y) {
        var rows = D.manemp, lo = 0;
        rows.forEach(function (r, i) { if (r[1] < rows[lo][1]) lo = i; });
        var f = function (v) { return (v / 1000).toFixed(2) + "M"; }, n = rows.length - 1;
        point(svg, x(0), y(rows[0][1]) - 14, f(rows[0][1]), "start", "ch-label ch-bold");
        point(svg, x(lo) + 12, y(rows[lo][1]) + 28, "Low: " + f(rows[lo][1]), "end", "ch-label ch-bold");
        point(svg, x(n), y(rows[n][1]) - 14, f(rows[n][1]), "end", "ch-label ch-bold");
      }
    });
})();

/* ================= CLICK TO ENLARGE =================
   LEARN: <dialog> is a built-in pop-up. showModal() opens it on top of the page,
   dims everything behind it, and closes it when the visitor presses Esc.
   Any <figure class="zoom"> (a chart or a picture) can be opened this way. */
(function () {
  var dialog = document.getElementById("lightbox");
  if (!dialog) return;
  var stage = dialog.querySelector(".lightbox-stage");

  function open(fig) {
    stage.innerHTML = "";
    // LEARN: cloneNode(true) copies the figure and everything inside it.
    var copy = fig.cloneNode(true);
    copy.classList.remove("zoom");
    copy.removeAttribute("tabindex");
    copy.removeAttribute("role");
    // LEARN: a picture can name a bigger or fuller version to show when enlarged (data-zoom-src).
    copy.querySelectorAll("img[data-zoom-src]").forEach(function (img) { img.src = img.dataset.zoomSrc; img.removeAttribute("loading"); });
    stage.appendChild(copy);
    dialog.showModal();
  }

  document.querySelectorAll("figure.zoom").forEach(function (fig) {
    fig.setAttribute("tabindex", "0");
    fig.setAttribute("role", "button");
    fig.setAttribute("aria-label", "Enlarge: " + (fig.querySelector("figcaption") || fig).textContent.trim().slice(0, 80));
    fig.addEventListener("click", function (e) {
      // LEARN: clicks "bubble up" from a link to the figure around it. If the click
      // was on a link (like a source in the caption), let the link do its job instead.
      if (e.target.closest("a")) return;
      open(fig);
    });
    fig.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(fig); }
    });
  });

  dialog.querySelector(".lightbox-close").addEventListener("click", function () { dialog.close(); });
  // LEARN: a click on the dim backdrop lands on the <dialog> itself, so close it then.
  dialog.addEventListener("click", function (e) { if (e.target === dialog) dialog.close(); });
})();
