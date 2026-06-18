# Changelog

All notable changes to CyberDash are documented here.

## [1.0.0] — 2026-06-18

### Initial Release

#### Features
- **Notes widget** — multi-note system with localStorage persistence, new/delete/save, char counter
- **Todo widget** — task list with priority levels (high/med/low), add/complete/delete, localStorage
- **News Feed widget** — 12 mock articles, category filter (ALL/TECH/SCI/DESIGN), thumbnail images, refresh
- **Video Feed widget** — 6 mock video cards, 2-column grid, play overlay on hover, refresh
- **Projects widget** — 3 default projects, animated progress bars, add-project modal, delete, localStorage

#### UI / Design
- Cyberpunk dark theme with `#00D9FF` cyan neon accent
- HUD corner brackets (pure CSS, 8 `background-image` gradients) on every widget
- Orbitron + Share Tech Mono typography pairing
- CSS Grid widget layout with named template areas
- Collapsible sidebar with live clock and CPU/MEM system stats
- Nav accordion with module badges and feed filter sync
- Widget collapse (minus/plus toggle per widget)
- Entry animations with stagger delays

#### Architecture
- Vanilla HTML + CSS + JavaScript — no build step, no dependencies
- IIFE modules per widget (isolated scope)
- `textContent` / `document.createElement` for all user content (XSS-safe)
- `transform: scaleX()` for all progress bars (no layout thrash)
- Python 3 `http.server` dev server with auto browser open
