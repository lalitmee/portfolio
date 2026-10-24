# App Stories Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Feature HN Revamped, list all three tools, and replace portfolio app proxies with story pages and independent launch links.

**Architecture:** Keep local typed app records and statically generate one shared detail template using the existing project-detail pattern. Directory and homepage consume those records; external launch actions alone emit `app_launch`.

**Tech Stack:** Existing Next.js 15 Pages Router, React 19, TypeScript, CSS, and Node test runner.

**Spec:** `docs/superpowers/specs/2026-10-25-app-stories-design.md` (approved in conversation).

## Global Constraints

- No CMS, database, live GitHub fetch, new dependency, or generic content framework.
- No upstream edits or deployment changes are approved.
- No invented anecdotes, usage metrics, testimonials, or unsupported outcomes.
- Obtain approved motivation copy before calling the story content complete.
- Only direct app-launch actions emit the existing consent-gated `app_launch` event.
- No commits or pushes without separate explicit approval; task checkpoints below are not commit authorization.
- Preserve unrelated work, including `.vscode/tasks.json` and upstream untracked files.

## Review Focus

- Unknown and array-valued slugs must not resolve to a published story (Task 1).
- A story click must never masquerade as an app launch (Task 2).
- Separate story/launch actions must not become nested links (Task 2).
- Old asset paths must not redirect to app HTML, and story roots must remain local (Task 1).
- Missing approved motivation must not produce invented copy or public placeholders (Tasks 1 and 3).

## File Map

- Create `data/apps.ts`: app records, HN featured selection, and slug lookup.
- Create `pages/apps/[slug].tsx`: static detail routes and supported story sections.
- Modify `pages/apps/index.tsx`, `pages/index.tsx`: directory and homepage consumers.
- Modify `next.config.js`: remove app proxies; add only verified, exact legacy redirects if justified.
- Modify `styles/globals.css`: minimal adjustments for separate actions and detail screenshots.
- Create `public/images/apps/hn-revamped.png`: copy the inspected upstream README screenshot, not a fabricated mockup.
- Modify `tests/apps.test.cjs`, `tests/home-apps.test.cjs`, `tests/routes.test.cjs`: replace obsolete proxy/two-home-app assertions and add new contract checks.
- Keep `utils/analytics.ts` unchanged unless a regression proves an existing bug.

## Task 1: App records, detail routes, and proxy migration

### Approved editorial direction

All three tools must be presented as ongoing projects, not finished products.
Each detail page displays **Actively evolving** and this approved statement:

> This is an ongoing project. I’ll keep expanding and refining it as I use it, discover new needs, and find better ways to solve the problem.

The user approved the following Markdown story in conversation. Use this copy
rather than the earlier generic local-file motivation:

#### Markdown Previewer — Giving Markdown the reading experience it deserves

As LLM-assisted and agentic coding become part of everyday development, more of the work arrives as Markdown: implementation plans, design proposals, task lists, and technical explanations. These documents need more than a quick glance—we need to review them, understand their intent, and often edit them before moving forward.

I built Markdown Previewer to give that content a reading experience that does it justice. Code editors are useful for working with the source, but I wanted a dedicated space where the structure, diagrams, tables, and details could be easier to follow.

The app brings local folder browsing, search, rendered Mermaid diagrams, focused table views, and split editing into one browser-based workspace. Documents stay on your device, so you can work with the files you already have.

It remains a work in progress, shaped by the documents I encounter and the friction I find while using it.

The earlier HN Revamped and JSON Assistant drafts remain proposed copy: the
latest approval explicitly follows the Markdown revision and shared ongoing
positioning, not a separate final review of those two stories. Confirm their
copy before treating all content as approved. Do not ask again for Markdown's
motivation.

**Interfaces:** Export `type App`, `apps: readonly App[]`, `featuredApp: App`, and `getApp(slug: unknown): App | undefined` from `data/apps.ts`.
`App` fields: `slug`, `name`, `description`, `liveUrl`, `sourceUrl` (strings),
`screenshot: { src: string; alt: string; width: number; height: number }`,
`capabilities: readonly string[]`, `decisions: readonly string[]`, and optional
`motivation: string`. Motivation is omitted until user-approved, never auto-generated.

