# Internal Icon Motion Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans (native) or superpowers:subagent-driven-development to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add finite, hover/focus-triggered internal motion to icons across active portfolio pages, including restrained brand reveals.

**Architecture:** A shared module exports named decorative SVG icons with separate internal animation targets. CSS activates finite keyframes from the nearest heading, action, or static label; existing split-path arrows retain their animation utility without competing CSS motion. No generic animation engine or dependency is added.

**Tech Stack:** Existing Next.js 15, React 19, TypeScript, CSS keyframes, Node test runner, installed React DOM server rendering.

**Spec:** `docs/superpowers/specs/2026-10-25-icon-motion-design.md`

## Global Constraints

- No new dependency or general-purpose animation engine.
- Preserve destinations, analytics, accessible names, focus management, and control state behavior.
- Keep the previously approved app-card button treatments.
- Do not substitute whole-icon bouncing, rotation, or scaling for internal motion.
- No autoplay or infinite animation is added.
- With prefers-reduced-motion enabled, all added icon motion is disabled and icons remain fully visible.
- Decorative SVGs remain aria-hidden and non-focusable.
- Do not modify unused legacy components, photographic/image assets, education institution logo images, favicons, or text-only links to add new icons.
- No commits or pushes without separate explicit approval; preserve unrelated changes.

## Review Focus

1. Duplicate launch icons in iris-fill overlays: both copies animate without duplicate accessible names or SVG ID collisions (Task 1 render check; Task 2 browser check).
2. Pointer traversal between an icon and its label: animation does not restart until actual heading/action re-entry (Task 2 browser check; Task 3 arrow test).
3. Keyboard navigation in appearance radio choices: visible-focus feedback does not dismiss the panel or change selection (Task 3 regression tests and browser check).
4. Touch/hybrid input and reduced-motion changes: no sticky hover motion, autoplay, or hidden logo (Tasks 1 and 3 browser checks).
5. Existing whole-icon CSS transforms: button, contact, theme, menu, and back-to-top styles must not combine into unintended whole-icon movement (Task 3 browser check).

## File Map

- Create `components/icons/AnimatedIcons.tsx`: named SVG exports and a private SVG shell; each icon owns its internal shapes.
- Modify `styles/globals.css`: scoped finite keyframes, trigger rules, reduced-motion override, removal of conflicting whole-icon animation.
- Modify heading routes: `pages/about.tsx`, `pages/apps/[slug].tsx`, `pages/projects/[slug].tsx`, `pages/work/[slug].tsx`.
- Modify action routes: `pages/index.tsx`, `pages/apps/index.tsx`, `pages/404.tsx`.
- Modify controls: `components/Contact.tsx`, `components/Navigation.tsx`, `components/ThemeToggle.tsx`, `components/AppearanceMenu.tsx`, `components/BackToTop.tsx`.
- Modify `utils/arrowAnimation.ts` and `components/SiteLayout.tsx` only to close pointer-capability/re-entry gaps; preserve existing arrow components' split geometry.
- Tests: create `tests/icon-motion.test.cjs`; update `tests/apps.test.cjs`, `tests/contact-links.test.cjs`, `tests/footer-navigation.test.cjs`, `tests/arrow-animation.test.cjs`, `tests/back-to-top.test.cjs` and other existing icon-name checks only where migrations require it.

## Task 1: Shared internal SVG vocabulary

**Files:** Create `components/icons/AnimatedIcons.tsx`, `tests/icon-motion.test.cjs`; modify `styles/globals.css`.

**Interfaces:**
- Each named export accepts `IconProps = Omit<React.SVGProps<SVGSVGElement>, 'children'>` and returns `React.JSX.Element`.
- Exports: `BulbIcon`, `SlidersIcon`, `WidgetsIcon`, `ConstructionIcon`, `BriefcaseIcon`, `EducationIcon`, `DocumentIcon`, `CodeIcon`, `InfoIcon`, `OutcomeIcon`, `ExternalLinkIcon`, `EmailIcon`, `LocationIcon`, `SendIcon`, `MenuIcon`, `CloseIcon`, `SunIcon`, `MoonIcon`, `PaletteIcon`, `CheckIcon`, `GithubIcon`, `LinkedinIcon`, `UpArrowIcon`.
- Root SVG: `animated-icon` plus a variant class, 24-unit viewBox, 1em dimensions, currentColor, aria-hidden="true", focusable="false". Merge caller classes; retain caller sizing. Fixed aria-hidden/focusable values cannot be overridden.
- Internal targets use explicit descriptive classes; animations never transform the root SVG.

