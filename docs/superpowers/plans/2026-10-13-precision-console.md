# Precision Console Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans or superpowers:subagent-driven-development to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking. Lalit selects execution in this separate worktree; no implementation is requested from the Editorial Workshop session.

**Goal:** Build a technically precise, approachable multi-page portfolio without a fake terminal or inaccessible density.
**Architecture:** Keep Pages Router and local static evidence. A shared shell owns navigation, metadata, consent and landmarks; normal pages expose professional cases and functional tools. GTM delivers GA4 only after opt-in, with upstream app usage explicitly outside this repo.
**Tech Stack:** Next.js 15.5.7, React 19, installed TypeScript/Tailwind/next-themes/EmailJS, Node built-in tests.
**Spec:** `docs/superpowers/specs/2026-10-13-precision-console-design.md`

## Global Constraints

- Site copy uses 8+ years; do not silently edit the PDF.
- Keep the installed Next.js 15 Pages Router, React, TypeScript, Tailwind, next-themes, and existing component libraries.
- No App Router migration, CMS, database, live GitHub fetching, command system, or new UI framework.
- Canonical/OG URLs use `https://www.lalitmee.com/` plus each route, not the old github.io URL.
- Preserve the existing upstream rewrite and nested assets; actual route name is `markdown-preview`, not `markdown-previewer`.
- Remove unsupported 10x orders, 60% gains, 1M+ users, and 99.9% uptime. Omit numerical order claims until confirmed.
- Never turn private research/personality notes into public prose. No public deployment until selection.
- Work only in `/home/lalitmee/Projects/Personal/Github/portfolio-worktrees/precision-console` on `feat/precision-console`.

## Review Focus

- Legacy project URLs survive curation (Task 1 slug test; Task 3 route verification).
- Technical density must reflow at mobile width and 200% zoom (Task 2/5 browser checks).
- Storage access failures must not break rendering/consent (Task 4 mock test).
- Mid-page consent, React effects, and revisited routes must not duplicate measurement (Task 4 browser test).
- Previously loaded Google scripts must not keep sending after withdrawal (Task 4 network check).

## File map and interfaces

- `data/portfolio.json`: update truthful identity/metadata, add real curated entries, retain all existing project titles. Create `data/caseStudies.ts`: `CaseStudy = {slug: string; title: string; employer: string; period: string; summary: string; context: string; contribution: string[]; decisions: string[]; outcome: string}` and exported `caseStudies: CaseStudy[]`. Exact slugs: `nykaa-cart-reliability`, `nykaa-measurement-attribution`, `quartic-data-interfaces`.
- Create `components/SiteLayout.tsx`: default `SiteLayout({title, description, children}: {title: string; description: string; children: React.ReactNode})`, owning one main. Rewrite Navigation/Footer, simplify ThemeToggle, adapt `_app.tsx`, `_document.tsx`, globals/Tailwind only as needed. `_app.tsx` owns providers, not a main around page mains.
- Create `pages/work/index.tsx`, `pages/work/[slug].tsx`, `pages/projects/index.tsx`, `pages/apps/index.tsx`, `pages/about.tsx`, `pages/contact.tsx`, `pages/privacy.tsx`, `pages/404.tsx`; rewrite `pages/index.tsx`, restyle `pages/projects/[slug].tsx` and Contact. All pages use SiteLayout.
- Create `utils/analytics.ts`: `Consent = 'accepted' | 'declined' | 'unknown'`; `AnalyticsEvent = {event: 'page_view'; page_path: string} | {event: 'case_study_view'; case_slug: string} | {event: 'project_open'; project_slug: string; destination_kind: 'source' | 'demo' | 'detail'} | {event: 'resume_download'} | {event: 'contact_click'; channel: 'email' | 'github' | 'linkedin'} | {event: 'app_launch'; app_slug: string}`. Functions: `normalizePagePath(url: string): string`, `readConsent(storage: Pick<Storage, 'getItem'>): Consent`, `saveConsent(storage: Pick<Storage, 'setItem'>, choice: Consent): boolean`, `trackEvent(event: AnalyticsEvent): boolean`.
- Create `components/AnalyticsConsent.tsx`, default `AnalyticsConsent(): React.ReactElement`, to own loader, consent and route lifecycle; Privacy exposes its settings, not another loader. Export `setAnalyticsConsent(choice: Consent): void` from `utils/analytics.ts`; component updates this in-memory gate at hydration/choice/withdrawal and trackEvent consults it, not storage per click. Create `tests/register.cjs`, `tests/content.test.cjs`, `tests/analytics.test.cjs`; test hook uses installed `typescript.transpileModule` for pure TypeScript modules. Add package test script `node --require ./tests/register.cjs --test tests/*.test.cjs`. No testing dependency.
- Create `docs/analytics-setup.md`, `docs/review-precision-console.md`. No files outside this worktree.

