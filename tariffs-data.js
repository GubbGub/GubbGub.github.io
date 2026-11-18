/* Data for the tariffs article (tariffs.html).
   LEARN: the charts are drawn FROM this file by charts.js. Change a number here
   and the chart redraws itself; nothing is a picture.

   The four FRED series below are rewritten automatically by
   tools/update_tariff_data.py (run: python3 tools/update_tariff_data.py).
   Everything else is typed in by hand from the sources named next to it. */

window.TARIFF_DATA = {
  pulled: "2026-11-18",

  /* ---------- FRED series (auto-updated) ---------- */

  // BLS manufacturing employment, thousands of jobs (FRED: MANEMP)
  manemp: [
    ["2024-01", 12875], ["2024-02", 12852], ["2024-03", 12836], ["2024-04", 12833],
    ["2024-05", 12825], ["2024-06", 12814], ["2024-07", 12806], ["2024-08", 12772],
    ["2024-09", 12758], ["2024-10", 12697], ["2024-11", 12711], ["2024-12", 12693],
    ["2025-01", 12673], ["2025-02", 12671], ["2025-03", 12666], ["2025-04", 12662],
    ["2025-05", 12651], ["2025-06", 12636], ["2025-07", 12625], ["2025-08", 12615],
    ["2025-09", 12612], ["2025-10", 12603], ["2025-11", 12593], ["2025-12", 12580],
    ["2026-01", 12582], ["2026-02", 12583], ["2026-03", 12598], ["2026-04", 12597],
    ["2026-05", 12595], ["2026-06", 12608], ["2026-07", 12622], ["2026-08", 12638]
  ],

  // Fed broad trade-weighted dollar index, monthly average (FRED: DTWEXBGS)
  dollar: [
    ["2024-07", 123.4], ["2024-08", 122.6], ["2024-09", 121.9], ["2024-10", 123.6],
    ["2024-11", 126.3], ["2024-12", 127.6], ["2025-01", 128.8], ["2025-02", 127.9],
    ["2025-03", 126.2], ["2025-04", 124.1], ["2025-05", 122.3], ["2025-06", 120.6],
    ["2025-07", 120.1], ["2025-08", 120.6], ["2025-09", 120.0], ["2025-10", 120.8],
    ["2025-11", 121.4], ["2025-12", 120.2], ["2026-01", 119.2], ["2026-02", 117.9],
    ["2026-03", 119.9], ["2026-04", 119.0], ["2026-05", 118.8], ["2026-06", 120.1],
    ["2026-07", 120.6], ["2026-08", 118.9], ["2026-09", 119.2], ["2026-10", 121.5]
  ],

  // Core PCE inflation, % change from a year earlier, computed from FRED: PCEPILFE
  corePce: [
    ["2024-07", 2.81], ["2024-08", 2.90], ["2024-09", 2.84], ["2024-10", 2.90],
    ["2024-11", 2.87], ["2024-12", 2.90], ["2025-01", 2.81], ["2025-02", 2.82],
    ["2025-03", 2.56], ["2025-04", 2.68], ["2025-05", 2.79], ["2025-06", 2.83],
    ["2025-07", 2.84], ["2025-08", 2.85], ["2025-09", 2.82], ["2025-10", 2.70],
    ["2025-11", 2.72], ["2025-12", 2.87], ["2026-01", 2.94], ["2026-02", 2.96],
    ["2026-03", 3.11], ["2026-04", 3.08], ["2026-05", 3.16], ["2026-06", 3.04],
    ["2026-07", 3.00], ["2026-08", 3.03], ["2026-09", 3.12]
  ],

  // Federal customs duties, $ billions at an annual rate, quarterly (FRED: B235RC1Q027SBEA)
  customs: [
    ["2022-01", 108.7], ["2022-04", 108.5], ["2022-07", 101.1], ["2022-10", 91.1],
    ["2023-01", 85.7], ["2023-04", 82.3], ["2023-07", 78.9], ["2023-10", 79.7],
    ["2024-01", 80.5], ["2024-04", 79.7], ["2024-07", 85.1], ["2024-10", 89.1],
    ["2025-01", 103.7], ["2025-04", 270.6], ["2025-07", 333.8], ["2025-10", 366.7],
    ["2026-01", 326.2], ["2026-04", 306.4], ["2026-07", 275.3]
  ],

  /* ---------- Typed in by hand ---------- */

  // Share of the 2025 tariffs borne in the U.S., % (NY Fed Feb 2026; Kiel Jan 2026; Freund 2026)
  whoPaid: [
    { study: "New York Fed", period: "first 8 months of 2025", us: 94 },
    { study: "Kiel Institute", period: "2025 shipments", us: 96 },
    { study: "Caroline Freund", period: "2025, volume-weighted", us: 53 }
  ],

  // Yale Budget Lab average effective / statutory tariff rate, % (State of U.S. Tariffs reports)
  tariffRate: [
    { when: "2022–24", note: "average*", v: 2.7 },
    { when: "Jul 2025", note: "EU deal", v: 18.2 },
    { when: "Nov 2025", note: "", v: 16.8 },
    { when: "Jan 2026", note: "", v: 16.9 },
    { when: "Feb 20, 2026", note: "IEEPA struck", v: 9.1 },
    { when: "Apr 2026", note: "+ Sec. 122", v: 11.0 },
    { when: "Jul 24, 2026", note: "Sec. 301", v: 11.1 },
    { when: "Aug 2026", note: "latest", v: 11.0 }
  ],

  // Dallas Fed estimate of core PCE inflation without tariffs, March 2026
  corePceNoTariffs: { d: "2026-03", v: 2.3 },

  // Events drawn as dashed lines on the time charts
  events: {
    tariffs: { d: "2025-04", label: "Tariffs begin" },
    court: { d: "2026-02", label: "Court ruling" }
  }
};
