# Creative Playground Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans or superpowers:subagent-driven-development to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking. Lalit selects execution in this separate worktree; no implementation is requested from the Editorial Workshop session.

**Goal:** Build an expressive but credible multi-page portfolio with a bounded useful Markdown demonstration.
**Architecture:** Keep Pages Router/static local evidence and a single shared shell. The homepage's fixed-example demo is one component, not a parser or new app subsystem. Consent-gated GTM delivers GA4; upstream app usage remains a documented separate task.
**Tech Stack:** Next.js 15.5.7, React 19, installed TypeScript/Tailwind/next-themes/EmailJS, Node built-in tests.
**Spec:** `docs/superpowers/specs/2026-10-13-creative-playground-design.md`

## Global Constraints

- Site experience copy is 8+; PDF's stale 6+ summary is disclosed, not silently modified.
- Keep installed Next.js 15 Pages Router, React, TypeScript, Tailwind, next-themes, and available dependencies.
- No router migration, CMS, database, realtime GitHub fetch, experimental rendering engine, or extra UI framework.
- Canonical/OG metadata uses `https://www.lalitmee.com/` plus the current route instead of github.io.
- Preserve upstream rewrite, trailing slashes, nested assets. Do not rebuild, inject instrumentation into, or theme the upstream app in this portfolio repo.
- No generated performance numbers, testimonials, star-count guarantees, or invented learning goals. Private research remains private.
- No public deployment until selection. Work only in `/home/lalitmee/Projects/Personal/Github/portfolio-worktrees/creative-playground` on `feat/creative-playground`.

## Review Focus

- Old project URLs must survive curation (Task 1 slug assertions; Task 3 HTTP check).
- The demo must remain understandable/usable by keyboard and without animation (Task 2/5 browser checks).
- Blocked storage must not break rendering/consent (Task 4 mock test).
- Consent mid-page, route revisits and effect reruns must not double-send views (Task 4 lifecycle check).
- Withdrawal with already loaded tags must stop measurement (Task 4 network check).

## File map and interfaces

- Modify `data/portfolio.json`: truthful metadata/new curated entries, preserve legacy titles. Create `data/caseStudies.ts`: `CaseStudy = {slug: string; title: string; employer: string; period: string; summary: string; context: string; contribution: string[]; decisions: string[]; outcome: string}`, `caseStudies: CaseStudy[]`. Exact slugs: `nykaa-cart-reliability`, `nykaa-measurement-attribution`, `quartic-data-interfaces`.
- Create `components/SiteLayout.tsx`: default `SiteLayout({title, description, children}: {title: string; description: string; children: React.ReactNode})`, owns one main; rewrite Navigation/Footer, simplify ThemeToggle, adjust app/document wrappers, globals/Tailwind only as needed.
- Create `components/MarkdownDemo.tsx`: default `MarkdownDemo(): React.ReactElement`, owns selected ID `'note' | 'checklist' | 'table'`; use native buttons with aria-pressed and matching semantic previews. Source snippets are fixed strings, no HTML injection, parser, arbitrary editing or upload. Add `data/markdownExamples.ts`: exported `markdownExamples: {id: 'note' | 'checklist' | 'table'; label: string; source: string}[]` in that order. Render heading/paragraph, unordered list, semantic table previews explicitly in the component.
- Create `pages/work/index.tsx`, `pages/work/[slug].tsx`, `pages/projects/index.tsx`, `pages/apps/index.tsx`, `pages/about.tsx`, `pages/contact.tsx`, `pages/privacy.tsx`, `pages/404.tsx`; rewrite homepage, restyle existing project detail and Contact. All pages consume SiteLayout; `_app.tsx` does not wrap them in another main.
- Create `utils/analytics.ts`: `Consent = 'accepted' | 'declined' | 'unknown'`; `AnalyticsEvent = {event: 'page_view'; page_path: string} | {event: 'case_study_view'; case_slug: string} | {event: 'project_open'; project_slug: string; destination_kind: 'source' | 'demo' | 'detail'} | {event: 'resume_download'} | {event: 'contact_click'; channel: 'email' | 'github' | 'linkedin'} | {event: 'app_launch'; app_slug: string}`; functions `normalizePagePath(url: string): string`, `readConsent(storage: Pick<Storage, 'getItem'>): Consent`, `saveConsent(storage: Pick<Storage, 'setItem'>, choice: Consent): boolean`, `trackEvent(event: AnalyticsEvent): boolean`.
- Create `components/AnalyticsConsent.tsx`, default `AnalyticsConsent(): React.ReactElement`, owns consent/loader/route subscriptions. Privacy exposes its settings without a second loader. Export `setAnalyticsConsent(choice: Consent): void` from `utils/analytics.ts`; component updates its memory gate at hydration/choice/withdrawal and trackEvent consults it, not storage per click. Create test-only `tests/register.cjs` using installed `typescript.transpileModule`, `tests/content.test.cjs`, `tests/analytics.test.cjs`; add test script `node --require ./tests/register.cjs --test tests/*.test.cjs`. No dependency additions. Create `docs/analytics-setup.md`, `docs/review-creative-playground.md`.