### Task 1: Truthful content and stable slugs

**Files:** data files, test runner/content tests, package.json. **Consumes:** existing `generateSlug(title: string): string`, résumé and repository evidence. **Produces:** CaseStudy interface/data above, preserved projects.
- [ ] Write failing assertions for experience `'8+'`, all three exact case slugs, unique slugs, retention of every baseline title-derived project slug, and curated browse.nvim/cobalt2.nvim/codecompanion-spinners.nvim/markdown-previewer/dotfiles. Reject unsupported outcome numbers; snapshot the baseline before edits.
- [ ] Run `yarn test` expecting missing case/new-content FAIL. Record `yarn type-check`, `yarn build`, `yarn lint` baseline; install from existing yarn.lock only if needed. Record blockers without changing dependency versions.
- [ ] Implement typed case data and truthful copy; retain old titles and valid repository links, credit Cobalt2 adaptation, omit unverified numerical impact/star guarantees/availability. Update website and experience fields; do not modify the PDF or publish private context.
- [ ] Run `yarn test` and `yarn type-check`, expect PASS/no new type failures; source-check prose.
- [ ] Stage exact task files; commit `feat: curate precision console portfolio evidence`.

### Task 2: Accessible precision shell and homepage

**Files:** SiteLayout/navigation/footer/theme, app/document wrappers, globals/Tailwind as needed, homepage. **Consumes:** Task 1 content. **Produces:** shell API above, route rail, coherent mobile navigation.
- [ ] Record failing baseline in DevTools: hash-only nav, nested mains, splash, mobile portrait before proposition. Record intended small-screen/zoom acceptance failures before layout replacement.
- [ ] Implement one main, skip link, route-specific metadata, nav Home/Work/Projects/Apps/About/Contact, active aria-current, mobile disclosure with Escape/focus restoration. Desktop route rail is structural, not an overlay on reading content. Remove old theme-cookie/customization bootstrap from active shell and preserve next-themes saved preference; no mandatory shortcuts/command palette.
- [ ] Build homepage headline “Reliable products. Sharper tools. Clear engineering.”, Work/Contact CTAs, featured professional case, compact tool index and career summary. Default dark `#111820`, surface `#1A2632`, text `#E8EEF4`, accent `#78B9F2`, sparing `#E4B45D`; light uses near-white/ink. Use Outfit body/headings, native monospace labels only. Replace active gradient/decorative CSS. No pretend status, activity graph, terminal, percentages, or splash.
- [ ] Run tests/type-check/build. Check 390x844 and 1440x1000, both themes, 200% zoom, readable route rail reflow, keyboard navigation, Escape/focus, one main, immediate content, reduced motion and contrast. Later destinations are Task 3.
- [ ] Stage exact touched files; commit `feat: build precision console shell and homepage`.

### Task 3: Real case, project, tool and personal routes

**Files:** route set above, project detail, Contact and content tests. **Consumes:** shell, cases, baseline generateSlug. **Produces:** complete static site routes with preserved tool rewrite.
- [ ] Record new routes currently returning 404; assert missing case slug has no data and all existing slug paths remain in content tests. Check contact error and PDF baseline.
- [ ] Implement static Work paths with fallback false/notFound on missing data; keep every original project slug/static generation. Cases expose readable context/contribution/decisions/outcome and optional wide-screen contents links. Curate projects, subordinate historical archive, expose real source/demo links. Apps launches `/apps/markdown-preview/`; keep next.config.js rewrite intact.
- [ ] Implement About chronology/skills without percentages/mentoring/education/résumé; note stale PDF summary. Contact uses configured EmailJS only, keeps existing required name/email/subject/message and 10-character message minimum, preserves input on missing configuration/rejected send, inline live-region errors/email fallback, no double submit. Build Privacy disclosure and useful 404; no invented availability or notes section.
- [ ] Run tests/type-check/build and local production HTTP/browser checks for all routes, all baseline project slugs, unknown-slug 404, PDF 200, app nested assets, direct entry/Back and keyboard. Mock EmailJS rejection without sending real mail; document upstream/config limits.
- [ ] Commit `feat: add precision console cases and personal routes` after staging exact task paths.

