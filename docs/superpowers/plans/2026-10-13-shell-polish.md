# Site Shell Polish Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Polish the portfolio’s theme/menu icons, navigation motion, directional indicators, and favicon without changing site content or analytics behavior.

**Architecture:** Reuse installed `react-icons` Material Design icons and `framer-motion`. Keep the existing shared shell and Pages Router; animate only the mobile menu and route content, leaving the header/footer stable. Serve one SVG brand favicon and point both browser metadata and the manifest to it.

**Tech Stack:** Next.js 15 Pages Router, React 19, TypeScript, Tailwind/CSS, `next-themes`, installed `react-icons`, installed `framer-motion`, Node built-in tests, Chrome DevTools.

**Spec:** `docs/superpowers/specs/2026-10-13-shell-polish-design.md`

## Global Constraints

- Preserve the current content, route structure, theme persistence, and analytics consent contract.
- Use existing dependencies only; do not add packages or remotely load an icon font.
- Use Material Design icons for theme/menu controls and active-site directional indicators; retain accessible names and text labels.
- Keep menu disclosure, Escape handling, focus restoration, active route state, and route-change close behavior.
- Keep one main landmark and current route-change focus handling; do not delay navigation or trap focus.
- Respect `prefers-reduced-motion`; motion must not gate content availability.
- Leave analytics IDs absent until supplied; do not use invented or dummy IDs for live Google requests.
- Do not deploy; leave the local UI available for Lalit’s review.

## Review Focus

- Closed menu during its exit animation must immediately be absent from keyboard navigation and the accessibility tree; verify with keyboard and DevTools accessibility inspection (Task 1).
- Theme icon changes must match the offered action and not shift the header on hydration or reload; inspect light/dark and reload states (Task 1).
- Route transitions must keep header/footer stable, preserve main focus behavior, and never create a second main landmark; inspect internal navigation and browser Back/Forward (Task 2).
- Reduced-motion preference must remove movement from both menu and page transitions while leaving controls and content usable; emulate it in DevTools (Tasks 1–2).
- Browser favicon and installed-app manifest must resolve to the same new brand mark, with no stale purple theme colors; inspect network and manifest in DevTools (Task 3).

---

### Task 1: Theme and mobile-menu controls

**Files:**

- Modify: `components/ThemeToggle.tsx`
- Modify: `components/Navigation.tsx`
- Modify: `styles/globals.css`

**Interfaces:**

- Consumes: `next-themes` `useTheme()` and current `Navigation` disclosure state/handlers.
- Produces: an icon-only theme action button with the existing `aria-label`/`aria-pressed` contract; mobile menu button with existing `aria-expanded`/`aria-controls` contract; animated menu that is immediately inert when closed.

- [ ] **Step 1: Replace the theme text with Material icons.** Use `MdDarkMode` and `MdLightMode` from `react-icons/md`. Keep the button’s accessible name and pressed state, reserve its dimensions before hydration instead of returning `null`, and retain the existing persisted theme behavior.
- [ ] **Step 2: Replace the menu text/× glyph with Material icons.** Use `MdMenu` and `MdClose`; preserve the current disclosure, Escape focus restoration, active route state, and route-change close behavior.
- [ ] **Step 3: Animate mobile menu entry/exit.** Use `AnimatePresence`/motion from installed `framer-motion` with a short opacity and small vertical transition, plus a subtle item stagger. Keep the controlled navigation mounted while required for exit; when closed, mark it hidden from assistive technology and remove its links from tab order immediately. Keep `aria-controls` pointing at the navigation element.
- [ ] **Step 4: Add reduced-motion behavior.** Use `useReducedMotion` or an equivalent existing CSS media rule so reduced motion removes translation and stagger; ensure closed-menu semantics do not depend on animation completion.
- [ ] **Step 5: Verify in Chrome DevTools.** At mobile and desktop widths, test light/dark icon state, reload, menu open/close, Escape focus return, route-change close, keyboard tab order during exit, console, and emulated reduced motion. Confirm no layout shift or hydration warning.
- [ ] **Step 6: Format and run checks.** Run Prettier on touched source files, `yarn test`, `yarn type-check`, and `git diff --check`; fix only failures introduced by this task.
- [ ] **Step 7: Commit.** `git add components/ThemeToggle.tsx components/Navigation.tsx styles/globals.css && git commit -m "feat: polish theme and menu controls"`.

### Task 2: Route transitions and directional icons

**Files:**

- Modify: `components/SiteLayout.tsx`
- Modify: `styles/globals.css`
- Modify: `components/Contact.tsx`
- Modify: `pages/about.tsx`
- Modify: `pages/work/[slug].tsx`
- Modify: `pages/projects/[slug].tsx`
- Modify: `pages/404.tsx`

**Interfaces:**

