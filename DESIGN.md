# CyberDash — Design System

## Design Brief

**Aesthetic:** Cyberpunk / dark retrofuturistic  
**Intensity:** Subtil — clean dark UI with neon accents (not full-neon overload)  
**Design dials:** VARIANCE 7 · MOTION 5 · DENSITY 7  
**Signature element:** HUD corner brackets on every widget

---

## Color Tokens

| Token | Value | Usage |
|-------|-------|-------|
| `--bg-deep` | `#05080F` | Page background |
| `--bg-panel` | `#0C1520` | Widget / panel background |
| `--bg-header` | `#111D2E` | Widget headers, cards |
| `--bg-hover` | `#162030` | Hover states |
| `--neon` | `#00D9FF` | Primary accent (cyan) |
| `--neon-a50` | `rgba(0,217,255,0.50)` | Borders on hover |
| `--neon-a30` | `rgba(0,217,255,0.30)` | Glow effects |
| `--neon-a04` | `rgba(0,217,255,0.04)` | Subtle hover fill |
| `--c-green` | `#00FF9D` | Success, active status |
| `--c-yellow` | `#FFD600` | Warning, medium priority |
| `--c-red` | `#FF3B5C` | Error, high priority |
| `--tx-1` | `#E0EEFF` | Primary text |
| `--tx-2` | `#6A90B0` | Secondary text |
| `--tx-3` | `#3A5068` | Muted / disabled text |
| `--bd` | `rgba(0,217,255,0.18)` | Default border |
| `--bd-lo` | `rgba(0,217,255,0.08)` | Subtle dividers |

---

## Typography

| Role | Font | Size | Usage |
|------|------|------|-------|
| Display | Orbitron | 12–14px | Widget headers, labels, nav |
| Mono body | Share Tech Mono | 11–13px | Content, data, notes |
| Display (lg) | Orbitron | 32–40px | Sidebar clock |

Letter-spacing on display: `0.06–0.14em`  
All text: `textContent` only for user data (XSS safety)

---

## HUD Corner Brackets

The signature design element — angular sci-fi corner marks on every widget.

```css
.hud-box { position: relative; }

.hud-box::before {
  content: '';
  position: absolute;
  inset: -1px;
  pointer-events: none;
  z-index: 2;

  /* 8 gradients = 4 corners × 2 lines each */
  background:
    /* top-left horizontal */
    linear-gradient(var(--neon),var(--neon)) no-repeat 0 0 / 18px 2px,
    /* top-left vertical */
    linear-gradient(var(--neon),var(--neon)) no-repeat 0 0 / 2px 18px,
    /* top-right horizontal */
    linear-gradient(var(--neon),var(--neon)) no-repeat 100% 0 / 18px 2px,
    /* top-right vertical */
    linear-gradient(var(--neon),var(--neon)) no-repeat 100% 0 / 2px 18px,
    /* bottom-left horizontal */
    linear-gradient(var(--neon),var(--neon)) no-repeat 0 100% / 18px 2px,
    /* bottom-left vertical */
    linear-gradient(var(--neon),var(--neon)) no-repeat 0 100% / 2px 18px,
    /* bottom-right horizontal */
    linear-gradient(var(--neon),var(--neon)) no-repeat 100% 100% / 18px 2px,
    /* bottom-right vertical */
    linear-gradient(var(--neon),var(--neon)) no-repeat 100% 100% / 2px 18px;
}
```

No extra DOM elements required.

---

## Layout

### Widget Grid

```css
.widget-grid {
  display: grid;
  grid-template-areas:
    "projects  todo   news"
    "notes     video  video";
  grid-template-columns: 0.7fr 0.45fr 1fr;
  grid-template-rows: 50% 50%;
  gap: var(--gap);
  padding: var(--gap);
}
```

| Area | Widget | Column | Row |
|------|--------|--------|-----|
| `projects` | Projects | 0.7fr | 1 |
| `todo` | Todo | 0.45fr | 1 |
| `news` | News Feed | 1fr | 1 |
| `notes` | Notes | 0.7fr | 2 |
| `video` | Video Feed | 0.45fr + 1fr (spans 2 cols) | 2 |

Column rationale: Projects and Notes are the primary workspace columns (wider), Todo stays narrow, News Feed gets the most space to show content density.

### Sidebar

- Width: `260px` expanded · `56px` collapsed
- Transition: `width 300ms cubic-bezier(0.4,0,0.2,1)`
- Collapse triggered by `#sbToggle` → `sidebar.classList.toggle('collapsed')`

---

## Performance Patterns

### Progress Bars

All progress fills use `transform: scaleX()` instead of `width` transitions — avoids layout recalculations:

```css
.proj-bar-fill {
  transform-origin: left;
  transform: scaleX(0);
  transition: transform 800ms cubic-bezier(0.16, 1, 0.3, 1);
}
```

JS sets: `element.style.transform = 'scaleX(' + value / 100 + ')'`

Initial animation: double `requestAnimationFrame` to force browser to register the `scaleX(0)` before transitioning to target value.

### System Stats

Same `transform: scaleX()` pattern on `.sys-fill` elements, updated every 3200ms with simulated random walk.

---

## Animation System

| Name | Usage |
|------|-------|
| `widget-in` | Widget entry (opacity + translateY) |
| `slide-in` | List item entry (opacity + translateX) |
| `led-pulse` | Status indicator blinking |
| `badge-pulse` | Nav badge glow pulse |
| `spin` | Refresh button icon (600ms, ease) |

Stagger delays via `nth-child` selectors (0ms → 40ms → 80ms → 120ms → 160ms cap).

`.spinning` utility class triggers the spin animation once via `animationend` listener.

---

## Z-Index Scale

| Layer | Value | Usage |
|-------|-------|-------|
| Base | 0 | Normal content |
| Overlay | 100 | Sidebar, topbar |
| Modal backdrop | 200 | `.modal-overlay` |

---

## Accessibility

- `prefers-reduced-motion` media query disables all animations
- Checkboxes have `aria-label="Toggle complete"`
- `img` elements use `alt=""` (decorative) or descriptive alt text
- All interactive elements are native `<button>` / `<input>` / `<select>` — keyboard navigable by default
- User content: `textContent` only — no `innerHTML` for user-controlled data
