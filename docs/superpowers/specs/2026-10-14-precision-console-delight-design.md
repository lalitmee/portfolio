# Precision Console — identity and interaction polish

Status: the in-chat design is approved; this written spec awaits user review. No implementation is authorized until this spec and a subsequent implementation plan are approved.
Extends: `docs/superpowers/specs/2026-10-13-precision-console-design.md`
Workspace: `/home/lalitmee/Projects/Personal/Github/portfolio-worktrees/precision-console`
Branch: `feat/precision-console`

## Intent

Give the existing portfolio a memorable original LK identity, a few restrained tactile interactions, and a useful way to explore its real project catalog. Use Josh Comeau’s portfolio only as inspiration for craft and feedback; do not copy its artwork, code, composition, or distinctive assets. Keep the site approachable to non-engineers and technically credible without making it a playground framework.

## Brand mark and icons

- Replace the text-only `LK.` navigation mark with an original compact LK ligature and the readable name “Lalit Kumar”. The full name remains visible at all viewport sizes; the mark is not the only accessible name.
- Draw the mark as a simple original SVG. Use the same static geometry for the navigation brand and the browser favicon/application icons (`favicon.svg`, `favicon.ico`, `favicon.png`, and `icon.png`). Keep icons static rather than changing them with the theme.
- Update the shared document icon and web manifest references to those assets. Replace the stale purple manifest theme color with the Precision Console dark canvas token `#111820`; retain an appropriate light background color.
- On pointer hover and keyboard focus, the inline brand mark may play one brief path-draw/elastic response. It must not loop or delay navigation. Under reduced motion, render the same mark without movement.

## Local interaction details

- Use CSS and the existing stack for one-shot motion: a small arrow nudges on hover/focus, and actionable project/case cards receive a restrained border or lift response on hover/focus/active.
- Motion is supplemental; the action remains visible without hover, focus remains obvious, and touch users can identify and activate controls without animation. Do not add page-entry motion, particles, a custom cursor, sound, or motion that repeats automatically.
- `prefers-reduced-motion: reduce` removes transforms and animated drawing while preserving all content, state, and focus feedback.

## Project browser

- Replace the selected-projects plus collapsed archive presentation on `/projects/` with a compact browser over the existing `data/portfolio.json` project records. Preserve every existing project slug and `/projects/[slug]/` detail route.
- Provide a native labeled search field that filters project title, description, and technology values case-insensitively. Search is local and makes no network requests.
- Show matching projects in a selectable list. Selecting one updates an adjacent detail panel with its real description, technologies, and only the source/demo links that exist in the data. Include a normal link to that project’s existing detail page; selecting an item does not replace or mutate its URL.
- Initially select the first curated project in the existing catalog order. If filtering removes the current selection, select the first remaining result. If there are no results, clear the detail panel and show a clear-search action. Clearing search restores the catalog and a valid selection.
- At narrow widths, stack the list and detail panel in reading order. Keep controls usable with keyboard and touch; use native button semantics for selection, no custom keyboard model or mandatory shortcut. Announce result-count changes politely to assistive technology.
- Do not fabricate previews, commands, usage counts, status, or project data. Do not fetch GitHub or app metadata at runtime.

## Technical and accessibility boundaries

- Preserve Next.js 15 Pages Router, React, TypeScript, Tailwind, next-themes, current project data, and route slugs. Use inline SVG and CSS with existing dependencies; add no package for motion or icons.
- Keep the current page structure and copy outside the navigation/project-list changes. The logo and interactions are polish, not a new homepage hero or a site-wide visual redesign.
- Retain visible focus, labels, adequate contrast in both themes, and the existing reduced-motion baseline. Search and selection must work without pointer hover. The selected item and its detail route must be understandable without relying on color or motion.

## Acceptance checks

- At desktop and mobile sizes, the same LK mark and full name render cleanly in dark and light themes; browser favicon, application icon, and manifest assets use the same mark.
- Keyboard and touch can search, select a project, activate source/demo/detail links, clear an empty search, and return to the full list. Searching each of title, description, and technology produces the expected result; no-match state remains recoverable.
- All prior project detail URLs remain available, with no URL change caused by in-panel selection.
- Hover/focus details are brief and nonessential. Reduced-motion emulation removes movement; keyboard focus remains visible. No horizontal overflow at 390px or 200% zoom.
- Run the existing test, type-check, lint, and production build commands; add small tests for filtering/selection and icon/manifest references without introducing a test framework. Verify the project browser using the existing Chrome instance only. Any local server must use an available port other than 3000; do not disturb the existing service on 3000.

## Out of scope

No copied Josh Comeau visuals or code, generative-art hero, logo editor, animated favicon, custom cursor, sound, project-preview playground, new animation framework, new content/data source, route redesign, analytics changes, or public deployment.

## Approval handoff

After approval of this written spec, create a focused implementation plan, obtain plan review and execution-method approval, then implement only in this worktree. This spec approval does not authorize product-code changes by itself.
