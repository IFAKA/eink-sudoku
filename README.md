# eink-sudoku

```
    ┌───┬───┬───┐┌───┬───┬───┐┌───┬───┬───┐
    │ 5 │   │ 4 ││ 6 │   │   ││   │   │ 9 │
    ├───┼───┼───┤├───┼───┼───┤├───┼───┼───┤
    │   │   │   ││   │ 9 │ 1 ││   │ 6 │   │
    ├───┼───┼───┤├───┼───┼───┤├───┼───┼───┤
    │ 2 │   │   ││   │   │   ││ 1 │   │   │
    └───┴───┴───┘└───┴───┴───┘└───┴───┴───┘
    ┌───┬───┬───┐┌───┬───┬───┐┌───┬───┬───┐
    │   │ 7 │   ││   │   │   ││   │ 8 │   │
    ├───┼───┼───┤├───┼───┼───┤├───┼───┼───┤
    │   │   │ 6 ││ 8 │   │ 3 ││ 7 │   │   │
    ├───┼───┼───┤├───┼───┼───┤├───┼───┼───┤
    │   │ 4 │   ││   │   │   ││   │ 5 │   │
    └───┴───┴───┘└───┴───┴───┘└───┴───┴───┘
    ┌───┬───┬───┐┌───┬───┬───┐┌───┬───┬───┐
    │   │   │ 7 ││   │   │   ││   │   │ 8 │
    ├───┼───┼───┤├───┼───┼───┤├───┼───┼───┤
    │   │ 2 │   ││ 9 │ 4 │   ││   │   │   │
    ├───┼───┼───┤├───┼───┼───┤├───┼───┼───┤
    │ 6 │   │   ││   │   │ 8 ││ 9 │   │ 3 │
    └───┴───┴───┘└───┴───┴───┘└───┴───┴───┘

         Sudoku, but make it e-ink.
```

A Sudoku game built specifically for **e-ink displays** like Kindle. No colors, no animations, no frameworks, no dependencies—just a single HTML file optimized for that crispy monochrome screen.

---

## Why This Exists

Ever tried playing games on your Kindle? Most web games are a nightmare—flashy animations cause ghosting, colors render as muddy grays, and nothing fits the screen right.

**eink-sudoku** fixes all that:

```
┌─────────────────────────────────────────────────────┐
│                                                     │
│   Regular Web Games          eink-sudoku            │
│   on E-ink                   on E-ink               │
│                                                     │
│   ░░▓▓░░▓▓░░                 ┌───┬───┬───┐          │
│   ▓▓░░▓▓░░▓▓    ──────►      │ 5 │ 3 │ 4 │          │
│   ░░▓▓????░░                 ├───┼───┼───┤          │
│   (ghosting mess)            │ 6 │ 7 │ 2 │          │
│                              └───┴───┴───┘          │
│                              (crystal clear)        │
│                                                     │
└─────────────────────────────────────────────────────┘
```

---

## Features

- **Single HTML file** — no build step, no dependencies, no node_modules
- **~6KB total** — instant loading even on slow Kindle browsers
- **Pure black & white** — designed for e-ink from the ground up
- **Zero animations** — no ghosting, no flickering, no waiting
- **600×800 viewport** — pixel-perfect for Kindle screens
- **Auto-scaling** — fits any screen size while maintaining aspect ratio
- **Three difficulty levels** — Easy (40 clues), Medium (32), Hard (25)
- **Auto-save** — close your browser, your game is still there
- **Infinite puzzles** — algorithmic generation, never the same puzzle twice
- **Offline-ready** — works without internet once loaded
- **Touch-optimized** — big buttons, easy taps
- **Visual distinction** — pre-filled numbers have a subtle gray background

---

## Quick Start

No build. No install. Just open it.

```bash
# Option 1: Clone and open
git clone https://github.com/yourusername/eink-sudoku.git
open eink-sudoku/index.html

# Option 2: Just download index.html and double-click it
```

That's it. No `npm install`, no `node_modules`, no waiting.

---

## Deploy Anywhere

Since it's just one HTML file, deployment is trivial:

```bash
# GitHub Pages
git push origin main
# Enable Pages in repo settings, done.

# Vercel/Netlify
# Just drag and drop the file

# Any web server
cp index.html /var/www/html/sudoku.html

# Local file
# Double-click index.html in any browser
```

---

## How It Works

```
┌──────────────────────────────────────────────────────────────┐
│                                                              │
│   User taps cell          Game validates          Victory!  │
│        │                       │                      │      │
│        ▼                       ▼                      ▼      │
│   ┌─────────┐            ┌──────────┐           ┌────────┐   │
│   │  Board  │ ────────►  │  submit()│ ────────► │ Modal  │   │
│   │  Render │            │ function │           │ Popup  │   │
│   └─────────┘            └──────────┘           └────────┘   │
│        │                       │                             │
│        │                       ▼                             │
│        │               ┌──────────────┐                      │
│        │               │ localStorage │                      │
│        │               │  (auto-save) │                      │
│        │               └──────────────┘                      │
│        │                                                     │
│        ▼                                                     │
│   ┌──────────┐                                               │
│   │ NumberPad │  ◄──── User enters numbers                   │
│   └──────────┘                                               │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

---

## Project Structure

```
eink-sudoku/
└── index.html     # That's it. Everything in one file.
```

**Inside index.html:**
- Inline CSS (~40 lines) — e-ink optimized styles
- Inline JS (~270 lines) — puzzle generation, validation, UI
- Zero external dependencies

---

## Architecture

| Component | Description |
|-----------|-------------|
| `generate()` | Creates valid Sudoku puzzles using backtracking |
| `solve()` | Recursive solver with randomized number order |
| `valid()` | Checks row, column, and 3×3 box constraints |
| `submit()` | Full board validation with error highlighting |
| `render()` | Efficient DOM updates via innerHTML |
| `scale()` | Responsive viewport scaling for any screen |
| `save()/load()` | localStorage persistence |

---

## Difficulty Levels

```
┌─────────────────────────────────────────────────┐
│                                                 │
│   EASY          MEDIUM          HARD            │
│   40 clues      32 clues        25 clues        │
│                                                 │
│   ████████      ██████░░        ████░░░░        │
│   ████████      ██████░░        ████░░░░        │
│                                                 │
│   Relaxed       Balanced        Challenging     │
│                                                 │
└─────────────────────────────────────────────────┘
```

---

## Browser Compatibility

Works on:
- Kindle Experimental Browser
- All modern browsers (Chrome, Firefox, Safari, Edge)
- Legacy browsers (IE9+ with graceful degradation)

---

## Why Single-File?

1. **E-ink browsers are slow** — fewer requests = faster load
2. **Kindle browser is limited** — simpler code = fewer bugs
3. **Offline works better** — one file to cache
4. **Easy to modify** — no build step, just edit and refresh
5. **Easy to deploy** — copy one file anywhere

---

## License

MIT — do whatever you want with it.

---

<p align="center">
  <code>
  Made with ◼ for e-ink lovers
  </code>
</p>
