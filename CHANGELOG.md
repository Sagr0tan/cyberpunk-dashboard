# Changelog

All notable changes to CyberDash are documented here.

## [1.1.0] — 2026-06-18

### Layout
- New 2-row CSS Grid: `"projects todo news" / "notes video video"`
- Columns: `0.7fr 0.45fr 1fr` — Projects wide, Todo narrow, News widest
- Rows: `50% / 50%` equal split

### Video Feed
- Carousel mode as default — fullscreen single video with prev/next arrow buttons and dot indicator row
- Grid mode toggle — 2-column card grid (same as v1.0)
- Cyberpunk-themed video titles: NEURAL LINK PROTOCOL, DARK WEB ARCHITECTURE, QUANTUM BREACH, SYNTHETIC VISION, SHADOWGRID, CIPHER MATRIX
- Sources renamed to cyberpunk handles: NETCORE.TV, CIPHER.NET, BLACKHAT.IO, AUGMENT.FX, GHOST.SIGNAL, CRYPTEX.LAB

### Sidebar
- MODULES section: OVERVIEW · ANALYTICS · TERMINAL (with live badges)
- FEEDS section: NEWS (10) · SOCIAL (8) · MARKETS (2)

### Topbar
- Date format updated to include weekday abbreviation: `THU, JUN 18`

### Content
- Default projects updated: NEXUS UPLINK (100%) · GHOST PROTOCOL (67%) · CIPHER MATRIX (34%) · SHADOW NODE (20%)
- Default todos: CALIBRATE NEURAL INTERFACE · UPDATE FIREWALL PROTOCOLS · SYNC BACKUP TO OFFSITE NODE · REVIEW SECTOR 7 ACCESS LOGS · OPTIMIZE MEMORY ALLOCATION
- Default note renamed to MISSION BRIEFING with cyberpunk content
- News headlines replaced with cyberpunk-themed stories (sources: WIRED.NET, TECHCORE, UX WORLD, NET PULSE, BIOTECH.IO, etc.)

---

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
