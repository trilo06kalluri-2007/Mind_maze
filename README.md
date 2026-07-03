# MIND MAZE

A premium, production-quality sliding puzzle game built with Next.js, TypeScript, Tailwind CSS, and Framer Motion.

Slide tiles into the empty space to arrange them in the correct order. Clear your mind and conquer the maze.

## Gameplay

- **Objective**: Arrange numbered tiles in ascending order (1, 2, 3, …) with the empty space at the bottom-right corner.
- **Controls**: Click/tap a tile adjacent to the empty space to slide it. Use **arrow keys** to move tiles. Press **R** to reset.
- **Scoring**: Earn 1–3 stars per level based on how your moves compare to the par target.
- **Levels**: 12 hand-scrambled levels across 3×3, 4×4, and 5×5 grid sizes with increasing difficulty.

## Setup

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

To build for production:

```bash
npm run build
npm start
```

## Architecture

```
src/
├── app/                    # Next.js App Router pages
│   ├── globals.css         # Global styles + Tailwind v4
│   ├── layout.tsx          # Root layout + metadata
│   └── page.tsx            # Screen router (start / game / levelComplete / levelSelect / allComplete)
├── components/
│   ├── game/               # Core game components
│   │   ├── Board.tsx       # Grid container, renders tiles
│   │   ├── HUD.tsx         # Level info, moves, timer, controls
│   │   └── Tile.tsx        # Individual sliding tile with gradient + number
│   ├── screens/            # Full-screen views
│   │   ├── StartScreen.tsx # Landing / hero screen
│   │   ├── GameScreen.tsx  # Main gameplay wrapper
│   │   ├── LevelComplete.tsx # Victory modal with stars + stats
│   │   ├── LevelSelect.tsx # Level picker with progress
│   │   └── AllComplete.tsx # End-of-game celebration
│   └── ui/                 # Reusable UI primitives
│       ├── Button.tsx      # Multi-variant animated button
│       ├── Confetti.tsx    # Particle celebration effect
│       ├── Modal.tsx       # Animated overlay modal
│       └── StarRating.tsx  # Animated star display
├── data/
│   └── levels.ts           # 12 level definitions with shuffle generation
├── hooks/
│   ├── useKeyboard.ts      # Arrow key + R key input handling
│   └── useTimer.ts         # Per-second game timer
├── lib/
│   └── game/
│       └── engine.ts       # Pure game logic: board, moves, solve check, solvability
├── store/
│   └── gameStore.ts        # Zustand state: screen, board, moves, timer, progress
└── types/
    └── index.ts            # Shared TypeScript types
```

## Tech Stack

| Tool             | Purpose                    |
| ---------------- | -------------------------- |
| Next.js 15       | React framework + App Router |
| TypeScript       | Type safety                |
| Tailwind CSS v4  | Utility-first styling      |
| Framer Motion    | Spring animations + layout |
| Zustand          | Lightweight state management |

## Features

- 12 levels of progressive difficulty (3×3 → 4×4 → 5×5)
- Smooth spring-animated tile sliding
- Keyboard support (arrow keys + R)
- Undo last move
- In-game hint panel
- Star rating per level (based on par comparison)
- Persistent progress via localStorage
- Responsive design (mobile + desktop)
- Confetti celebration on level completion
- Cinematic dark theme with glassmorphism aesthetics

## Design

- **Theme**: Dark minimal with subtle glassmorphism elements
- **Palette**: Deep navy background (#0a0a1a) + indigo accent (#6366f1)
- **Typography**: System font stack with tabular numbers for stats
- **Motion**: Spring physics for tile sliding, opacity + scale for transitions
- **Tiles**: Each tile gets a unique gradient + accent color derived from its number

## License

MIT
