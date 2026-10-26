# Portfolio Editions — Handoff Brief

## Purpose

Explore presenting multiple versions of Lalit's portfolio on `lalitmee.com`. The versions are distinct visual/editorial experiences—not just color themes—and should let the portfolio communicate both the work itself and the thinking and creativity behind its presentation.

This brief captures the current direction from discussion. It is not an implementation spec; confirm details and approve a design before building.

## Direction so far

- Support more than two portfolio versions over time.
- Give each version a stable, shareable URL (for example, `/classic` and `/editorial`). Final names and route structure remain open.
- Do not designate one edition as the default. Keep `/` as a neutral showcase/index of editions rather than silently choosing or remembering one.
- Make the index a designed introduction to Lalit and the portfolio—not a bare theme picker. It should communicate current identity/work and explain each edition's point of view, with a preview and a way to open it.
- Keep identity and factual portfolio content truthful and consistent between editions; express creativity through each edition's presentation.
- Allow visitors to switch editions from within an edition as well as choose one from the index.

## Transition direction

- Make edition changes feel intentional and let the destination edition define its signature entrance. Use a shared, brief exit rather than custom animation for every source/destination pair; this avoids an `n × n` set of transitions as editions grow.
- Respect reduced-motion preferences with a static or near-instant transition.
- Keep ordinary page-navigation transitions distinct from edition-switch transitions. Reuse existing transition code where it fits; avoid stacking effects.

Relevant existing revamp code:

- `components/PageTransition.tsx` applies a general route transition and focuses `#main-content` after navigation.
- `utils/appearance-motion.ts` provides an iris-style appearance change.

These are points to inspect during design, not a decision to use either unchanged for edition switching.

## Deployment and working context

- Production is currently the `main` portfolio at `lalitmee.com`; do not make exploratory changes directly on `main` or deploy them to production.
- Discussion direction is to continue in the existing `feat/ui-revamp` worktree, which already contains the editorial redesign, and only reach production through the normal merge/deploy path.
- Verify deployment configuration before publishing a branch so the work goes to a preview, not production.
- At handoff time, `feat/ui-revamp` had four modified, uncommitted files: `components/Footer.tsx`, `components/Navigation.tsx`, `styles/globals.css`, and `tests/interactive-playground.test.cjs`. The user said this existing work can be committed before building. No staging or commit happened in this session; staging confirmation is still pending. Preserve these changes and resolve that separately before starting implementation.

## Decisions still needed

1. Edition names, stable slug format, and whether edition paths cover nested pages (projects, about, contact, etc.).
2. What the neutral index should show first: a concise introduction, edition previews, selected work, or some combination.
3. How each edition expresses its point of view and what its signature entrance should be.
4. Where and how the edition switcher appears, including behavior on nested pages.
5. What portfolio data and routes can be shared versus what genuinely differs by edition.

## Suggested next step

Start with the open decisions above and inspect the current `feat/ui-revamp` routing/layout. Agree on a small design for the index, edition URLs, and switching behavior before changing routes or components. Then plan implementation and validate it in a branch preview; keep production unchanged until explicitly ready to deploy.
