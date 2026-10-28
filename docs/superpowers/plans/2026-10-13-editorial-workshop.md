# Editorial Workshop Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking. Execution stays inline in this session; no agents for the other candidates.

**Goal:** Build a credible, personal, multi-page editorial portfolio with preserved tools and consented engagement measurement.
**Architecture:** Retain Pages Router and static local content. One shared shell owns landmarks, navigation, page metadata, and consent; page components own their content. GTM delivers GA4 only after opt-in; upstream app instrumentation is a separate documented handoff.
**Tech Stack:** Installed Next.js 15.5.7, React 19, TypeScript, Tailwind 3, next-themes, EmailJS, Node built-in tests, installed TypeScript compiler.
**Spec:** `docs/superpowers/specs/2026-10-13-editorial-workshop-design.md`

## Global Constraints

- Use 8+ years in site copy; do not silently rewrite the PDF, whose summary is stale.
- Keep Next.js 15 Pages Router, React, TypeScript, Tailwind, next-themes, and installed dependencies.
- No router migration, CMS, database, live GitHub aggregation, or new component framework.
- Canonical and Open Graph URLs use `https://www.lalitmee.com/` and each real route, replacing github.io metadata.
- Preserve the existing upstream rewrite, trailing slashes, and nested asset paths.
- Remove unsourced 10x orders, 60% improvements, 1M+ users, and 99.9% uptime. Omit numeric order impact until confirmed.
- GitHub is supporting evidence, not a complete identity. Private personality descriptions are not published copy.
- No public deployment until selection. Do not implement directions 2 or 3 here.

## Review Focus

- Old project title-derived URLs must still resolve after curation (Task 1 content check; Task 3 HTTP check).
- Restricted browser storage must not crash rendering or consent controls (Task 4 mocked-storage check).
- Consent accepted mid-page, navigation revisits, and React effect reruns must not double-send page views (Task 4 emitter/browser check).
- Withdrawal after GTM has already loaded must stop measurement, not merely hide a banner (Task 4 request check).
- Direct navigation, slow hydration, and 200% zoom must preserve readable content and usable navigation (Task 2/5 browser checks).

## File map and interfaces

- Modify `data/portfolio.json`: accurate identity/experience metadata and curated additions; retain existing project titles/URLs. Create `data/caseStudies.ts`: `CaseStudy = {slug: string; title: string; employer: string; period: string; summary: string; context: string; contribution: string[]; decisions: string[]; outcome: string}` and `caseStudies: CaseStudy[]`. Slugs: `nykaa-cart-reliability`, `nykaa-measurement-attribution`, `quartic-data-interfaces`.
- Create `components/SiteLayout.tsx`: default `SiteLayout({title, description, children}: {title: string; description: string; children: React.ReactNode})`; owns exactly one main. Rewrite `components/Navigation.tsx` and `components/Footer.tsx`; simplify `components/ThemeToggle.tsx`. Modify `_app.tsx`, `_document.tsx`, `styles/globals.css`, `tailwind.config.js` only where needed for the shell/font/tokens.
- Create `pages/work/index.tsx`, `pages/work/[slug].tsx`, `pages/projects/index.tsx`, `pages/apps/index.tsx`, `pages/about.tsx`, `pages/contact.tsx`, `pages/privacy.tsx`, `pages/404.tsx`; rewrite `pages/index.tsx`, restyle `pages/projects/[slug].tsx`, `components/Contact.tsx`. Page components all use SiteLayout; `_app.tsx` is a provider wrapper, not another main.
- Create `utils/analytics.ts`: `Consent = 'accepted' | 'declined' | 'unknown'`; `AnalyticsEvent = {event: 'page_view'; page_path: string} | {event: 'case_study_view'; case_slug: string} | {event: 'project_open'; project_slug: string; destination_kind: 'source' | 'demo' | 'detail'} | {event: 'resume_download'} | {event: 'contact_click'; channel: 'email' | 'github' | 'linkedin'} | {event: 'app_launch'; app_slug: string}`; `normalizePagePath(url: string): string`, `readConsent(storage: Pick<Storage, 'getItem'>): Consent`, `saveConsent(storage: Pick<Storage, 'setItem'>, choice: Consent): boolean`, `trackEvent(event: AnalyticsEvent): boolean`. Reconstruct allowlisted payloads at runtime; never spread arbitrary caller input.
- Create `components/AnalyticsConsent.tsx`: default `AnalyticsConsent(): React.ReactElement`; owns persisted consent, loader, route subscriptions, and visible accept/decline/change controls. Expose change controls on `/privacy/` through a normal settings button, not a second loader. Export `setAnalyticsConsent(choice: Consent): void` from `utils/analytics.ts` to update its in-memory gate at hydration/choice/withdrawal; `trackEvent` consults that gate, not storage on every click. It returns false on server, denied/unknown choice, missing valid configuration, or invalid payload.
- Create `tests/register.cjs` (test-only TypeScript require hook using installed `typescript.transpileModule`), `tests/content.test.cjs`, `tests/analytics.test.cjs`; add `test` script `node --require ./tests/register.cjs --test tests/*.test.cjs`. No new test dependency. Create `docs/analytics-setup.md` and `docs/review-editorial-workshop.md`.

