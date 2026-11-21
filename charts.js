/* Charts and the click-to-enlarge viewer for article pages.
   LEARN: every chart is an <svg> built here from the numbers in tariffs-data.js.
   SVG is drawing with code: <line>, <rect>, <circle>, <path> and <text>, placed by
   x/y coordinates. The colors come from classes in style.css, so the charts switch
   to dark mode along with the rest of the page.

   BILINGUAL: the article exists twice, in English and in French. Each chart box
   (<div data-chart="...">) is drawn in the language of the section it sits in,
   read from the nearest lang="..." attribute. All the words and number formats for
   both languages live in WORDS below. */

(function () {
  var D = window.TARIFF_DATA;
  if (!D) return;

  var NS = "http://www.w3.org/2000/svg";
  var W = 720;                         // LEARN: the viewBox width. The SVG scales to fit its box.
  var NB = " ";                   // narrow no-break space: French puts one before % and :

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
  function point(svg, xx, yy, text, anchor, cls) {
    add(svg, "text", { x: xx, y: yy, "text-anchor": anchor || "middle", class: cls || "ch-label" }, text);
  }

  /* ---------- Words and number formats, per language ----------
     LEARN: French writes 3,1 % (comma for decimals, a space before %), months in
     lowercase, and billions as "Md$" (milliards de dollars). */
  var MONTHS_EN = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  var MONTHS_FR = ["janv.", "févr.", "mars", "avr.", "mai", "juin", "juil.", "août", "sept.", "oct.", "nov.", "déc."];

  var WORDS = {
    en: {
      num: function (v, d) { return v.toFixed(d); },
      pct: function (s) { return s + "%"; },
      colon: ": ",
      billions: function (v) { return "$" + Math.round(v) + "B"; },
      millions: function (v) { return (v / 1000).toFixed(2) + "M"; },
      month: function (d) { return MONTHS_EN[Number(d.slice(5, 7)) - 1] + " " + d.slice(0, 4); },
      quarter: function (d) { return d.slice(0, 4) + " Q" + ((Number(d.slice(5, 7)) + 2) / 3); },
      event: function (e) { return e.label; },
      period: function (r) { return r.period; },
      study: function (r) { return r.study; },
      when: function (r) { return r.when; },
      note: function (r) { return r.note; },
      usShare: function (p) { return p + "% borne in the U.S."; },
      foreign: function (p) { return p + "% foreign"; },
      foreignTip: function (study, p) { return study + ": " + p + "% absorbed by foreign exporters"; },
      evenSplit: "50% = an even split",
      axisT: "tariff rate t →",
      axisRev: "revenue per $100 of pre-tariff imports",
      peak: function (e, ts, r) { return "ε = " + e + ": peak at a " + ts + "% tariff (" + r + ")"; },
      peakTip: function (e, ts) { return "ε = " + e + ": revenue peaks at t = " + ts + "%"; },
      target: "Fed target: 2%",
      noTariffs: function (v) { return "Dallas Fed: ~" + v + "% without tariffs"; },
      noTariffsTip: function (v) { return "Dallas Fed estimate without tariffs: " + v + "%"; },
      actual: function (v) { return v + "% actual"; },
      gap: function (v) { return "gap ≈ " + v + " pts"; },
      low: "Low: ",
      aria: {
        whoPaid: "Share of the 2025 tariffs borne in the U.S., by study",
        customs: "Federal customs duties, billions of dollars at an annual rate",
        model: "Toy model of tariff revenue against the tariff rate",
        corePce: "Core PCE inflation, percent change from a year earlier",
        dollar: "Fed broad trade-weighted dollar index, monthly average",
        rate: "Average U.S. tariff rate, 2022 to 2026",
        jobs: "U.S. manufacturing employment, millions of jobs"
      }
    },
    fr: {
      num: function (v, d) { return v.toFixed(d).replace(".", ","); },
      pct: function (s) { return s + NB + "%"; },
      colon: NB + ": ",
      billions: function (v) { return Math.round(v) + NB + "Md$"; },
      millions: function (v) { return (v / 1000).toFixed(2).replace(".", ",") + NB + "M"; },
      month: function (d) { return MONTHS_FR[Number(d.slice(5, 7)) - 1] + " " + d.slice(0, 4); },
      quarter: function (d) { return "T" + ((Number(d.slice(5, 7)) + 2) / 3) + " " + d.slice(0, 4); },
      event: function (e) { return e.labelFr || e.label; },
      period: function (r) { return r.periodFr || r.period; },
      study: function (r) { return r.studyFr || r.study; },
      when: function (r) { return r.whenFr || r.when; },
      note: function (r) { return r.noteFr === undefined ? r.note : r.noteFr; },
      usShare: function (p) { return p + NB + "% payés aux États-Unis"; },
      foreign: function (p) { return p + NB + "% étranger"; },
      foreignTip: function (study, p) { return study + NB + ": " + p + NB + "% absorbés par les exportateurs étrangers"; },
      evenSplit: "50" + NB + "% = partage égal",
      axisT: "taux du droit de douane t →",
      axisRev: "recettes pour 100 $ d'importations avant droits",
      peak: function (e, ts, r) { return "ε = " + e + NB + ": maximum à " + ts + NB + "% (" + r + ")"; },
      peakTip: function (e, ts) { return "ε = " + e + NB + ": recettes maximales pour t = " + ts + NB + "%"; },
      target: "Cible de la Fed" + NB + ": 2" + NB + "%",
      noTariffs: function (v) { return "Fed de Dallas" + NB + ": ~" + v + NB + "% sans droits"; },
      noTariffsTip: function (v) { return "Estimation de la Fed de Dallas sans droits de douane" + NB + ": " + v + NB + "%"; },
      actual: function (v) { return v + NB + "% réel"; },
      gap: function (v) { return "écart ≈ " + v + NB + "pt"; },
      low: "Min." + NB + ": ",
      aria: {
        whoPaid: "Part des droits de douane de 2025 supportée aux États-Unis, par étude",
        customs: "Droits de douane fédéraux, en milliards de dollars en rythme annuel",
        model: "Modèle simplifié des recettes douanières selon le taux",
        corePce: "Inflation PCE sous-jacente, variation sur un an en pourcentage",
        dollar: "Indice large du dollar pondéré par les échanges de la Fed, moyenne mensuelle",
        rate: "Taux moyen des droits de douane américains, de 2022 à 2026",
        jobs: "Emploi manufacturier américain, en millions"
      }
    }
  };

  function newSvg(box, height, label) {
    var svg = el("svg", { viewBox: "0 0 " + W + " " + height, role: "img", "aria-label": label, class: "chart-svg" });
    box.appendChild(svg);
    return svg;
  }

  /* ---------- A reusable line chart ----------
     rows: [["2025-01", 128.8], ...]   fmt: how to print a value
     o.events: dashed lines   o.extra(svg, x, y, indexOf): draw anything else on top */
  function lineChart(box, T, label, rows, fmt, o) {
    o = o || {};
    var H = 360, L = 74, R = W - 24, Tp = 30, B = H - 40;
    var svg = newSvg(box, H, label);

    var vals = rows.map(function (r) { return r[1]; }).concat(o.include || []);
    var lo = Math.min.apply(null, vals), hi = Math.max.apply(null, vals), span = hi - lo;
    var vmin = o.zero ? 0 : lo - span * 0.12, vmax = hi + span * 0.22;

    var x = function (i) { return L + i * (R - L) / (rows.length - 1); };
    var y = function (v) { return B - (v - vmin) / (vmax - vmin) * (B - Tp); };
    // LEARN: an event can fall between two data points (a quarterly series), so use the last point at or before it.
    var indexOf = function (d) { var k = 0; rows.forEach(function (r, i) { if (r[0] <= d) k = i; }); return k; };

    for (var k = 0; k <= 3; k++) {
      var v = vmin + (vmax - vmin) * k / 3;
      add(svg, "line", { x1: L, x2: R, y1: y(v), y2: y(v), class: "ch-grid" });
      add(svg, "text", { x: L - 10, y: y(v) + 5, "text-anchor": "end", class: "ch-axis" }, fmt(v));
    }
    rows.forEach(function (r, i) {
      if (r[0].slice(5, 7) === "01") add(svg, "text", { x: x(i), y: B + 26, "text-anchor": "middle", class: "ch-axis" }, r[0].slice(0, 4));
    });
    // Event lines. Labels go left of the line, or right if the line is near the left edge.
    (o.events || []).forEach(function (e, n) {
      var xi = x(indexOf(e.d)), right = e.side ? e.side === "right" : xi < L + 150;
      add(svg, "line", { x1: xi, x2: xi, y1: Tp, y2: B, class: "ch-ref" });
      add(svg, "text", { x: right ? xi + 8 : xi - 8, y: Tp + 14 + n * 18, "text-anchor": right ? "start" : "end", class: "ch-note" }, T.event(e));
    });

    // LEARN: a <path> "d" string is drawing instructions: M = move to, L = line to.
    var d = rows.map(function (r, i) { return (i ? "L" : "M") + x(i).toFixed(1) + "," + y(r[1]).toFixed(1); }).join(" ");
    add(svg, "path", { d: d, class: "ch-line" });
    rows.forEach(function (r, i) {
      tip(add(svg, "circle", { cx: x(i), cy: y(r[1]), r: 3.5, class: "ch-dot" }), (o.dateFmt || T.month)(r[0]) + T.colon + fmt(r[1]));
    });

    if (o.extra) o.extra(svg, x, y, indexOf);
  }

  /* ================= THE CHARTS ================= */
  var CHARTS = {};

  // 1. Who paid the tariffs: stacked bars, one per study
  CHARTS["who-paid"] = function (box, T) {
    var rows = D.whoPaid, H = 300, L = 200, BW = W - L - 20, y0 = 50, h = 36, gap = 40;
    var svg = newSvg(box, H, T.aria.whoPaid);
    var x = function (p) { return L + p / 100 * BW; };
    rows.forEach(function (r, i) {
      var yy = y0 + i * (h + gap);
      add(svg, "text", { x: 0, y: yy + 15, class: "ch-label" }, T.study(r));
      add(svg, "text", { x: 0, y: yy + 33, class: "ch-axis" }, T.period(r));
      add(svg, "text", { x: L, y: yy - 8, class: "ch-label ch-bold" }, T.usShare(r.us));
      tip(add(svg, "rect", { x: L, y: yy, width: x(r.us) - L, height: h, class: "ch-bar" }), T.study(r) + T.colon + T.usShare(r.us));
      tip(add(svg, "rect", { x: x(r.us), y: yy, width: x(100) - x(r.us), height: h, class: "ch-bar-muted" }), T.foreignTip(T.study(r), 100 - r.us));
      if (100 - r.us >= 20) add(svg, "text", { x: x(r.us) + 10, y: yy + 24, class: "ch-label" }, T.foreign(100 - r.us));
    });
    add(svg, "line", { x1: x(50), x2: x(50), y1: 34, y2: H - 30, class: "ch-ref" });
    point(svg, x(50), H - 8, T.evenSplit, "middle", "ch-note");
  };

  // 2. Customs revenue, quarterly
  CHARTS["customs"] = function (box, T) {
    lineChart(box, T, T.aria.customs, D.customs, T.billions, {
      events: [D.events.tariffs, { d: "2026-01", label: D.events.court.label, labelFr: D.events.court.labelFr, side: "right" }],
      dateFmt: T.quarter,
      extra: function (svg, x, y) {
        var rows = D.customs, pk = rows[0], pi = 0, bi = 0;
        rows.forEach(function (r, i) { if (r[1] > pk[1]) { pk = r; pi = i; } if (r[0] === "2024-10") bi = i; });
        point(svg, x(pi), y(pk[1]) - 14, T.billions(pk[1]), "middle", "ch-label ch-bold");
        point(svg, x(bi), y(rows[bi][1]) - 14, T.billions(rows[bi][1]), "middle", "ch-note");
      }
    });
  };

  // 3. The toy revenue model: R(t) = 100 t (1 + t)^-e
  CHARTS["revenue-model"] = function (box, T) {
    var H = 360, L = 60, R = W - 24, Tp = 40, B = H - 50, tmax = 1.5, vmax = 30;
    var svg = newSvg(box, H, T.aria.model);
    var x = function (t) { return L + t / tmax * (R - L); };
    var y = function (v) { return B - v / vmax * (B - Tp); };
    var rev = function (t, e) { return 100 * t * Math.pow(1 + t, -e); };
    [0, 10, 20, 30].forEach(function (v) {
      add(svg, "line", { x1: L, x2: R, y1: y(v), y2: y(v), class: "ch-grid" });
      add(svg, "text", { x: L - 10, y: y(v) + 5, "text-anchor": "end", class: "ch-axis" }, v);
    });
    [0, 0.25, 0.5, 0.75, 1, 1.25, 1.5].forEach(function (t) {
      add(svg, "text", { x: x(t), y: B + 24, "text-anchor": "middle", class: "ch-axis" }, T.pct(Math.round(t * 100)));
    });
    point(svg, R, B + 46, T.axisT, "end", "ch-axis");
    point(svg, L, Tp - 16, T.axisRev, "start", "ch-axis");
    [2, 3].forEach(function (e) {
      var pts = [];
      for (var t = 0; t <= tmax + 1e-9; t += 0.025) pts.push((pts.length ? "L" : "M") + x(t).toFixed(1) + "," + y(rev(t, e)).toFixed(1));
      var main = e === 3, ts = 1 / (e - 1), py = y(rev(ts, e));
      add(svg, "path", { d: pts.join(" "), class: main ? "ch-line" : "ch-line-muted" });
      tip(add(svg, "circle", { cx: x(ts), cy: py, r: 6, class: main ? "ch-dot" : "ch-dot-muted" }), T.peakTip(e, Math.round(ts * 100)));
      point(svg, x(ts), main ? py + 30 : py - 14, T.peak(e, Math.round(ts * 100), T.num(rev(ts, e), 1)), "middle", "ch-label ch-bold");
    });
  };

  // 4. Core inflation, with the Fed target and the Dallas Fed's no-tariff estimate
  CHARTS["core-pce"] = function (box, T) {
    var f = function (v) { return T.pct(T.num(v, 1)); };
    lineChart(box, T, T.aria.corePce, D.corePce, f, {
      include: [2.0, D.corePceNoTariffs.v],
      events: [D.events.tariffs],
      extra: function (svg, x, y, indexOf) {
        var L = 74, R = W - 24, est = D.corePceNoTariffs, i = indexOf(est.d), act = D.corePce[i][1];
        add(svg, "line", { x1: L, x2: R, y1: y(2), y2: y(2), class: "ch-ref ch-ref-strong" });
        point(svg, R, y(2) - 8, T.target, "end", "ch-note");
        add(svg, "line", { x1: x(i), x2: x(i), y1: y(act), y2: y(est.v), class: "ch-ref" });
        tip(add(svg, "circle", { cx: x(i), cy: y(est.v), r: 6, class: "ch-hollow" }), T.noTariffsTip(T.num(est.v, 1)));
        point(svg, x(i) - 12, y(est.v) + 5, T.noTariffs(T.num(est.v, 1)), "end", "ch-note");
        point(svg, x(i), y(act) - 16, T.actual(T.num(act, 1)), "middle", "ch-label ch-bold");
        point(svg, x(i) + 12, (y(act) + y(est.v)) / 2 + 5, T.gap(T.num(act - est.v, 1)), "start", "ch-note");
      }
    });
  };

  // 5. The dollar
  CHARTS["dollar"] = function (box, T) {
    lineChart(box, T, T.aria.dollar, D.dollar, function (v) { return T.num(v, 1); }, {
      events: [{ d: D.events.tariffs.d, label: D.events.tariffs.label, labelFr: D.events.tariffs.labelFr, side: "right" }],
      extra: function (svg, x, y, indexOf) {
        var a = indexOf("2025-01"), b = indexOf("2025-07"), va = D.dollar[a][1], vb = D.dollar[b][1];
        point(svg, x(a), y(va) - 14, T.month("2025-01") + T.colon + T.num(va, 1), "middle", "ch-label ch-bold");
        point(svg, x(b), y(vb) + 28, T.month("2025-07") + T.colon + T.num(vb, 1) + " (" + T.pct(T.num((vb / va - 1) * 100, 1)) + ")", "middle", "ch-label ch-bold");
      }
    });
  };

  // 6. The average tariff rate over time
  CHARTS["tariff-rate"] = function (box, T) {
    var rows = D.tariffRate, H = 330, L = 10, R = W - 10, Tp = 30, B = H - 56;
    var svg = newSvg(box, H, T.aria.rate);
    var band = (R - L) / rows.length, bw = band * 0.62;
    var vmax = Math.max.apply(null, rows.map(function (r) { return r.v; })) * 1.15;
    var y = function (v) { return B - v / vmax * (B - Tp); };
    add(svg, "line", { x1: L, x2: R, y1: B, y2: B, class: "ch-axis-line" });
    rows.forEach(function (r, i) {
      var cx = L + i * band + band / 2, last = i === rows.length - 1, note = T.note(r);
      tip(add(svg, "rect", { x: cx - bw / 2, y: y(r.v), width: bw, height: B - y(r.v), rx: 3, class: last ? "ch-bar" : "ch-bar-muted" }),
        T.when(r) + (note ? " (" + note + ")" : "") + T.colon + T.pct(T.num(r.v, 1)));
      point(svg, cx, y(r.v) - 8, T.pct(T.num(r.v, 1)), "middle", "ch-label ch-bold");
      point(svg, cx, B + 22, T.when(r), "middle", "ch-label ch-small");
      if (note) point(svg, cx, B + 40, note, "middle", "ch-axis ch-small");
    });
  };

  // 7. Manufacturing jobs
  CHARTS["manemp"] = function (box, T) {
    lineChart(box, T, T.aria.jobs, D.manemp, T.millions, {
      events: [D.events.tariffs, D.events.court],
      extra: function (svg, x, y) {
        var rows = D.manemp, lo = 0, n = rows.length - 1;
        rows.forEach(function (r, i) { if (r[1] < rows[lo][1]) lo = i; });
        point(svg, x(0), y(rows[0][1]) - 14, T.millions(rows[0][1]), "start", "ch-label ch-bold");
        point(svg, x(lo) + 12, y(rows[lo][1]) + 28, T.low + T.millions(rows[lo][1]), "end", "ch-label ch-bold");
        point(svg, x(n), y(rows[n][1]) - 14, T.millions(rows[n][1]), "end", "ch-label ch-bold");
      }
    });
  };

  // Draw every chart box on the page, in the language of the section it sits in.
  document.querySelectorAll("[data-chart]").forEach(function (box) {
    var draw = CHARTS[box.dataset.chart];
    var holder = box.closest("[lang]");
    var lang = holder && holder.getAttribute("lang").slice(0, 2) === "fr" ? "fr" : "en";
    if (draw) draw(box, WORDS[lang]);
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
    // The viewer sits outside both languages, so it borrows the figure's language.
    var fr = !!fig.closest('[lang="fr"]');
    dialog.setAttribute("lang", fr ? "fr" : "en");
    dialog.setAttribute("aria-label", fr ? "Figure agrandie" : "Enlarged figure");
    dialog.querySelector(".lightbox-close").setAttribute("aria-label", fr ? "Fermer" : "Close");
    dialog.showModal();
  }

  document.querySelectorAll("figure.zoom").forEach(function (fig) {
    var fr = fig.closest('[lang="fr"]');
    fig.setAttribute("tabindex", "0");
    fig.setAttribute("role", "button");
    fig.setAttribute("aria-label", (fr ? "Agrandir : " : "Enlarge: ") + (fig.querySelector("figcaption") || fig).textContent.trim().slice(0, 80));
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
