# Persistent Navigation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the navigation persistent across routes, animate a desktop active indicator between links, and present the mobile menu as an accessible overlay.

**Architecture:** Move the shared navigation and skip link into the persistent Pages Router app shell while retaining page metadata, one main landmark, route focus, and footer in `SiteLayout`. Use Motion’s shared `layoutId` for the desktop indicator and a native modal dialog for mobile navigation, with a restrained translucent surface that reuses the current palette.

**Tech Stack:** Next.js 15 Pages Router, React 19, TypeScript, existing `framer-motion`, CSS, Chrome DevTools.

**Spec:** `docs/superpowers/specs/2026-10-14-navigation-overlay-design.md`

## Global Constraints

- Portfolio repository only; do not edit the separately hosted Markdown Previewer repository.
- No analytics changes, placeholder IDs, new packages, copy/content changes, deployment, merge, or push.
- Render one persistent `Navigation` from `pages/_app.tsx`; keep one skip link before it, one main landmark per route, existing metadata, footer, and route-focus behavior.
- On desktop, do not reveal an underline on hover. Keep the active route indicated at rest. On client-side route changes, animate one 1px ochre indicator from the previous item’s bounds to the new item’s bounds.
- On mobile, use a 40×40px menu toggle and a native modal `<dialog>` overlay below the sticky header. Preserve accessible control state, close-on-route-change, Escape close, focus restoration, and reduced-motion behavior.
- Use restrained current-palette translucency only on the header/menu overlay; maintain contrast in light and dark themes.

## Review Focus

- Full document loads must show the active desktop route without a travel animation; client-side navigation and Back/Forward must move the indicator and focus main correctly (Task 1).
- Desktop hover must not reveal an underline, while keyboard focus remains visible independently of the active indicator (Task 1).
- Opening the mobile dialog must make background content inert and prevent background interaction/scroll; Escape, close, and route navigation must close it and restore focus (Task 2).
- Resizing from mobile to desktop while the dialog is open must not leave an invisible modal or inert page (Task 2).
- The overlay must remain legible in light/dark themes and at 320px without horizontal overflow or duplicate main/header landmarks (Task 2).

---

### Task 1: Persistent shell and traveling desktop indicator

**Files:**

- Modify: `pages/_app.tsx`
- Modify: `components/SiteLayout.tsx`
- Modify: `components/Navigation.tsx`
- Modify: `styles/globals.css`

**Interfaces:**

- Consumes: existing route-level `SiteLayout` metadata/main/footer, `Navigation` links and `aria-current`, and the app-level route focus effect.
- Produces: one persistent navigation instance with a single desktop active-indicator element shared between links using Motion `layoutId`; the navigation receives the current route from `useRouter` and leaves route focus on `#main-content`.

- [ ] **Step 1: Capture the failing route behavior in Chrome.** At desktop width, record active indicator geometry on Home, then click Work and use Back/Forward. Confirm the current indicator is recreated rather than visibly traveling because `Navigation` remounts. Record that hover currently reveals a line. Keep a separate focus-visible check.
- [ ] **Step 2: Move shared shell elements.** Render one skip link followed by `Navigation` before the page component in `pages/_app.tsx`; remove the duplicate skip link and `Navigation` from `SiteLayout`. Preserve its page-specific `Head`, `.site-page` layout, one `<main id="main-content">`, route content animation, and footer. Preserve the existing `_app.tsx` focus-on-route-change effect.
- [ ] **Step 3: Add the shared indicator.** In `components/Navigation.tsx`, render a single `motion.span` with stable `layoutId` inside only the current desktop link. Remove hover-triggered underline behavior; retain `aria-current="page"` and the existing visible `:focus-visible` outline. In CSS, style the indicator as a 1px ochre line and keep it out of document flow. Respect reduced motion by making layout changes immediate.
- [ ] **Step 4: Verify route and keyboard behavior in Chrome.** At desktop width, verify direct load shows active indicator without travel, click between routes and Back/Forward animate the indicator, hover never adds an underline, focus-visible remains visible, nav position/height does not shift, focus lands on main after route changes, and exactly one header/nav landmark is present.
- [ ] **Step 5: Run checks and commit.** Run `yarn test`, `yarn type-check`, Prettier check on touched files, and `git diff --check`. Commit `feat: animate persistent navigation indicator`.

### Task 2: Circular control and modal mobile navigation overlay

**Files:**

- Modify: `components/Navigation.tsx`
- Modify: `styles/globals.css`

**Interfaces:**

- Consumes: Task 1’s persistent `Navigation` and active route state.
- Produces: a 40×40px circular mobile menu control and a native modal dialog containing the existing six navigation links, with active marker beneath the label.

- [ ] **Step 1: Capture the failing mobile behavior.** At 390px, verify current menu button is not circular and the open navigation expands document flow, with the active marker spanning the full row and duplicated bottom separators. Record background scroll/interactivity baseline.
- [ ] **Step 2: Implement native dialog behavior.** Replace the expanding `<motion.nav>` with a controlled native `<dialog>` containing the mobile `<nav>`. Open with `showModal()` and close on native Escape, close control, backdrop click, or route change; synchronize `aria-expanded`, preserve `aria-controls`, and restore focus to the menu button on close. Ensure resizing to desktop closes the dialog and clears modal state.
- [ ] **Step 3: Style the overlay and control.** Make the menu button 40×40px with a centered 20px icon. Position the dialog below the sticky header over the viewport, use current paper/ink palette with restrained translucency and backdrop, and keep active marker beneath the label. Preserve row separators without an extra bottom rule. Disable overlay/indicator movement under reduced motion; retain contrast, focus ring, and visible labels.
- [ ] **Step 4: Verify mobile interaction in Chrome.** At 320px and 390px in light and dark themes, test open/close, Escape, focus restoration, background inertness/scroll, route-change close, Back/Forward, active marker, resize-to-desktop while open, one header/nav/main landmark, no horizontal overflow, and no console errors.
- [ ] **Step 5: Run checks and commit.** Run `yarn test`, `yarn type-check`, Prettier check on touched files, and `git diff --check`. Commit `feat: add mobile navigation overlay`.

### Task 3: Full verification and local handoff

**Files:**

- No new files unless a verification-discovered defect needs a focused fix.

**Interfaces:**

- Consumes: Tasks 1–2.
- Produces: verified local build and preview on port 3000; no deployment.

- [ ] **Step 1: Review all changes.** Inspect the complete diff, confirm existing uncommitted `components/Navigation.tsx` and `styles/globals.css` edits are either incorporated or deliberately replaced, and confirm no analytics, content, dependencies, external repo, or deployment changes.
- [ ] **Step 2: Run final checks.** Run Prettier check, `yarn test`, `yarn type-check`, `yarn lint`, `yarn build`, and `git diff --check`. If building, stop only a Next process verified to belong to this worktree; afterward restore the local production preview on port 3000.
- [ ] **Step 3: Verify the production preview.** At desktop and mobile sizes, confirm routes render, persistent indicator behavior works on SPA navigation, mobile modal interactions are correct, and there are no console errors or horizontal overflow. Confirm `/`, `/manifest.json`, and `/favicon.svg` respond locally. Do not send analytics requests or deploy.
- [ ] **Step 4: Commit any approved focused fix, run `yarn test`, and leave the local preview available.**