### Task 1: Preserve content identity and establish an accurate evidence model

**Files:** `data/portfolio.json`, `data/caseStudies.ts`, `tests/register.cjs`, `tests/content.test.cjs`, `package.json`.
**Consumes:** existing `generateSlug(title: string): string`, résumé/README evidence. **Produces:** the CaseStudy interface/data above and stable legacy project list.

- [ ] Write the content test and minimal runner: snapshot all baseline `generateSlug(project.title)` values; assert every baseline slug remains, all slugs are unique, `personal.yearsOfExperience === '8+'`, and the three case slugs exactly match the list above. Assert curated projects include browse.nvim, cobalt2.nvim, codecompanion-spinners.nvim, markdown-previewer, dotfiles; no unverified numerical outcomes.
- [ ] Run `yarn test`; expect FAIL because case data/new curated entries/updated experience are absent. Record `yarn type-check`, `yarn build`, `yarn lint` baseline separately; install only from `yarn.lock` if dependencies are missing, without changing it. Record environment/network blockers, not false passes.
- [ ] Implement the exact case interface and evidence-backed prose; preserve every existing title used in slugs. Add real repository links for new curated projects, omit speculative demo links and metrics; update website/experience metadata, credit Cobalt2 adaptation, flag stale résumé in About copy later. Do not expose private research.
- [ ] Run `yarn test` and `yarn type-check`; expect content checks PASS and no new type errors. Review case prose against résumé/source evidence.
- [ ] Commit only this task's files: `git commit -m "feat: curate portfolio evidence and professional cases"` after staging their exact paths.

### Task 2: Ship the editorial shell and a real homepage

**Files:** shell/navigation/footer/theme files, `_app.tsx`, `_document.tsx`, globals/Tailwind as needed, `pages/index.tsx`.
**Consumes:** Task 1 data. **Produces:** SiteLayout interface above; route navigation and color tokens for all later pages.

- [ ] Before editing, reproduce current nested-main, hash-only navigation, splash delay, and mobile proposition ordering in DevTools; record failing acceptance observations. Test red can be browser evidence for layout, not a fabricated unit pass.
- [ ] Implement SiteLayout's single main, route-specific title/description/canonical/OG metadata; navigation links Home `/`, Work `/work/`, Projects `/projects/`, Apps `/apps/`, About `/about/`, Contact `/contact/`. Add skip link, active `aria-current`, mobile disclosure/Escape/focus restoration, simple theme toggle. Remove old theme-cookie bootstrap/customization from active shell and preserve next-themes preference.
- [ ] Build the homepage with headline “Thoughtful interfaces. Useful tools. Engineering that holds up.” and CTAs to Work/Contact, selected cases/tools and short career context. Use paper `#F7F4EC`, ink `#17202A`, cobalt `#1749C6`, ochre `#A66B00`; dark ink surfaces with accessible lighter blue. Keep Outfit body, native serif display stack, no extra font fetch/package. Replace active global decorative rules rather than layering new styles under old gradients. No loading delay, particles, percentages, or quote carousel.
- [ ] Run `yarn test`, `yarn type-check`, `yarn build`; verify homepage at 390x844 and 1440x1000, both themes, keyboard/Escape, 200% zoom, immediate content/one main, reduced motion, contrast and focus. Destination routes land in Task 3; don't claim those complete yet.
- [ ] Stage exact touched paths and commit `feat: build editorial portfolio shell and homepage`.

### Task 3: Complete professional, project, app, and personal routes

**Files:** route files listed above, existing project detail template, `components/Contact.tsx`, content tests as needed.
**Consumes:** SiteLayout, caseStudies, generateSlug, portfolio data. **Produces:** complete static route set and working contact/resumé/app links.

- [ ] Write/check failing route assertions against the running server: new routes should currently 404; retain baseline slug list in tests and assert case lookup rejects unknown slug. Record current contact error behavior and public PDF availability.
- [ ] Implement Work static paths using `fallback: false`, return `notFound: true` for missing cases; retain the same legacy project static path generation. Render context/contribution/decisions/outcome and honest external links; lead Projects with curated tools, preserve smaller historical archive. App directory links `/apps/markdown-preview/`; do not touch its existing rewrite in `next.config.js`.
- [ ] Implement About/career/mentoring/education/résumé, Contact, Privacy content, and 404. Restyle existing Contact validation/send flow, retaining name/email/subject/message requirements and 10-character message minimum. Use inline live-region errors, preserve values on failed/config-missing sends, disable duplicate submits, reset only on success; fall back to email. No availability claim. PDF remains unchanged and About notes its stale summary.
- [ ] Run tests/type-check/build, then serve production locally. Verify each route, every baseline project slug, unknown work/project 404, PDF 200, app root/nested asset loading, direct entry and Back navigation. Check missing EmailJS config and mocked send rejection preserve input; do not send real email without approval. Note upstream/network failures separately.
- [ ] Commit `feat: add portfolio cases tools and personal pages` with exact task paths.

