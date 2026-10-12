# Site shell polish — design

Status: proposed; awaiting written-spec approval. No implementation authorized by this document alone.
Workspace: `/home/lalitmee/Projects/Personal/Github/portfolio-worktrees/feat-ui-revamp`
Branch: `feat/ui-revamp`

## Intent and constraints

Polish the existing editorial portfolio shell so its controls, transitions, and browser icon feel intentional and consistent with the established visual identity. Preserve the current content, route structure, theme persistence, and analytics consent contract. Do not deploy.

Use existing dependencies only. `react-icons` and `framer-motion` are already installed; do not add packages or use a remotely loaded icon font. Use Material Design icons from the installed icon set for the theme control, menu control, and directional indicators in the active site UI. Keep labels and accessible names; icons must not be the only accessible cue.

## Interaction and motion

- Replace the text-only theme control with a sun/moon icon that indicates the available theme action and continues to use the existing `next-themes` preference. Keep an accessible name and pressed state; avoid hydration flashes or layout shifts.
- Replace the menu text and × glyph with menu/close icons. Keep the existing disclosure semantics, Escape-to-close behavior, focus restoration, active route state, and route-change close behavior.
- Give mobile menu items a restrained staggered fade/short slide when opening and a coordinated exit when closing. The closed menu must not remain focusable or be exposed in the accessibility tree.
- Add a subtle page-content transition on route changes (short fade and small vertical offset). Keep the shared header/footer stable, retain one main landmark, and preserve route-change focus handling. Do not delay navigation or trap focus during transitions.
- Respect `prefers-reduced-motion`: remove movement and reduce transitions to none or near-instant feedback. Motion is decorative and must not control content availability.
- Replace active-site directional text glyphs with consistent Material icons where they currently act as arrows; do not sweep through dormant legacy components unrelated to the active site shell.

## Browser identity

Create a crisp SVG favicon based on the header's `LK.` wordmark, using the established site palette rather than the old purple gradient. Reference it explicitly for browsers and update the web app manifest to use the same mark and matching theme/background colors. Keep the header brand itself unchanged.

## Scope and implementation boundaries

Expected files: `components/Navigation.tsx`, `components/ThemeToggle.tsx`, `components/SiteLayout.tsx`, `styles/globals.css`, `pages/_document.tsx`, `public/` favicon asset(s), and `public/manifest.json`; touch other active UI files only where an arrow indicator is actually rendered. No analytics implementation changes, content rewrite, router migration, dependency changes, or work on the external Markdown Previewer.

Analytics IDs remain absent until supplied by Lalit. Test the existing missing-configuration behavior and consent safeguards locally; do not use invented or dummy IDs for live Google requests. GTM Preview / GA4 DebugView validation is deferred until real IDs and container access are provided.

## Verification and handoff

Format touched source files consistently with the repository. Run `yarn test`, `yarn type-check`, `yarn lint`, `yarn build`, and `git diff --check`, distinguishing pre-existing/tooling warnings from regressions. Use Chrome DevTools against a local build to inspect desktop and mobile layouts, theme icons in both modes, menu open/close and keyboard behavior, route transitions, reduced motion, favicon/manifest requests, console errors, and analytics behavior with no configured IDs. Do not deploy; leave the completed code and local UI available for Lalit's review.