- [ ] Record baseline using `git status --short`, `yarn test`, and `yarn type-check`; report pre-existing failures separately.
- [ ] Read the three upstream READMEs and verify source remotes read-only. Record capabilities and technical decisions from authoritative evidence, not repository descriptions alone.
- [ ] Inspect Markdown Previewer's `/settings` handling in `src/App.jsx` and check the deployed `/settings` response and assets. Source uses absolute `/settings`; this is not proof that `/apps/markdown-preview/settings/` ever worked. Search portfolio links for actual nested app URLs. Add no blanket redirects. If a meaningful old nested route is verified, add an exact redirect and an assertion for that pair; otherwise leave obsolete nested paths as 404 and disclose this in the handoff.
- [ ] Ask for each tool's origin and approve the resulting motivation copy before publishing that section. Other implementation work can proceed without motivation; final content completion remains blocked until this input arrives.
- [ ] Use the approved Markdown story above. Seek final review only for the outstanding HN and JSON drafts. Add regression assertions that every detail displays Actively evolving and the approved ongoing-project statement, and that Markdown's story retains the LLM-assisted and agentic-coding motivation.
- [ ] Write failing record assertions in `tests/apps.test.cjs`: slugs equal `['hn-revamped', 'markdown-preview', 'json-assistant']`; `featuredApp === apps[0]`; unique slugs; `getApp('hn-revamped') === apps[0]`; unknown, undefined, and array inputs return undefined. Assert these exact live URLs in order: `https://hn-revamped.vercel.app/`, `https://md-reader-lalit.vercel.app/`, `https://json-assistant-one.vercel.app/`. Assert screenshot files exist, dimensions are positive, and unapproved records omit motivation.
- [ ] Add route assertions: `pages/apps/[slug].tsx` exists, exports `getStaticPaths` and `getStaticProps`, uses the shared app records, `fallback: false`, and returns `notFound: true` for missing records. Test the production unknown-slug 404 in Task 3 rather than relying solely on source assertions.
- [ ] Replace obsolete proxy tests with assertions that `(await nextConfig.rewrites?.()) ?? []` contains no external `/apps/` rewrites and configured redirects do not match story roots or arbitrary asset paths.
- [ ] Run `node --require ./tests/register.cjs --test tests/apps.test.cjs tests/routes.test.cjs`; confirm new checks fail for the missing contract, not a test syntax error.
- [ ] Implement the records and lookup. Use the screenshot already referenced in HN's README, `public/screenshots/article-reader.png`, copied to portfolio `public/images/apps/hn-revamped.png`; inspect its actual dimensions. Retain existing Markdown and JSON screenshot files. Verify source URLs from the upstream remotes before adding them.
- [ ] Implement `AppDetail({ app }: { app: App })`, `getStaticPaths: GetStaticPaths`, and `getStaticProps: GetStaticProps` in `pages/apps/[slug].tsx`. Reuse `SiteLayout`, `DirectionalArrow`, `next/image`, existing detail styles, and external-link conventions from `pages/projects/[slug].tsx`. Omit empty optional sections. Provide All apps, Open app, and View source actions; only Open app calls `trackEvent({ event: 'app_launch', app_slug: app.slug })`.
- [ ] Remove the two rewrites in `next.config.js`. Retain `trailingSlash`, strict mode, and image configuration. Apply only verified exact legacy redirects from the earlier step.
- [ ] Run the focused tests again; expected PASS for updated record/routing checks. Save a checkpoint without committing.

## Task 2: Directory and HN-only homepage

**Interfaces:** Consume `apps`, `featuredApp`, and `App` from Task 1. Continue using `trackEvent` from `utils/analytics.ts`; add no analytics event type.

