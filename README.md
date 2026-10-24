# Logbook

**[gubbgub.github.io](https://gubbgub.github.io)**

A public record of what I'm building, reading and learning, written down as I go.

I built it to learn HTML and CSS properly, so it's deliberately simple: plain HTML, CSS and a little JavaScript, with no frameworks, no build step and no dependencies. Comments marked `LEARN:` throughout the code explain each technique where it's used.

<br>

## What's on it

| Section | What it holds |
|:--|:--|
| **Projects** | [AP Research on blind-crest intersections](https://github.com/GubbGub/dynamic-fya-crest-controller), [Runner Thermo](https://github.com/GubbGub/runner-thermo-sim), and the [Day Counter](https://github.com/GubbGub/day-counter) |
| **This month** | Field Notes on one animal (with its French name) and a Portrait of one under-recognized person. Past months live on the [archive](https://gubbgub.github.io/archive.html) |
| **Explorations** | Drawing, guitar and pixel art, and the questions they led to |
| **Reading log** | Notes on books: the core thesis, my takeaways, and where they showed up in my life |
| **Français** | Progress toward B2, with project notes in French |
| **Running** | Varsity cross country and track at Montverde Academy |
| **Principles** | Three phrases I try to work by |

<br>

## The thinking behind it

**A logbook, not a résumé.** The site records work in progress: what I'm building, what broke, what I'm still figuring out. Finished things and unfinished things are labeled as what they are. The goal is for someone to read it and lean in, not to be impressed by claims.

**Gates Notes meets Apple.** The reading log borrows from Bill Gates's Gates Notes: book notes organized around ideas, not star ratings. The look borrows from Apple's product pages: a light gray canvas, white cards, generous space, and type that does most of the work. Serif type is used for reading and reflection, sans-serif for structure, and monospace `[TAGS]` for labels, like a lab notebook.

**One small signature per month.** Each month's Field Notes card takes its accent color from that month's animal, like the red of the macaque's face. The rest of the site stays neutral, so the personality lives in one place and changes over time.

**Everything connects.** The French word of the week comes from the animal of the month. The Portrait connects to something I've built or read, like Claude Shannon's relay logic connecting to *Code* and the Day Counter. Running connects to Runner Thermo. Nothing on the page is there just for decoration.

**Built to be maintained.** Monthly content lives in one data file instead of being copied into HTML, so adding a month takes a few minutes and the archive updates itself. Styles and scripts are shared between pages, so a change happens in one place.

**Built to be read by everyone.** Semantic HTML, keyboard focus outlines, labels for screen readers, `lang` attributes on French and Latin text, dark mode that follows the visitor's device, and a layout that works on a phone.

<br>

## How it's built

- **Semantic HTML** (`<nav>`, `<main>`, `<section>`, `<article>`) so browsers and screen readers understand the structure
- **CSS variables** for every color and font, swapped for **dark mode**, which follows the device or a toggle that remembers the visitor's choice
- **CSS Grid** layouts that rearrange from four columns to one without extra code
- **System fonts**, so nothing has to download and the page loads instantly
- **Data-driven monthly features**: `monthly-data.js` holds the content, `monthly.js` turns it into HTML on both pages
- Hosted for free on **GitHub Pages**. Every push to `main` updates the live site in about a minute.

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
| `favicon.svg`, `apple-touch-icon.png` | The tab icon and the iPhone home-screen icon |
| `images/` | Artwork, like the pixel-art macaque. All rights reserved |
| `LICENSE.md` | How the code, writing and artwork may be used |

<br>

## Roadmap

**Done**

- [x] Single-page logbook with projects, reading log, French and running
- [x] Light and dark mode, with a toggle that remembers the choice
- [x] French translations for project notes
- [x] Monthly Field Notes and Portrait, with a per-month accent color
- [x] Archive page built from the same data
- [x] Principles section

**Planned**

- [ ] **A personal logo.** A mark of my own to replace the placeholder "J" in the tab icon, used in the nav and footer too.
- [x] **Art in Field Notes.** A pixel-art snow monkey for October, signed with a small J.
- [ ] **Real images in Explorations.** The light switch drawing and its circuit diagram, guitar notes, and pixel art.
- [ ] **Fill in the placeholders.** Reading takeaways, project log entries, and running PRs.
- [ ] **More French.** A *Lire en français* option on more project notes, written myself as practice.
- [ ] **About and Contact.** A short introduction and a simple way to reach me.
- [ ] **Monthly upkeep.** A new animal, person and French word each month.

**Ideas, not commitments**

- [ ] A small Le Fleur–inspired touch beyond the monthly accent, like a hand-drawn detail
- [ ] Individual pages for longer project write-ups
- [ ] A custom domain

<br>

## Adding a new month

Open `monthly-data.js`, copy the top `{ ... }` entry, paste it above itself, and change the text and the accent color. The homepage shows the newest month and the archive picks up all of them automatically.

## License

Code is MIT, writing is CC BY 4.0, and artwork is all rights reserved. Details in [LICENSE.md](LICENSE.md).

## Editing

Open `index.html` in a browser to preview it. Save and refresh to see changes. Anything in `[brackets]` is still a placeholder.
