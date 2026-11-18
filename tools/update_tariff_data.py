"""Refresh the FRED data behind the tariffs article.

Run from the repo folder:   python3 tools/update_tariff_data.py

LEARN: FRED (the St. Louis Fed's data site) gives any series as a CSV at
fredgraph.csv?id=SERIES. This script downloads four of them, turns them into the
same [date, value] lists charts.js expects, and rewrites only those four blocks of
tariffs-data.js. Everything typed by hand in that file is left alone.
Uses only Python's standard library, so there is nothing to install.
"""
import csv
import datetime
import io
import pathlib
import re
import urllib.request

DATA_FILE = pathlib.Path(__file__).resolve().parent.parent / "tariffs-data.js"
FRED = "https://fred.stlouisfed.org/graph/fredgraph.csv?id={id}&cosd={start}{extra}"


def fetch(series, start, extra=""):
    """Download one FRED series as [(YYYY-MM, value), ...], skipping blank months."""
    url = FRED.format(id=series, start=start, extra=extra)
    with urllib.request.urlopen(url, timeout=30) as resp:
        text = resp.read().decode("utf-8")
    return parse(text)


def parse(text):
    rows = []
    for date, value in list(csv.reader(io.StringIO(text)))[1:]:
        if value not in ("", "."):
            rows.append((date[:7], float(value)))
    return rows


def year_over_year(rows):
    """Percent change from the same month a year earlier (how inflation is reported)."""
    by_month = dict(rows)
    out = []
    for month, value in rows:
        prior = f"{int(month[:4]) - 1}{month[4:]}"
        if prior in by_month:
            out.append((month, round((value / by_month[prior] - 1) * 100, 2)))
    return out


def as_js(rows, decimals):
    """Format rows as a JS array, four entries per line, like the hand-written file."""
    cells = [f'["{m}", {v:.{decimals}f}]' if decimals else f'["{m}", {int(round(v))}]' for m, v in rows]
    lines = [", ".join(cells[i:i + 4]) for i in range(0, len(cells), 4)]
    return "[\n    " + ",\n    ".join(lines) + "\n  ]"


def replace_block(source, name, rows, decimals):
    """Swap the array after `name:` in tariffs-data.js for fresh rows."""
    pattern = re.compile(rf"({name}: )\[.*?\n  \]", re.S)
    new, count = pattern.subn(lambda m: m.group(1) + as_js(rows, decimals), source)
    if count != 1:
        raise SystemExit(f"Couldn't find the '{name}' block in {DATA_FILE.name}")
    return new


def main():
    series = {
        "manemp": (fetch("MANEMP", "2024-01-01"), 0),
        "dollar": (fetch("DTWEXBGS", "2024-07-01", "&fq=Monthly"), 1),
        "corePce": ([r for r in year_over_year(fetch("PCEPILFE", "2023-07-01")) if r[0] >= "2024-07"], 2),
        "customs": (fetch("B235RC1Q027SBEA", "2022-01-01"), 1),
    }
    source = DATA_FILE.read_text(encoding="utf-8")
    for name, (rows, decimals) in series.items():
        source = replace_block(source, name, rows, decimals)
        print(f"{name:8} {len(rows):3} points, latest {rows[-1][0]} = {rows[-1][1]}")
    source = re.sub(r'pulled: "[\d-]+"', f'pulled: "{datetime.date.today()}"', source)
    DATA_FILE.write_text(source, encoding="utf-8")
    print(f"Updated {DATA_FILE.name}. Re-check any numbers quoted in the article text.")


if __name__ == "__main__":
    main()