- [ ] Add failing render tests using `typescript.transpileModule` with JSX support and `createRequire` (as existing rendering tests do), then `react-dom/server.renderToStaticMarkup`. Render every named export; assert decorative semantics, caller class preservation, finite internal targets, and visible resting shapes.
- [ ] Add a repeated-brand render test: render two copies of each brand in one React tree; assert no duplicate IDs/references and unchanged logo path geometry across copies. Use installed react-icons brand geometry as the baseline, not a redrawn approximation.
- [ ] Run `node --require ./tests/register.cjs --test tests/icon-motion.test.cjs`; confirm failure because the module is absent.
- [ ] Implement the named exports. Use a private SVG shell, explicit geometry per icon, and a fixed resting frame with separately movable details matching the spec's vocabulary. For brands, retain existing silhouette paths and overlay a clipped highlight using React `useId` for instance-local clip IDs. No persistent opacity reduction of the base logo.
- [ ] Implement variant keyframes, 320–500ms, one iteration, settling at original geometry. Activate from `h2:hover`, appropriate `h3:hover`, action hover, focus-visible, appearance-label focus via `:has(input:focus-visible)`, and explicit static-label hover. Scope rules to `.animated-icon`; do not animate every SVG generically. Restrict pointer hover triggers to `(hover: hover) and (pointer: fine)`, and suppress all added animation under reduced motion.
- [ ] Run the render tests; expect all passing. Browser verification of computed motion is required in later tasks, not replaced by source-string assertions.

## Task 2: Migrate headings, launch actions, and contact brands

**Files:** Heading/action routes and `components/Contact.tsx` from the file map; related existing tests.

**Interfaces:** Consume Task 1's named SVG exports; use existing `DirectionalArrow` for 404 and contact fallback arrows. Existing heading labels, aria-labels, URLs, tracking callbacks, iris overlays, and reveal-origin handlers remain unchanged.

- [ ] Add/adjust failing component-tree checks asserting heading labels and decorative icons, and that launch actions retain button classes, external destinations, one analytics handler, and hidden overlay copies. Adapt existing tests to render actual icons where possible rather than require their former import names.
- [ ] Add contact render assertions for unchanged email/GitHub/LinkedIn URLs and accessible labels with decorative brand SVGs. Do not submit the contact form or call external services.
- [ ] Run `npm test`; confirm failures identify missing icon integration rather than test-loader errors.
- [ ] Replace icon imports/usages in the routes and Contact. Add a narrow hover trigger class to the static location label. Keep heading containers non-focusable, and preserve form validation, disabled states, status feedback, and contact analytics.
- [ ] Remove obsolete name-based test expectations for react-icons components; preserve semantic assertions and external-link/analytics checks. Do not remove tests simply to make the suite green.
- [ ] Run `npm test` and `npm run type-check`; expect zero failures.
- [ ] In a browser tab owned by this session, verify bulb, sliders, tiles, GitHub, LinkedIn, envelope, and duplicated launch-button icons. Hold hover beyond duration, traverse child boundaries, then leave/re-enter: exactly one cycle per entry and no whole-SVG motion. Verify light/dark visibility, keyboard-visible focus on links, and static reduced-motion rendering. Record results in this plan.

## Task 3: Migrate navigation controls and finish arrows

**Files:** Navigation, ThemeToggle, AppearanceMenu, BackToTop, `styles/globals.css`, `utils/arrowAnimation.ts`, `components/SiteLayout.tsx`; existing arrow, theme, appearance, and back-to-top tests.

**Interfaces:** Consume Task 1 icons. Preserve `animateArrows(element: Element): void`; retain the 320ms existing split-path arrow animations. If pointer gating is needed, gate pointer dispatch in SiteLayout rather than keyboard animation, so keyboard users without a fine pointer retain focus feedback.