### Task 1: Evidence model and preserved project identity

**Files:** portfolio/case data, tests/register/content, package.json. **Consumes:** existing `generateSlug(title: string): string`, résumé/repository evidence. **Produces:** case interface and stable project content.
- [ ] Write failing tests for experience `'8+'`, exact three case slugs, unique slugs, all baseline project title-derived slugs retained, and five curated browse.nvim/cobalt2.nvim/codecompanion-spinners.nvim/markdown-previewer/dotfiles entries. Snapshot baseline before editing and assert no unsupported numeric outcomes.
- [ ] Run `yarn test` expecting absent content FAIL. Record type-check/build/lint baseline; install only from existing yarn.lock if necessary, no dependency/version changes. Record environmental blockers.
- [ ] Implement truthful case prose and curated real repository links; credit adaptations, preserve old titles, omit unsupported 10x/60%/1M+/99.9% and unconfirmed 3x impact, star guarantees, availability or private personality copy. Update experience/site metadata, leave PDF untouched.
- [ ] Run `yarn test`, `yarn type-check`; expect content PASS/no new type failures, review prose against sources.
- [ ] Stage exact files; commit `feat: curate creative playground portfolio evidence`.

### Task 2: Expressive shell, credible homepage, and bounded demonstration

**Files:** shell/nav/footer/theme/app/document/globals/Tailwind as needed, homepage, MarkdownDemo, markdownExamples, content test. **Consumes:** Task 1 evidence. **Produces:** shell API and fixed-example interaction above.
- [ ] Record failing baseline accessibility/layout observations (nested main, hash-only nav, splash, portrait-first mobile). Add failing test asserting example IDs `['note', 'checklist', 'table']`, labels nonempty, sources nonempty, and no user/network input; run `yarn test`, expect missing examples FAIL.
- [ ] Implement shell with one main, skip link, per-route metadata, Home/Work/Projects/Apps/About/Contact route links, active aria-current, mobile disclosure/Escape/focus restoration. Remove active old theme-cookie/customization bootstrap and keep next-themes saved preference. Choose logical single-column mobile ordering, not visual-position-based reading order.
- [ ] Build headline “Serious engineering. Room to explore.” with Work/Contact CTAs, professional highlights before the optional demo, selected tools/career context. Light `#FAF6ED`, ink `#20242B`, cobalt `#234BC4`, sparing orange `#B54420`, panel `#DCE8F4`; dark charcoal/lighter accents. Reuse Outfit; replace active decorative gradient CSS. No splash/physics/cursor/WebGL or interactions required to reach evidence.
- [ ] Implement fixed example strings: note `# A useful note\n\nSmall details make tools easier to use.`, checklist `- Read the problem\n- Make the smallest useful change\n- Check the result`, table `| Tool | Purpose |\n| --- | --- |\n| Markdown Previewer | Read local notes |`. Match each to explicit safe semantic preview, clearly label “Example preview” and offer full-tool link. Native selector buttons indicate state with text/aria-pressed; no parser, uploads, editing, injected HTML, animation requirement, or demo tracking event.
- [ ] Run tests/type-check/build; check exact selection-to-preview mapping in browser for all IDs, keyboard/tab/pressed state, full-tool link without interaction, mobile 390x844/desktop 1440x1000, themes, 200% zoom, reduced motion, contrast, focus, one main. New destinations complete in Task 3.
- [ ] Commit `feat: build creative playground shell and example demo` with exact paths.

### Task 3: Complete real case, project, tool and personal routes

