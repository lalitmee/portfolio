# Precision Console Identity and Interaction Polish Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add an original LK brand mark and static matching icons, restrained reduced-motion-aware feedback, and a searchable in-page project browser without changing project routes or data.

**Architecture:** Render the LK mark from a small inline SVG component and keep its static favicon/app variants generated from the same geometry. Use CSS for localized interactions. Keep project filtering as a pure helper over existing portfolio records; a small client component owns search and selected-project state while preserving links and analytics events.

**Tech Stack:** Next.js 15 Pages Router, React 19, TypeScript, existing Node test harness, CSS, ImageMagick already available in the workspace for static icon rasterization.

**Spec:** `docs/superpowers/specs/2026-10-14-precision-console-delight-design.md`

## Global Constraints

- Preserve Next.js 15 Pages Router, React, TypeScript, Tailwind, next-themes, current project data, and route slugs.
- Use inline SVG and CSS with existing dependencies; add no package for motion or icons.
- Search is local and makes no network requests; do not fabricate previews, commands, usage counts, status, or project data.
- Preserve every existing project slug and `/projects/[slug]/` detail route; do not change URLs on in-panel selection.
- `prefers-reduced-motion: reduce` removes transforms and animated drawing while preserving content, state, and focus feedback.
- Use the existing Chrome instance only. Any local server must use an available port other than 3000; do not disturb the existing service on 3000.
- Do not copy Josh Comeau artwork/code or change analytics, homepage composition, or unrelated routes.

## Review Focus

- Empty/whitespace query and mixed-case matches across title, description, and technologies return the expected ordered records — Task 3 `filterProjects` tests.
- Filtering away the selected project and clearing search always leaves a valid selection and recoverable detail panel — Task 3 browser check.
- Projects without `github` or `demo` show no dead or fabricated destination — Task 3 fixture/render test.
- Keyboard and assistive-technology users can search/select and hear the result count without relying on hover or color — Task 3 browser check and rendered semantics test.
- Reduced-motion preference suppresses each introduced transform/draw while retaining visible focus — Task 2 CSS test and browser emulation.

---

### Task 1: Brand mark and static icon family

**Files:**

- Create: `components/BrandMark.tsx`
- Create: `public/favicon.svg`
- Modify: `components/Navigation.tsx`, `pages/_document.tsx`, `public/manifest.json`, `public/favicon.ico`, `public/favicon.png`, `public/icon.png`
- Test: `tests/branding.test.cjs`, `tests/shell.test.cjs`

**Interfaces:**

- Produces: default `BrandMark()` React component with decorative inline SVG; navigation supplies the accessible full name “Lalit Kumar”. `public/favicon.svg` is the static vector source for favicon and raster app-icon variants.
- Consumes: current `Navigation` route rail and the existing public icon/manifest paths.

- [ ] **Step 1: Write failing brand/icon tests**

In `tests/branding.test.cjs`, assert that the shared document references `/favicon.svg` and `/manifest.json`, the manifest uses dark theme color `#111820` and points at the generated `/icon.png`, the SVG path geometry matches `BrandMark.tsx`, and `favicon.ico`/PNG files have their proper file signatures. In `tests/shell.test.cjs`, assert the rendered navigation exposes the text “Lalit Kumar” and an SVG brand mark.

- [ ] **Step 2: Run tests and verify the expected RED**

Run: `node --require ./tests/register.cjs --test tests/branding.test.cjs tests/shell.test.cjs`
Expected: FAIL because the new SVG brand, manifest references, and readable wordmark are not implemented (and the existing `.png` assets are JPEG data).

- [ ] **Step 3: Implement `BrandMark()` and update active icon references**

Create a simple original LK ligature in `public/favicon.svg` and matching inline geometry in `BrandMark.tsx`; render it beside “Lalit Kumar” in `Navigation.tsx`. Add shared document links for the SVG favicon and manifest. Generate valid static `favicon.ico`, 1024px `favicon.png`, and 512px `icon.png` from the SVG with the already-installed `convert` command; update manifest icon entries to the SVG and PNG assets and set `theme_color` to `#111820`.

- [ ] **Step 4: Run brand tests and the full suite**

Run: `node --require ./tests/register.cjs --test tests/branding.test.cjs tests/shell.test.cjs && yarn test`
Expected: both targeted tests and the full suite pass; the raster signature assertions report actual PNG/ICO formats.

- [ ] **Step 5: Commit**

```bash
git add components/BrandMark.tsx components/Navigation.tsx pages/_document.tsx public/favicon.svg public/favicon.ico public/favicon.png public/icon.png public/manifest.json tests/branding.test.cjs tests/shell.test.cjs
git commit -m "feat: add original LK brand icons"
```

### Task 2: Restrained interaction feedback

**Files:**

- Create: `components/ArrowIcon.tsx`
- Modify: `components/Navigation.tsx`, `components/HomePage.tsx`, `pages/work/index.tsx`, `pages/work/[slug].tsx`, `pages/projects/[slug].tsx`, `styles/globals.css`
- Test: `tests/interactions.test.cjs`