### Task 4: Consent-gated GTM/GA4 with a strict event contract

**Files:** `utils/analytics.ts`, `components/AnalyticsConsent.tsx`, `_app.tsx`, clickable/view event call sites, Privacy page, `tests/analytics.test.cjs`, `docs/analytics-setup.md`.
**Consumes:** Task 3 routes and exact AnalyticsEvent union above. **Produces:** safe trackEvent, persistent controls, local event evidence and upstream handoff.

- [ ] Write failing tests: denied/unknown/server/invalid config => no push; `normalizePagePath('/work/example/?email=secret#text') === '/work/example/'`; readConsent throws storage => unknown; saveConsent throws => false; payload fields beyond the union are dropped; malformed slug/channel/event is rejected. Stub browser/dataLayer locally, never call Google in tests.
- [ ] Run `yarn test`; expect missing analytics module assertions to FAIL.

Minimum pure-check example for the test step (using Node's `node:assert/strict`):

```js
assert.equal(
  normalizePagePath('/work/example/?email=secret#text'),
  '/work/example/',
);
assert.equal(
  readConsent({
    getItem() {
      throw new Error('blocked');
    },
  }),
  'unknown',
);
setAnalyticsConsent('declined');
assert.equal(trackEvent({ event: 'resume_download' }), false);
assert.deepEqual(window.dataLayer, []);
```

- [ ] Implement runtime allowlists, safe storage key `portfolio-analytics-consent`, local consent fallback if storage fails, and validated `NEXT_PUBLIC_GTM_ID` / `NEXT_PUBLIC_GA4_MEASUREMENT_ID`. Configure basic consent before loading one GTM script; no noscript tracker before consent. Mount loader once after opt-in; subscribe/unsubscribe routeChangeComplete, wait for router readiness, emit one initial accepted view and one per completed non-hash navigation, allow revisits. Emit case view on case arrival, not every render. Do not replay pre-consent clicks.
- [ ] Wire only specified events. On withdrawal set GA's measurement-disable flag before consent denial, block subsequent emitter calls, clear accessible `_ga` cookies across applicable path/domain variants, and remove queued unsent custom events. Existing script removal alone is not revocation. Remove unconditional Vercel Analytics mounting so it does not bypass the policy. Keep ad consent denied. Document disabling automatic page views/enhanced measurement/automatic outbound collection, sanitized full page_location/referrer values, allowed event parameters, Preview/DebugView setup, cookie-cleanup limits, and upstream `app_first_use`/repeat-use handoff; app launch is not usage.
- [ ] Run tests/type-check/build and browser checks for missing config, denial, accept mid-page, effect reruns, revisits, withdrawal and storage blocking. Inspect network for no pre-consent/after-withdrawal measurement requests and dataLayer for one view per navigation/no personal content. Real GTM/GA4 Preview checks require supplied IDs and container access; mark live delivery unverified if unavailable.
- [ ] Commit `feat: add consented privacy-safe portfolio analytics` with exact task paths.

### Task 5: Final comparison evidence and handoff

**Files:** `docs/review-editorial-workshop.md`; fix only task-related defects in their owning files.
**Consumes:** completed candidate and acceptance contract. **Produces:** reproducible review record, not a deployment.

- [ ] Execute `yarn test`, `yarn type-check`, `yarn build`, and verified supported lint command; report command/exit status and distinguish baseline/tooling failures. Don't upgrade dependencies to disguise unrelated failures.
- [ ] In DevTools validate all routes at desktop/mobile, themes, 200% zoom, reduced motion, keyboard focus/navigation, privacy choices, form error states, tool rewrite, console errors and layout overflow. Capture representative Home, case, and Apps screenshots; identify live analytics/email limits explicitly.
- [ ] Run the common selection tasks: identify experience in 30 seconds, read a professional case, launch the app, download PDF, contact. Record routes, findings and screenshots in the review document; no self-awarded success without evidence.
- [ ] Run `git diff --check` and inspect the change list for accidental app/deployment/private-file changes; rerun affected checks after any fix.
- [ ] Commit `docs: record editorial workshop review evidence`. Present local preview instructions and evidence to Lalit. Do not merge, deploy, or start other worktrees.

## Plan review gate

This plan implements the approved spec but has not been executed. Lalit reviews this plan before product changes; execution remains inline here. The other worktrees have their own self-contained plans and belong to separate sessions.
