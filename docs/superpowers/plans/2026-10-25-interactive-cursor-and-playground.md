# Interactive Cursor Glow, Magnetic Motion, and Physics Playground Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build three coordinated interactive features that encourage playful visitor engagement while preserving performance and readability: an ambient cursor accent glow, magnetic pull reactions on key brand/nav elements, and an interactive physics canvas playground.

**Architecture:**
1. `AmbientGlow`: High-performance RAF pointer tracking passing CSS variables `--cursor-x` and `--cursor-y` to render an ambient radial glow tied to `var(--blue)` without blocking pointer events or dropping frames.
2. `Magnetic`: Framer-motion-powered magnetic attraction wrapper pulling target elements (like `LK.` brand mark and floating triggers) toward nearby cursor coordinates with spring physics.
3. `InteractivePlayground`: An HTML5 canvas interactive node/particle constellation that responds to cursor velocity, hover gravity, and click shockwaves, integrated smoothly into the home page with `IntersectionObserver` frame throttling and reduced-motion safety.

**Tech Stack:** Next.js (React 19), TypeScript, Framer Motion, HTML5 Canvas, Tailwind/Vanilla CSS variables.

## Global Constraints
- Must respect `prefers-reduced-motion: reduce` and disable motion/animations when active.
- Pointer tracking must be inactive on touch-only devices (`(hover: none)` / `(pointer: coarse)`).
- CPU efficiency: Canvas must pause rendering when scrolled out of viewport via `IntersectionObserver`.
- Accent color integration: All glows, particle lines, and reactions must dynamically follow `var(--blue)` across light and dark modes and live theme switches.
- Zero impact on text selection, button clickability, and keyboard accessibility.

---

### Task 1: Ambient Background Accent Glow

**Files:**
- Create: `components/AmbientGlow.tsx`
- Modify: `pages/_app.tsx`
- Modify: `styles/globals.css`
- Test: `tests/ambient-glow.test.cjs`

**Interfaces:**
- Consumes: `var(--blue)` CSS token, PointerEvent coordinates
- Produces: `<AmbientGlow />` component mounted in `_app.tsx` managing CSS variables `--cursor-x` and `--cursor-y` on an overlay element.

- [x] **Step 1: Write the failing test**
  Write `tests/ambient-glow.test.cjs` checking that `AmbientGlow` component renders an aria-hidden container, ignores coarse pointer devices, listens to pointermove, and that `styles/globals.css` defines `.ambient-glow` with pointer-events: none and radial-gradient.

- [x] **Step 2: Run test to confirm failure**
  Run `node --require ./tests/register.cjs --test tests/ambient-glow.test.cjs` and verify failure.

- [x] **Step 3: Implement AmbientGlow component and CSS**
  - Implement `components/AmbientGlow.tsx` with RAF-throttled pointer coordinates and fine-pointer detection (`window.matchMedia('(hover: hover) and (pointer: fine)')`).
  - Add `.ambient-glow` overlay styles in `styles/globals.css` with `pointer-events: none` and radial gradient using `var(--blue)`.
  - Mount `<AmbientGlow />` inside `pages/_app.tsx`.

- [x] **Step 4: Verify test passes**
  Run `node --require ./tests/register.cjs --test tests/ambient-glow.test.cjs`.

---

### Task 2: Magnetic Reaction on Brand and Key Elements

**Files:**
- Create: `components/Magnetic.tsx`
- Modify: `components/Navigation.tsx`
- Test: `tests/magnetic.test.cjs`

**Interfaces:**
- Consumes: `children: ReactNode`, `threshold?: number`, `strength?: number`
- Produces: `<Magnetic />` wrapper applying spring-damped translation to wrapped children when cursor enters proximity.

- [x] **Step 1: Write the failing test**
  Write `tests/magnetic.test.cjs` checking that `Magnetic` wraps children in `motion.div`, respects `useReducedMotion()`, applies spring transition, and that `Navigation.tsx` wraps the site brand `LK.` in `Magnetic`.

- [x] **Step 2: Run test to confirm failure**
  Run `node --require ./tests/register.cjs --test tests/magnetic.test.cjs` and verify failure.

- [x] **Step 3: Implement Magnetic component**
  - Create `components/Magnetic.tsx` using `framer-motion`'s `useMotionValue` and `useSpring`.
  - Calculate distance from element center on pointermove; displace element up to max distance when within threshold.
  - Reset to `(0, 0)` on pointerleave or blur.
  - Wrap the `site-brand` link in `components/Navigation.tsx`.

- [x] **Step 4: Verify test passes**
  Run `node --require ./tests/register.cjs --test tests/magnetic.test.cjs`.

---

### Task 3: Interactive Physics Canvas Playground

**Files:**
- Create: `components/InteractivePlayground.tsx`
- Modify: `pages/index.tsx`
- Modify: `styles/globals.css`
- Test: `tests/interactive-playground.test.cjs`

**Interfaces:**
- Consumes: Canvas rendering context, active accent color from CSS variables, viewport visibility
- Produces: `<InteractivePlayground />` section on the homepage with interactive nodes, connecting spring lines, hover gravity, and click shockwave ripples.

- [x] **Step 1: Write the failing test**
  Write `tests/interactive-playground.test.cjs` validating that `InteractivePlayground` exists, renders a `<canvas>`, uses `IntersectionObserver` to pause when off-screen, handles resize, and is featured in `pages/index.tsx`.

- [x] **Step 2: Run test to confirm failure**
  Run `node --require ./tests/register.cjs --test tests/interactive-playground.test.cjs` and verify failure.

- [x] **Step 3: Implement InteractivePlayground**
  - Create `components/InteractivePlayground.tsx` with a lightweight 2D canvas simulation:
    - 25-35 floating nodes with velocity and boundary bounce.
    - Connect nodes within distance threshold with faint lines.
    - Pointer influence: cursor exerts a gentle attraction/repulsion field within radius.
    - Click/tap creates an expanding ripple that accelerates nearby nodes outward.
    - Reads current accent color from `--blue` computed style.
    - Pauses `requestAnimationFrame` when scrolled out of view.
  - Integrate into `pages/index.tsx` with an editorial section frame ("04 / Playground" or interactive strip).
  - Add responsive styles in `styles/globals.css`.

- [x] **Step 4: Verify test passes**
  Run `node --require ./tests/register.cjs --test tests/interactive-playground.test.cjs`.

---

### Task 4: Full Suite Verification & Build

- [x] **Step 1: Run type checking**
  `npx tsc --noEmit`
- [x] **Step 2: Run all tests**
  `npm test`
- [x] **Step 3: Verify performance and reduced-motion safety**
  Ensure all reduced motion and fine-pointer queries behave as expected.