**Interfaces:**

- Consumes: `BrandMark()` from Task 1 and existing actionable links/cards.
- Produces: decorative `ArrowIcon()` SVG and shared `.brand-link`, `.interaction-arrow`, and `.interactive-card` styles used only on the brand mark, visible arrows, and actionable cards.

- [ ] **Step 1: Write failing reduced-motion and interaction-style assertions**

In `tests/interactions.test.cjs`, assert `ArrowIcon()` renders an `aria-hidden` SVG and the stylesheet contains hover and `:focus-visible` triggers for the brand/arrow, a `:focus-within` card response, and a `prefers-reduced-motion: reduce` override that removes their transforms/draw animation without removing the global focus outline.

- [ ] **Step 2: Run the targeted test and verify the expected RED**

Run: `node --require ./tests/register.cjs --test tests/interactions.test.cjs`
Expected: FAIL because the interaction selectors and scoped reduced-motion overrides do not yet exist.

- [ ] **Step 3: Add one-shot CSS feedback to existing actions**

Add brief, non-looping brand path response; small SVG arrow nudges on hover/focus; and restrained border/lift response on actionable home, work, and project cards. Keep action text visible at rest and retain the existing keyboard focus ring. Under reduced motion, disable the new animation/transform and transition effects.

- [ ] **Step 4: Run interaction tests and full suite**

Run: `node --require ./tests/register.cjs --test tests/interactions.test.cjs && yarn test`
Expected: targeted assertions and all repository tests pass.

- [ ] **Step 5: Commit**

```bash
git add components/ArrowIcon.tsx components/Navigation.tsx components/HomePage.tsx pages/work/index.tsx 'pages/work/[slug].tsx' 'pages/projects/[slug].tsx' styles/globals.css tests/interactions.test.cjs
git commit -m "feat: add restrained portfolio interactions"
```

### Task 3: Searchable project browser

**Files:**

- Create: `components/ProjectsBrowser.tsx`, `utils/projectSearch.ts`, `tests/project-search.test.cjs`, `tests/projects-browser.test.cjs`
- Modify: `pages/projects/index.tsx`, `styles/globals.css`

**Interfaces:**

- Consumes: `portfolio.projects`, existing `generateSlug`, and existing `trackEvent` event payloads.
- Produces: exported `ProjectRecord = (typeof portfolio.projects)[number]`, `filterProjects(projects: ProjectRecord[], query: string): ProjectRecord[]`, and `ProjectsBrowser({projects}: {projects: ProjectRecord[]})` for the searchable list/detail panel.

- [ ] **Step 1: Write failing search and browser-render tests**

In `tests/project-search.test.cjs`, assert that blank/whitespace query returns the original order; trimmed case-insensitive query matches title (`BROWSE.NVIM`), description, or technology (`CODECOMPANION`); and an unmatched query returns an empty list. In `tests/projects-browser.test.cjs`, SSR-render the browser and assert the labeled search field, first curated project selected, detail link, polite result-count region, and no source/demo anchors for a fixture lacking those fields.

- [ ] **Step 2: Run targeted tests and verify the expected RED**

Run: `node --require ./tests/register.cjs --test tests/project-search.test.cjs tests/projects-browser.test.cjs`
Expected: FAIL because the helper and browser component do not yet exist.

- [ ] **Step 3: Implement the pure filter helper and project browser**

Implement `filterProjects` with trimmed lowercase substring matching over title, description, and `technologies`. On `/projects/`, preserve the current curated-first catalog order and pass the full catalog to `ProjectsBrowser`. Initialize selection to the first project; when the selected item is filtered out, use the first match, and clear the detail panel when there are no matches. Use a labeled native search input; render project selection buttons with `aria-pressed` and a polite result-count region; show the selected project’s real description, technologies, existing source/demo links, and ordinary detail-route link. Apply `.interactive-card` and `.interaction-arrow` from Task 2. Keep current `project_open` tracking on detail/source/demo destinations only. Filter out missing links; show a clear-search control for zero results. Stack list before detail on narrow screens.

- [ ] **Step 4: Run targeted tests and full suite**

Run: `node --require ./tests/register.cjs --test tests/project-search.test.cjs tests/projects-browser.test.cjs && yarn test`
Expected: browser/search assertions and all repository tests pass; existing static-route test still covers every project slug.

- [ ] **Step 5: Verify browser behavior and project-wide checks**

Using the existing Chrome instance, check search by title/description/technology, selection, filter-away/clear recovery, absent optional links, keyboard/focus, both themes, 390px layout, 200% zoom, reduced motion, and unchanged project detail URL. Start any local preview only on a newly checked free port other than 3000. Run `yarn type-check`, `yarn lint`, `yarn build`, and `git diff --check`; expected exits are 0, with only already-known lint/build warnings reported.

- [ ] **Step 6: Commit**

```bash
git add components/ProjectsBrowser.tsx utils/projectSearch.ts pages/projects/index.tsx styles/globals.css tests/project-search.test.cjs tests/projects-browser.test.cjs
git commit -m "feat: add searchable project browser"
```