### Task 4: Privacy-safe GTM/GA4 and owner handoff

**Files:** analytics utility/consent component, app wrapper, events/Privacy page, analytics tests, analytics setup doc. **Consumes:** exact event union above. **Produces:** safe gated tracking and documented upstream limit.
- [ ] Write failing tests: unknown/declined/server/missing or malformed IDs => no dataLayer push; normalized `/work/example/?email=secret#text` => `/work/example/`; thrown getItem => unknown, thrown setItem => false; unknown events/invalid slugs/channels rejected; extra fields dropped. Mock browser/storage/dataLayer, no Google calls.
- [ ] Run `yarn test`, expect missing analytics implementation FAIL.

Minimum pure-check example (Node `node:assert/strict`):
```js
assert.equal(normalizePagePath('/work/example/?email=secret#text'), '/work/example/');
assert.equal(readConsent({ getItem() { throw new Error('blocked'); } }), 'unknown');
setAnalyticsConsent('declined');
assert.equal(trackEvent({ event: 'resume_download' }), false);
assert.deepEqual(window.dataLayer, []);
```

- [ ] Implement runtime payload reconstruction and storage key `portfolio-analytics-consent`, memory fallback for blocked storage, validated `NEXT_PUBLIC_GTM_ID` / `NEXT_PUBLIC_GA4_MEASUREMENT_ID`. One loader after basic opt-in; no pre-consent noscript tracker. Correctly clean router subscriptions, wait for router readiness, one initial accepted view and one per completed non-hash navigation; revisits count, rerenders do not. Case view emits only on case arrival; no replay of old clicks.
- [ ] Add allowlisted link events; withdraw by setting GA measurement-disable flag before denied consent, blocking emitters, clearing accessible analytics cookies/path/domain variants and unsent custom queue. Removing a script alone is insufficient. Remove unconditional Vercel Analytics mount. Keep advertising denied; Privacy has equal accept/decline and change choice. Document disabling automatic page views/enhanced/outbound collection, sanitized page_location/referrer, GTM triggers/GA4 parameters and Preview/DebugView. App first/repeat meaningful use belongs to upstream app; no fake app-use event from a launch.
- [ ] Run tests/type-check/build; inspect missing config, deny/accept/revoke, blocked storage, mid-page consent, rerender/revisit event counts and personal-data absence. Network must have no Google measurement before consent or after withdrawal. Mark live GA delivery unverified absent real IDs/container access.
- [ ] Commit `feat: add consented precision console analytics` with exact task files.

### Task 5: Comparable validation and handoff

**Files:** `docs/review-precision-console.md`, task-related fixes only. **Consumes:** completed candidate. **Produces:** evidence and local preview instructions.
- [ ] Run tests/type-check/build, verify actual lint support (existing script is `next lint`), record exits and baseline/environment limits, do not upgrade unrelated dependencies.
- [ ] Check all routes, keyboard, themes, reduced motion, 200% zoom, focus/labels, mobile reading density, form errors, app nested paths and consent network in DevTools. Capture Home/case/Apps screenshots; report real email/GA configuration limits.
- [ ] Record common tasks: identify experience in 30 seconds, read case, find/launch app, download résumé, contact. Does precision remain approachable to non-engineers? Put findings and screenshot paths in review document.
- [ ] Run `git diff --check`, review touched paths/privacy/deployment boundaries, rerun affected checks after fixes.
- [ ] Commit `docs: record precision console review evidence`; present local preview. Do not merge/deploy/start other candidates.

## Plan review gate

This is a prepared plan, not an executed implementation. Review it and select execution in this worktree before product changes. Editorial Workshop is being handled separately.