- Consumes: current `SiteLayout` router path, main landmark/ref, focus-on-route-change behavior, and existing `.text-link` styling.
- Produces: an animated inner page-content region keyed to the current pathname, with stable shell landmarks and unchanged route metadata/focus contract.

- [ ] **Step 1: Add a route-content transition.** Wrap only the page children inside the existing `<main>` in a keyed motion element managed by `AnimatePresence`; leave the `<main>`, skip link, navigation, and footer stable. Use a short fade with a small vertical offset and no navigation delay. Preserve the existing main focus behavior and ensure exactly one main landmark.
- [ ] **Step 2: Respect reduced motion for route changes.** Disable the offset and transition under `useReducedMotion`/the reduced-motion media preference; content remains immediately available.
- [ ] **Step 3: Replace active-site directional glyphs.** Replace the arrow glyphs in the email fallback, About contact link, Work/Project detail back-links, and 404 home link with `MdArrowForward` or the corresponding backward Material icon. Mark decorative icons `aria-hidden` and preserve link text and destinations.
- [ ] **Step 4: Verify route interactions in Chrome DevTools.** Test internal links and Back/Forward across home, work, projects, and 404 at desktop/mobile; confirm stable header/footer, one main, focus lands on main, reduced-motion behavior, and no horizontal overflow.
- [ ] **Step 5: Format and run checks.** Run Prettier on touched source files, `yarn test`, `yarn type-check`, and `git diff --check`.
- [ ] **Step 6: Commit.** `git add components/SiteLayout.tsx styles/globals.css components/Contact.tsx pages/about.tsx 'pages/work/[slug].tsx' 'pages/projects/[slug].tsx' pages/404.tsx && git commit -m "feat: add subtle page navigation motion"`.

### Task 3: Brand favicon and manifest

**Files:**

- Modify: `pages/_document.tsx`
- Create: `public/favicon.svg`
- Modify: `public/manifest.json`
- Test: `tests/routes.test.cjs`

**Interfaces:**

- Consumes: header wordmark `LK.` and site palette (`#F7F4EC`, `#17202A`, `#8F5C00`).
- Produces: `/favicon.svg`, explicitly linked by the document and referenced by the manifest; manifest theme/background colors match the site’s light palette.

- [ ] **Step 1: Add a failing favicon/manifest regression test.** In `tests/routes.test.cjs`, assert that the manifest icon uses `src: "/favicon.svg"`, `type: "image/svg+xml"`, and `sizes: "any"`; assert the referenced file exists; pin `theme_color` and `background_color` to `#f7f4ec`; and assert `_document.tsx` explicitly links `/favicon.svg`.
- [ ] **Step 2: Run the focused test and confirm it fails** because the new favicon is not yet referenced.
- [ ] **Step 3: Create the SVG wordmark.** Draw a simple square favicon with legible `LK.` initials at small sizes, using the existing paper/ink/ochre palette; do not reproduce the old purple gradient.
- [ ] **Step 4: Link and configure the icon.** Add `<link rel="icon" type="image/svg+xml" href="/favicon.svg" />` in `_document.tsx`; set the manifest icon path/type/sizes to `/favicon.svg`, `image/svg+xml`, and `any`, and set `theme_color`/`background_color` to `#f7f4ec`.
- [ ] **Step 5: Run the focused test, then `yarn test`, `yarn type-check`, and `git diff --check`.** Confirm the favicon asset is copied into the production output.
- [ ] **Step 6: Verify in Chrome DevTools.** Inspect the favicon and manifest requests for successful local responses and confirm the rendered asset matches the header wordmark. No deployment or cache-busting deployment is performed.
- [ ] **Step 7: Commit.** `git add pages/_document.tsx public/favicon.svg public/manifest.json tests/routes.test.cjs && git commit -m "feat: align favicon with portfolio branding"`.

### Task 4: Full local review handoff

**Files:** no new files unless a verification-discovered defect requires a focused fix.

**Interfaces:**

- Consumes: completed Tasks 1–3.
- Produces: verified local build and a concise handoff; no deployment.

- [ ] **Step 1: Run final formatting and verification.** Run Prettier check on all changed source files, `yarn test`, `yarn type-check`, `yarn lint`, `yarn build`, and `git diff --check`. Report exact outcomes and distinguish known lint/tooling warnings.
- [ ] **Step 2: Review with Chrome DevTools.** Serve the completed production build locally with `yarn start`; check 390px mobile and 1440px desktop, both themes, keyboard operation, menu dismissal/focus, reduced motion, route transitions, favicon/manifest, console/network, and no configured GA4/GTM IDs. Confirm no analytics requests occur with absent IDs.
- [ ] **Step 3: Inspect final changes.** Check `git status`, `git diff` from the task commits, and changed-file list for accidental analytics, content, dependency, or deployment changes. Leave the dev/production-local preview instructions and wait for Lalit’s UI/code review.
- [ ] **Step 4: Do not deploy.** No deployment, merge, or production analytics test is part of this plan.
