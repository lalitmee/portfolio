# Portfolio Motion and Interaction Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add restrained shared micro-motion and a three-step Nykaa cart reliability narrative for hiring teams.

**Architecture:** Extend shared CSS interaction styles and render three native `<details>` disclosures only for `nykaa-cart-reliability` in the existing case-study route. Reuse `CaseStudy` data and current dependencies; keep other case-study routes and the homepage entry link unchanged.

**Tech Stack:** Next.js 15, React 19, TypeScript, global CSS, Node.js built-in test runner.

**Spec:** `docs/superpowers/specs/2026-10-20-portfolio-motion-interaction-design.md`

## Global Constraints

- Preserve the current editorial layout, content, routes, and palette.
- Use CSS for new shared micro-interactions; keep current Framer Motion usage for navigation and page transitions.
- No parallax, cursor-following, perpetual decorative motion, or copied artwork/colors/layout.
- Respect `prefers-reduced-motion`: remove movement and decorative echo transitions while preserving visible hover, focus, and pressed states.
- Ground all copy in `data/caseStudies.ts`; do not invent metrics, quantified impact, production UI, or private screenshots.
- Add no packages, routes, analytics events, content systems, or generic animation abstractions.
- Preserve focus-visible styling, semantics, theme behavior, analytics consent, and unrelated case-study content.
- Local UI only; do not deploy, merge, or send analytics requests.

## Review Focus

- Reduced motion removes movement/echo but retains interaction feedback — Task 1 test and browser check.
- Touch input has no hover-only affordance — Task 1 test and mobile check.
- Stateful theme/menu icons animate on state change, static icons stay still — Task 1 test and keyboard/browser check.
- Non-Nykaa cases retain their four sections — Task 2 regression test and route check.
- Native disclosures remain keyboard-operable, visible-focus, touch-usable, and responsive in both themes — Task 2 test and browser matrix.

---

## File Structure

- `styles/globals.css` — shared interaction motion and disclosure presentation.
- `pages/work/[slug].tsx` — Nykaa-specific narrative branch; preserve other case rendering.
- `tests/motion-interaction.test.cjs` — CSS regression checks using `node:test`.
- `tests/case-study-interaction.test.cjs` — route-content regression checks using current source-read test conventions.

### Task 1: Shared Motion Language

**Files:** Modify `styles/globals.css`; create `tests/motion-interaction.test.cjs`.

**Interfaces:** Consume existing `.button`, `.text-link`, `.row-arrow`, `.theme-toggle`, `.menu-toggle` selectors; produce CSS feedback without a new component API.

- [ ] **Step 1: Write tests**

Add tests named `directional arrows respond to hover and keyboard focus`, `buttons have hover and pressed feedback without layout changes`, `state-changing control icons use state-based feedback`, `reduced motion removes movement but keeps interaction states`, and `touch interaction does not rely on hover`. Read CSS and assert directional transforms, text-link-only chevron echo, button hover/`:active`, state-based theme/menu selectors, reduced-motion overrides, and a touch-compatible state. Assert transforms rather than geometry-changing offsets.

- [ ] **Step 2: Run tests and verify red**

Run `node --require ./tests/register.cjs --test tests/motion-interaction.test.cjs`; expect failure because new rules are absent.

- [ ] **Step 3: Implement CSS motion**

Add restrained transitions: arrows glide a few pixels on hover/focus; only text links get a brief trailing-chevron echo; buttons get a slight hover lift and distinct pressed feedback without changing geometry. Tie stateful icon feedback to existing `aria-pressed`/`aria-expanded`, not generic hover. Preserve focus outlines and colors. Reduced motion removes movement/echo while retaining visible states; touch feedback cannot depend on hover.

- [ ] **Step 4: Run focused tests and verify green**

Run `node --require ./tests/register.cjs --test tests/motion-interaction.test.cjs`; expect all five tests to pass.

- [ ] **Step 5: Commit**

`git add styles/globals.css tests/motion-interaction.test.cjs && git commit -m "feat: add quiet interaction motion"`

### Task 2: Nykaa Decision Path

**Files:** Modify `pages/work/[slug].tsx` and `styles/globals.css`; create `tests/case-study-interaction.test.cjs`.

**Interfaces:** Consume `CaseStudy.slug`, `.context`, `.contribution`, `.decisions`, `.outcome`; produce the same route/props, with three disclosures for Nykaa and existing four sections for other cases.

- [ ] **Step 1: Write tests**

Add source-read tests named `Nykaa case page has the three named native disclosures`, `Nykaa decision path uses existing fields without invented metrics`, and `other cases retain the four-section presentation`. Assert the Nykaa-only branch, visible `01`/`02`/`03`, native `<details>/<summary>` labels “The challenge”, “What I did and why”, “The outcome”; map the existing four data fields into those three stages; omit old headings for Nykaa. Assert `.case-detail > details` presentation and `summary:focus-visible` styling, plus the fallback's four headings and field mappings. Do not add a content model.

- [ ] **Step 2: Run tests and verify red**

Run `node --require ./tests/register.cjs --test tests/case-study-interaction.test.cjs`; expect failure because the branch is absent.

- [ ] **Step 3: Implement conditional markup**

Branch on `study.slug === 'nykaa-cart-reliability'`. Render native disclosures with useful summaries and visible numbering; challenge uses `study.context`, middle disclosure combines `study.contribution` and `study.decisions`, outcome uses `study.outcome`. In `styles/globals.css`, give `.case-detail > details` the existing section spacing/border treatment and preserve the editorial heading/body typography; add `summary:focus-visible` to the visible focus rule. Preserve the four existing sections for other slugs; do not change homepage link, route, or metadata.

- [ ] **Step 4: Run focused and existing tests**

Run `node --require ./tests/register.cjs --test tests/case-study-interaction.test.cjs tests/routes.test.cjs tests/content.test.cjs`; expect all pass with slugs and route behavior unchanged.

- [ ] **Step 5: Commit**

`git add 'pages/work/[slug].tsx' tests/case-study-interaction.test.cjs && git commit -m "feat: add Nykaa cart decision path"`

### Task 3: Integrated Verification

**Files:** Verify `pages/index.tsx`, `pages/work/[slug].tsx`, `pages/work/index.tsx`, `pages/projects/index.tsx`, `styles/globals.css`.

**Interfaces:** Consume Tasks 1–2; produce verified local behavior, with no additional feature code unless an in-scope defect appears.

- [ ] **Step 1: Verify routes and content**

Run the local site. Confirm homepage Nykaa row still links to `/work/nykaa-cart-reliability/`; Nykaa has exactly three disclosures; measurement-attribution and Quartic still have their four sections.

- [ ] **Step 2: Verify browser/accessibility matrix**

Check home, representative work/project routes, and Nykaa at desktop/mobile widths: pointer hover/press, keyboard Tab/Enter/Space and visible focus, touch, light/dark themes, reduced motion. Confirm no layout shift or destination change, reduced motion retains feedback, and every disclosure opens by keyboard and touch. Do not submit contact forms or send analytics.

- [ ] **Step 3: Run repository checks**

Run `yarn test`, `yarn type-check`, `yarn lint`, `yarn build`, and `git diff --check`; expect successful exits and inspect warnings for actual failures.

- [ ] **Step 4: Review final diff**

Confirm only intended motion CSS, Nykaa markup, and focused tests changed; no dependencies, analytics, unrelated edits, or deployment. Fix any in-scope defect and rerun relevant checks before committing.
