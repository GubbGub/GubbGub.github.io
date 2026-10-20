# Logbook

**[gubbgub.github.io](https://gubbgub.github.io)**

A public record of what I'm building, reading and learning, written down as I go.

I built it to learn HTML and CSS properly, so it's deliberately simple: plain HTML, CSS and a little JavaScript, with no frameworks, no build step and no dependencies. Comments marked `LEARN:` throughout the file explain each technique where it's used.

<br>

## What's on it

| Section | What it holds |
|:--|:--|
| **Projects** | [AP Research on blind-crest intersections](https://github.com/GubbGub/dynamic-fya-crest-controller), [Runner Thermo](https://github.com/GubbGub/runner-thermo-sim), and the [Day Counter](https://github.com/GubbGub/day-counter) |
| **Explorations** | Drawing, guitar and pixel art, and the questions they led to |
| **Reading log** | Notes on books: the core thesis, my takeaways, and where they showed up in my life |
| **This month** | Field Notes on one animal (with its French name) and a Portrait of one under-recognized person. Past months live on the [archive](https://gubbgub.github.io/archive.html) |
| **Français** | Progress toward B2, with project notes in French |
| **Running** | Cross country and track |
| **Principles** | Three phrases I try to work by |

<br>

## How it's built

- **Semantic HTML** (`<nav>`, `<main>`, `<section>`, `<article>`) so browsers and screen readers understand the structure
- **CSS variables** for every color and font, swapped automatically for **dark mode**
- **CSS Grid** layouts that rearrange from four columns to one without extra code
- **System fonts**, so nothing has to download and the page loads instantly
- **A few lines of JavaScript** for the French toggle; everything else works without it

Hosted for free on GitHub Pages. Every push to `main` updates the live site in about a minute.

<br>

## Files

| File | What it does |
|:--|:--|
| `index.html` | The homepage |
| `archive.html` | Every past month of Field Notes and Portraits |
| `style.css` | Shared styles for both pages, including light and dark mode |
| `site.js` | The light/dark and French toggles |
| `monthly-data.js` | The monthly features, as data |
| `monthly.js` | Turns that data into the cards on both pages |

## Adding a new month

Open `monthly-data.js`, copy the top `{ ... }` entry, paste it above itself, and change the text and the accent color. The homepage shows the newest month and the archive picks up all of them automatically.

## Editing

Open `index.html` in a browser to preview it. Save and refresh to see changes. Anything in `[brackets]` is still a placeholder.
