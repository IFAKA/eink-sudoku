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

A Sudoku game built specifically for **e-ink displays** like Kindle. No colors, no animations, no nonsense—just pure puzzle goodness optimized for that crispy monochrome screen.

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

- **Pure black & white** — designed for e-ink from the ground up
- **Zero animations** — no ghosting, no flickering, no waiting
- **600×800 viewport** — pixel-perfect for Kindle screens
- **Three difficulty levels** — Easy, Medium, Hard
- **Auto-save** — close your browser, your game is still there
- **Infinite puzzles** — algorithmic generation, never the same puzzle twice
- **Offline-ready** — works without internet once loaded
- **Touch-optimized** — big buttons, easy taps

---

## Quick Start

```bash
# Clone it
git clone https://github.com/yourusername/eink-sudoku.git
cd eink-sudoku

# Install dependencies
npm install

# Run locally
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) and start playing.

---

## Deploy to Your Kindle

The magic of this project is that it exports as **static files**—no server needed.

```bash
# Build for production
npm run build
```

This generates an `out/` folder with everything you need. From here you can:

1. **Host it anywhere** — Vercel, Netlify, GitHub Pages, your own server
2. **Sideload to Kindle** — Use Kindle's experimental browser to access your hosted version

```
  ╔══════════════════════════════════════╗
  ║         YOUR KINDLE                  ║
  ║  ┌────────────────────────────────┐  ║
  ║  │                                │  ║
  ║  │      ┌───┬───┬───┬───┐        │  ║
  ║  │      │ 5 │ 3 │   │   │        │  ║
  ║  │      ├───┼───┼───┼───┤        │  ║
  ║  │      │ 6 │   │   │ 1 │        │  ║
  ║  │      ├───┼───┼───┼───┤        │  ║
  ║  │      │   │ 9 │ 8 │   │        │  ║
  ║  │      ├───┼───┼───┼───┤        │  ║
  ║  │      │ 8 │   │   │   │        │  ║
  ║  │      └───┴───┴───┴───┘        │  ║
  ║  │                                │  ║
  ║  │   [ 1 ] [ 2 ] [ 3 ] [ 4 ]     │  ║
  ║  │   [ 5 ] [ 6 ] [ 7 ] [ 8 ]     │  ║
  ║  │   [ 9 ] [ ⌫ ] [ Check ]       │  ║
  ║  │                                │  ║
  ║  └────────────────────────────────┘  ║
  ║           [  ≡  ]    [  ○  ]         ║
  ╚══════════════════════════════════════╝
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
│   │  Board  │ ────────►  │  useSudoku │ ──────► │ Modal  │   │
│   │Component│            │   Hook    │          │ Popup  │   │
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
├── app/
│   ├── page.tsx          # Main game page
│   ├── layout.tsx        # Kindle-optimized viewport
│   └── globals.css       # E-ink specific styles
├── components/
│   ├── Board.tsx         # 9×9 grid
│   ├── Cell.tsx          # Individual cells
│   ├── Header.tsx        # Title + controls
│   ├── NumberPad.tsx     # Input buttons
│   ├── ErrorDisplay.tsx  # Validation feedback
│   └── SuccessModal.tsx  # Win screen
├── lib/
│   ├── sudoku.ts         # Puzzle generation & validation
│   ├── storage.ts        # Persistence layer
│   └── types.ts          # TypeScript definitions
└── hooks/
    └── useSudoku.ts      # Game state management
```

---

## Tech Stack

| What | Why |
|------|-----|
| **Next.js 16** | Static export, zero config |
| **React 19** | Fast, declarative UI |
| **TypeScript** | Catch bugs before they happen |
| **Tailwind CSS** | Rapid styling, small bundle |

---

## Difficulty Levels

```
┌─────────────────────────────────────────────────┐
│                                                 │
│   EASY        MEDIUM         HARD               │
│   38-45       30-37          22-29              │
│   clues       clues          clues              │
│                                                 │
│   ████████    ██████░░       ████░░░░           │
│   ████████    ██████░░       ████░░░░           │
│   ████████    ██████░░       ████░░░░           │
│                                                 │
│   Perfect     A nice         For the            │
│   for a       challenge      brave              │
│   quick                                         │
│   game                                          │
│                                                 │
└─────────────────────────────────────────────────┘
```

---

## Scripts

```bash
npm run dev      # Start development server
npm run build    # Production build + static export
npm run start    # Serve production build
npm run lint     # Check code quality
```

---

## License

MIT — do whatever you want with it.

---

<p align="center">
  <code>
  Made with ◼ for e-ink lovers
  </code>
</p>
