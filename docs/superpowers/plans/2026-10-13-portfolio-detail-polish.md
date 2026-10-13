# Portfolio Detail Polish Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Align portfolio arrows and labels, add a restrained animated navigation underline and case-study section icons, and correct the repository identity in the brain record.

**Architecture:** Keep the work in the existing Next.js Pages Router portfolio. Reuse installed Material icons and CSS for inline link alignment and nav motion; keep content, destinations, and analytics behavior unchanged. Do not modify the separately hosted Markdown Previewer app.

**Tech Stack:** Next.js 15 Pages Router, React 19, TypeScript, Tailwind CSS 3, existing `react-icons/md`, Node built-in tests, Chrome DevTools.

**Spec:** `docs/superpowers/specs/2026-10-13-portfolio-detail-polish-design.md`

## Global Constraints

- Preserve the portfolio’s editorial style and current page content.
- Keep inline text links naturally wrappable while rendering their Material SVG arrows inline with the text. Scope the rule to the active portfolio link treatment; do not globally override SVG display.
- Replace Unicode arrow glyphs used inside active-site CTA buttons—including the home CTAs and source/demo buttons on project details—with the already-installed Material `MdArrowOutward` icon. Align the icon and text as button contents, keep the visible label and destination unchanged, and mark decorative icons `aria-hidden`.
- Use the existing forward/back Material icons for directional text links and detail back-links. Keep work/project list-row arrows in their dedicated grid cell; they are not button icons.
- Do not apply `white-space: nowrap` globally. Labels may wrap naturally when space is genuinely constrained, without separating the icon from the button’s alignment.
- The active route remains underlined at rest; hover and `:focus-visible` reveal the same treatment for other links. Keep `aria-current="page"` as the route indicator, preserve a visible keyboard focus state, and disable underline movement under `prefers-reduced-motion`.
- Add small Material icons beside existing section headings; keep heading text and document structure unchanged. Treat icons as decorative (`aria-hidden="true"`), style them consistently with the current section typography, and avoid emoji, new packages, or content changes.
- Update the existing repo-specific record `brain/repo/editorial-workshop/README.md` to identify repository `portfolio`, worktree `feat-ui-revamp`, and branch `feat/ui-revamp` as distinct values. Preserve its existing artifact links and no-deploy boundary; do not add secrets.
- This change is portfolio-only. Do not modify the separately hosted Markdown Previewer repository.
- Do not change analytics behavior, introduce placeholder IDs, add dependencies, rewrite page content, or deploy.

## Review Focus

- **Narrow inline links:** an icon must remain with its label, while long link text can still wrap naturally. Test the work/project back-links and About/404 links at 320px and 390px (Task 1).
- **Button content:** decorative arrows must align vertically with text and must not force label wrapping or horizontal overflow. Test home and dual-action project CTAs at 320px and 390px (Task 1).
- **Navigation states:** active, hover, keyboard focus, and reduced-motion states must remain distinguishable on desktop and mobile navigation (Task 2).
- **Accessible case-study sections:** adding icons must not change heading names or expose decorative icons to assistive technology (Task 3).
- **Existing behavior:** CTA targets, project tracking callbacks, route state, and list-row arrow layout must remain unchanged (Tasks 1 and 4).

---

### Task 1: Keep directional icons with their labels

**Files:**

- Modify: `styles/globals.css`
- Modify: `pages/index.tsx`
- Modify: `pages/projects/[slug].tsx`
- Browser acceptance: home, project details, work/project back-links, About, and 404

**Interfaces:**

- Consumes: existing `.button`, `.text-link`, and `.row-arrow` styles; installed `MdArrowForward`, `MdArrowBack`, and `MdArrowOutward` icons.
- Produces: CTA buttons with a separate decorative outward icon; text links whose Material SVGs remain inline with naturally wrappable text; unchanged grid-row arrows and link behavior.

- [ ] **Step 1: Record the browser RED checks before editing.** At 320px and 390px, inspect `/projects/markdown-previewer/`, `/work/nykaa-cart-reliability/`, `/about/`, and a 404 route. Use a DOM Range over each `.text-link` and compare the SVG and text rectangles; confirm the current icon/label line split. On `/`, inspect CTA text and arrow rectangles; confirm the arrow span is a separate flex item and vertically offset. Also inspect one project with both source and demo links.
- [ ] **Step 2: Fix the shared text-link SVG layout.** Add a narrowly scoped `.text-link` SVG rule that keeps the SVG inline and vertically aligned without overriding SVGs globally or making the whole link non-wrapping. Preserve existing icon dimensions and let long labels wrap.
- [ ] **Step 3: Replace CTA arrow glyphs with Material icons.** In `pages/index.tsx`, use `MdArrowOutward` in the button CTAs and `MdArrowForward` on forward text links. In `pages/projects/[slug].tsx`, replace the source/demo CTA glyphs with `MdArrowOutward`. Mark decorative icons `aria-hidden="true"`; preserve each link’s text, `href`, `target`, `rel`, and existing `trackEvent` callback.
- [ ] **Step 4: Repeat the browser checks.** At 320px and 390px, assert the inline-link icon shares the line with its label, CTA icon/text centers differ by no more than 2px, labels wrap only when genuinely constrained, no page has horizontal overflow, and list rows still use their separate arrow column. Confirm URLs and tracking handlers are unchanged.
- [ ] **Step 5: Run checks and commit.** Run `yarn test`, `yarn type-check`, and `git diff --check`; format the touched files with Prettier. Commit as `fix: align portfolio arrow icons`.