**Files:** route set above, legacy project detail, Contact/content tests. **Consumes:** SiteLayout, caseStudies, generateSlug. **Produces:** complete routes without upstream app changes.
- [ ] Record failing new-route 404 responses; test unknown case absent and legacy static paths retained; record contact/PDF baseline.
- [ ] Implement Work static generation with fallback false and missing case notFound. Preserve all legacy project slug generation. Cases are readable ordinary narratives (context/contribution/decisions/outcome), not scroll-driven shows. Curate Projects with smaller history, real links, credit and no fabricated screenshots. Apps launches `/apps/markdown-preview/`, keep next.config.js rewrite unchanged.
- [ ] Implement About chronology/capabilities/mentoring/education/résumé/stale-summary note, Contact, Privacy and 404. Contact reuses EmailJS flow with name/email/subject/message required, minimum 10-character message, inline live-region errors, retained input on missing config/rejected send, no duplicate submission, reset only on success/email fallback. No invented availability/notes section.
- [ ] Run tests/type-check/build; check all routes/all baseline project URLs, unknown-case/project 404, PDF 200, app root/nested assets, direct entry/Back/keyboard. Mock EmailJS rejection without sending real email. State upstream/config limits.
- [ ] Commit `feat: add creative playground cases and personal routes` with exact task files.

### Task 4: Consent-gated strict analytics and upstream handoff

**Files:** analytics utility/consent, app wrapper, event sites/Privacy, tests, analytics setup doc. **Consumes:** exact event union above. **Produces:** safe trackEvent and privacy controls.
- [ ] Write failing tests: denied/unknown/server/missing or malformed IDs => no push; `/work/example/?email=secret#text` normalizes to `/work/example/`; thrown getItem => unknown, thrown setItem => false; invalid event/channel/slug rejected; arbitrary extra fields discarded. Mock browser/storage/dataLayer, never request Google.
- [ ] Run `yarn test`, expect absent module FAIL.

Minimum pure-check example (Node `node:assert/strict`):
```js
assert.equal(normalizePagePath('/work/example/?email=secret#text'), '/work/example/');
assert.equal(readConsent({ getItem() { throw new Error('blocked'); } }), 'unknown');
setAnalyticsConsent('declined');
assert.equal(trackEvent({ event: 'resume_download' }), false);
assert.deepEqual(window.dataLayer, []);
```

- [ ] Implement runtime allowlists, storage key `portfolio-analytics-consent`, memory fallback on blocked storage, validated `NEXT_PUBLIC_GTM_ID` and `NEXT_PUBLIC_GA4_MEASUREMENT_ID`. Basic opt-in loads one GTM script; no pre-consent noscript tracker. Router-ready initial accepted view and one per completed non-hash navigation, proper subscription cleanup, count revisits but not rerenders. Emit case arrival once; no replay of pre-consent clicks, no demo event.
- [ ] Wire allowlisted links/views; withdraw with GA measurement-disable flag before denial, suppress future events, clear accessible analytics cookies across path/domain variants and unsent custom events. Script removal alone is insufficient. Remove unconditional Vercel Analytics mount. Keep ad consent denied, equal accept/decline, Privacy change controls. Document automatic page views/enhanced/outbound collection disabled, sanitized page_location/referrer, GTM/GA4 setup and Preview/DebugView limits. Actual app first/repeat use requires upstream instrumentation, not launch/demo events.
- [ ] Run tests/type-check/build. Browser checks cover absent config/deny/accept/revoke/blocked storage, mid-page choice, route revisits/effect duplication and dataLayer privacy. Network shows no Google measurement before consent/after withdrawal; live delivery remains unverified without supplied IDs/container access.
- [ ] Commit `feat: add consented creative playground analytics` with exact paths.

### Task 5: Common-task evidence and review handoff

**Files:** `docs/review-creative-playground.md`, focused fixes only. **Consumes:** completed candidate. **Produces:** recorded evidence/local preview, no deployment.
- [ ] Run `yarn test`, `yarn type-check`, `yarn build`, and the verified supported lint command; existing `next lint` needs compatibility checking. Record exits, baseline/environment issues, no unrelated upgrades.
- [ ] DevTools-check all routes, themes, keyboard, reduced motion, 200% zoom, labels/focus, no overflow, demo states/safety, form errors, app assets, and consent network. Capture Home/case/Apps screenshots; disclose live email/analytics limits.
- [ ] Run same comparison tasks: identify experience in 30 seconds, read case, launch app, download PDF, contact. Document whether exploration strengthens trust rather than hiding these tasks, with screenshot paths/evidence.
- [ ] Run `git diff --check`, inspect private/app/deployment boundaries, rerun affected checks after fixes.
- [ ] Commit `docs: record creative playground review evidence`; provide local preview instructions. Do not merge/deploy/start other candidates.

## Plan review gate

This is a prepared plan, not an implementation. Review it and select execution in this worktree before product changes. Editorial Workshop is handled separately.