- [ ] Add failing tests that control SVG replacement preserves hydration-safe theme labels, menu labels/expanded state, radio selection semantics, and back-to-top focus/scroll cleanup. Resolve local imports in VM tests with `createRequire(filename)` where migration requires it.
- [ ] Extend arrow interaction checks: reduced motion produces no animation calls; entry animates internal paths once; child-to-child pointer movement does not restart; real re-entry restarts; keyboard-visible focus still animates without hover capability.
- [ ] Replace the existing test requiring an infinite back-to-top bounce with a check for a visible resting up arrow and finite interaction motion. Run affected tests and confirm the intended red state before control migration.
- [ ] Migrate control icons without changing click, dialog, theme, appearance, scroll, or focus logic. UpArrowIcon animates only its head/shaft details; back-to-top no longer auto-bounces.
- [ ] Remove or narrowly exclude `.animated-icon` from competing whole-SVG button/contact movement, send-plane travel, theme/menu wrapper rotations, and back-to-top bounce rules. Retain non-icon color, border, and focus feedback. Ensure hidden/inert/disabled controls cannot produce actionable-looking feedback.
- [ ] Close pointer-capability gaps in existing arrow dispatch and verify it still ignores movement among a link's descendants. Do not apply new SVG keyframes to existing DirectionalArrow/TiltedArrow paths.
- [ ] Run `npm test` and `npm run type-check`; expect zero failures.
- [ ] Browser-check desktop/mobile menu controls, both theme states, appearance trigger and radio keyboard navigation, back-to-top, and forward/back/tilted arrows. Test coarse-pointer and reduced-motion emulation; verify no autoplay or unintended control activation. Record results.

## Task 4: Whole-application verification and delivery

**Files:** Update this plan's verification record; change production files only for defects found within scope.

**Interfaces:** No new API. Completed Tasks 1–3 are the deliverable.

- [ ] Inspect active route imports and rendered shared components for missed icons; exclude unused legacy components and image assets as the spec requires.
- [ ] Run `npm test`, `npm run type-check`, `npm run build`, and `git diff --check`; report exact failures or environment blockers, never claim an unrun check passed. The repository's `lint` script uses `next lint`; check its compatibility before treating it as usable and report if unavailable.
- [ ] Inspect representative pages at desktop and narrow mobile widths in both themes. Confirm no layout shifts, clipped resting icons, duplicate accessible names, altered destinations, or analytics changes. Close only browser tabs created by this session.
- [ ] Review the diff against the spec and report implemented coverage, verification results, and any limitations. Do not commit or push.

## Verification Record

- Tasks 1–3 implemented inline; progress and RED/GREEN logs are retained in the ignored `.superpowers/sdd/2026-10-25-icon-motion/` workspace. No commits or pushes.
- Final suite: 56 tests passing. Type-check and `git diff --check` pass. Production build compiled and generated all 30 pages.
- `npm run lint` works, with a Next.js deprecation notice and the existing `jsx-a11y/alt-text` warning on the app-detail image spread (`pages/apps/[slug].tsx`). Build reports the same warning.
- Browser checks used tabs in the already-running Chrome instance; pre-existing tabs were not modified. The temporary production server was stopped; final checks used the existing development server.
- Desktop app detail: no icon autoplay or duplicate IDs; both launch overlay copies run one 400ms internal cycle, stop while hover is held, and keep root transforms at `none`. Bulb rays stagger 0–80ms; sliders, tiles, and GitHub highlights activate as intended.
- Contact: email, LinkedIn, and GitHub preserve destinations and visible labels; keyboard-visible focus activates internal flap/highlight motion without root transforms. Narrow mobile reduced-motion rendering is static, visible, and has no horizontal overflow.
- Controls: appearance opening focuses the selected native radio without changing selection; Escape restores trigger focus. Theme toggling preserves labels and swaps moon/sun. Mobile dialog opens with focus inside and Escape restores the menu trigger. Back-to-top rests without autoplay; focus/scroll cleanup is covered by the component test.
- About and project pages: light/dark visibility and representative desktop/mobile layouts checked; keyboard focus starts only the two 320ms directional-arrow path animations.
- Independent review found a resting LinkedIn highlight overlap. A failing endpoint-bounds test reproduced it; both highlight endpoints now clear the logo including stroke width. Browser `isPointInStroke(3,21)` is false at rest and under reduced motion.
- Review limitation: the independent reviewer could inspect files but could not obtain a git diff in its environment. This is a partial independent review, supplemented by the author's tests and browser checks; not an exhaustive visual sweep of every route/input combination.