### Task 2: Animate the navigation underline

**Files:**

- Modify: `styles/globals.css`
- Browser acceptance: desktop and mobile header navigation

**Interfaces:**

- Consumes: current `.desktop-nav`, `.mobile-nav`, `aria-current="page"`, existing palette, and reduced-motion media query.
- Produces: a CSS-only underline reveal shared by navigation links; the active route remains underlined at rest, and hover/focus reveal the same underline for other links.

- [ ] **Step 1: Record the browser RED check before editing.** On desktop, verify the active link has only the existing static text underline and inactive links have no underline on hover/focus. On mobile, inspect the open navigation and keyboard focus state.
- [ ] **Step 2: Implement the underline with CSS.** Replace the static active-link text decoration with a 1px pseudo-element underline using the existing ochre palette. Keep the active line fully visible at rest; reveal it from the center on `:hover` and `:focus-visible` using a 180ms transform transition, without changing link layout or hit targets. Use the existing reduced-motion media query to disable the transition while retaining the final active/focus indicator.
- [ ] **Step 3: Repeat the browser check.** Verify active, hover, and keyboard focus at 1440px and 390px; confirm `aria-current="page"` remains correct and there is no layout shift or loss of focus visibility. Emulate reduced motion if the DevTools interface exposes it; otherwise verify the media-rule result in computed styles and record that visual emulation was unavailable.
- [ ] **Step 4: Run checks and commit.** Run `yarn test`, `yarn type-check`, and `git diff --check`; format `styles/globals.css`. Commit as `feat: animate navigation underline`.

### Task 3: Add subtle icons to detail sections

**Files:**

- Modify: `pages/work/[slug].tsx`
- Modify: `pages/projects/[slug].tsx`
- Modify: `styles/globals.css`
- Browser acceptance: work and project detail pages

**Interfaces:**

- Consumes: existing section headings and installed `react-icons/md` exports.
- Produces: small decorative icons beside existing headings: work Context `MdInfoOutline`, Contribution `MdBuild`, Decisions `MdTune`, Outcome `MdTrendingUp`; project What it does `MdLightbulbOutline`, Technologies `MdCode`.

- [ ] **Step 1: Record the browser RED check before editing.** Inspect a work detail route and a project detail route. Record current heading text/accessibility names and confirm no section icons are present.
- [ ] **Step 2: Add the specified icons without changing heading copy.** Place each icon inside its existing heading, set `aria-hidden="true"`, and make `.case-detail section h2` a small gap-aligned flex row so Tailwind Preflight cannot put the icon on a separate line. Add only the minimal CSS needed for consistent size and theme-aware color.
- [ ] **Step 3: Repeat the browser check.** Verify all six icon mappings across detail templates, confirm each accessible heading name is unchanged and icons are decorative, and check that the typography and section separators remain intact at 320px, 390px, and desktop.
- [ ] **Step 4: Run checks and commit.** Run `yarn test`, `yarn type-check`, and `git diff --check`; format the touched files. Commit as `feat: add case study section icons`.

### Task 4: Record repository identity and final verification

**Files:**

- Modify: `brain/repo/editorial-workshop/README.md`
- No other files unless a verification-discovered defect needs a separately justified fix

**Interfaces:**

- Consumes: completed Tasks 1–3 and the existing repo-specific brain record.
- Produces: explicit repository/worktree/branch identity and a locally verified handoff; no deployment.

- [ ] **Step 1: Update the brain record.** State repository `portfolio`, worktree `feat-ui-revamp`, and branch `feat/ui-revamp` separately. Preserve existing artifact links, no-deploy boundary, and zero-secrets policy. Commit as `docs: identify portfolio brain context`.
- [ ] **Step 2: Run final cross-route acceptance.** At 320px, 390px, 760px, and 1440px, verify home CTAs and row links, work/project lists, work/project details (including source/demo actions), About, Contact fallback markup, and 404. Check text/icon geometry, natural wrapping, active/hover/focus underline, reduced motion, one main landmark, no horizontal overflow, and no console errors. Do not submit data to external services or use analytics IDs.
- [ ] **Step 3: Run final repository checks.** Run `yarn prettier --check` on all changed source/docs files, `yarn test`, `yarn type-check`, `yarn lint`, `yarn build`, and `git diff --check`. Confirm the changed-file list contains no hosted-app, dependency, analytics, content, or deployment changes. If a local server owns `.next`, stop only the process confirmed to belong to this worktree before building, then restart the local preview on port 3000; do not deploy.
- [ ] **Step 4: Leave the review handoff.** Report the commits and verification results, preserve the local preview for review, and wait for the user’s UI/code review. Do not merge or deploy.