- [ ] Update `tests/home-apps.test.cjs` to assert the app section consumes `featuredApp`, includes Read the story, Open app, and Browse all apps, and contains no hard-coded Markdown/JSON feature entries. Preserve the dark-mode contrast/style check.
- [ ] Update `tests/apps.test.cjs` to assert the directory iterates over `apps` and contains neutral introductory copy, separate story and launch actions, local screenshots, and accessible external-link attributes. Replace old assertions requiring two single-link cards; retain arrow and reduced-motion coverage adapted to the new wrapper.
- [ ] Add source-level assertions that launch handlers occur only on external launch anchors, never on story `Link` elements. Assert listing wrappers are non-interactive `article` elements and no launch anchor appears inside a `Link`. Use actual keyboard/DOM checks in Task 3 to supplement these structural tests.
- [ ] Run `node --require ./tests/register.cjs --test tests/apps.test.cjs tests/home-apps.test.cjs`; expect new UI assertions to fail against the current markup.
- [ ] Refactor `pages/apps/index.tsx` to render each app as an article with screenshot, name, description, Read the story (`/apps/${app.slug}/`), and Open app (`app.liveUrl`). Use neutral app-directory metadata and introduction; do not apply JSON's local-only promise to HN.
- [ ] Replace the homepage app rows with the single `featuredApp` record and its separate story/launch actions. Keep Browse all apps and the section's existing editorial treatment; use neutral app wording rather than describing HN as a file-processing tool.
- [ ] Adjust only affected styles in `styles/globals.css` for article actions, screenshot sizing, focus indicators, and small screens. Preserve both themes and reduced-motion behavior; ensure arrows are decorative and actions have meaningful accessible names.
- [ ] Run the focused tests again, then `yarn test` and `yarn type-check`; expect PASS or explicitly identify unrelated baseline failures. Save a checkpoint without committing.

## Task 3: Integrated verification and content handoff

**Interfaces:** Exercise the routes and launch semantics from Tasks 1–2 without upstream writes.

- [ ] Run `yarn prettier --check data/apps.ts 'pages/apps/[slug].tsx' pages/apps/index.tsx pages/index.tsx next.config.js styles/globals.css tests/apps.test.cjs tests/home-apps.test.cjs tests/routes.test.cjs`. Fix only changed-file formatting and re-run until PASS.
- [ ] Run `yarn test`, `yarn type-check`, and `yarn build`. Confirm the build emits all three app detail routes and preserve the actual results; do not claim an unrun lint pass (`lint` currently invokes `next lint`).
- [ ] Start the production build with `yarn start -p 3100`. Request `/`, `/apps/`, and all three detail routes: expect 200. Request `/apps/not-a-tool/` and obsolete nested asset URLs: expect 404 unless an exact legacy redirect was explicitly verified. Confirm story roots do not redirect externally.
- [ ] Check all live deployment roots with headless HTTP requests, following redirects. Inspect HTML and referenced assets, not just status codes. Report access/network failures as unverified; stop for approval if a tool-side change is required.
- [ ] Inspect rendered pages at 390px and 1440px, light and dark themes, keyboard navigation, 200% zoom, and reduced motion. Confirm visible screenshots, no horizontal overflow, distinct action focus stops, no nested links, and new-tab launch behavior. If using browser tools, list existing tabs first and use only agent-owned tabs for navigation; close those tabs afterward.
- [ ] Validate analytics with accepted and declined consent: story navigation emits no `app_launch`; Open app emits one event with the correct slug only after consent. Re-run existing analytics tests. Do not change upstream instrumentation or claim live GA4 delivery from local event evidence.
- [ ] Inspect all three published detail pages for invented motivations, placeholder text, and unsupported claims. If approved motivation is still absent, report the stories as content-incomplete and ask for the missing input; do not label the entire feature finished.
- [ ] Review `git diff --check`, `git diff --stat`, and the scoped diff against the approved spec. Report nested bookmark handling, validation limits, and missing content explicitly. Do not commit, push, or deploy without separate approval.

## Execution Handoff

Recommended: native execution, since the three tasks share a small content and
routing contract. Implementation waits for plan review and execution-method
selection. A final independent review may use a reviewer only when authorized
by the selected execution workflow; no agents have been dispatched during planning.
