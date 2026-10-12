# Precision Console — portfolio redesign

Status: proposed; awaiting written-spec approval. No product implementation authorized by this document alone.
Workspace: `/home/lalitmee/Projects/Personal/Github/portfolio-worktrees/precision-console`
Branch: `feat/precision-console`
Baseline: `961b6fa`.
Execution owner: Lalit / a separate session in this worktree.

## Intent and comparison contract

Build direction 2 of a three-way portfolio comparison: an exact, technically fluent, approachable workspace. Audience includes hiring managers, founders/consulting clients, and engineering peers. Show 8+ years of engineering through real decisions, professional experience, useful tools, and sustained craft. GitHub is partial evidence; private statements about learning, ambition, and personality are design context, not published copy.

This is a multi-page site, not a terminal simulator or one-page résumé. Compare the same routes, content, analytics, and visitor tasks as Editorial Workshop and Creative Playground. Do not implement the other directions here, merge their branches, or introduce a runtime variation framework. No public deployment until selection.

## Visual design

- Default dark ink canvas `#111820`, raised surface `#1A2632`, readable text `#E8EEF4`, cool blue `#78B9F2`, restrained warm accent `#E4B45D`. Light mode uses a near-white canvas and dark ink. Treat these as initial tokens; validate actual text/focus/interactive contrast.
- Readable sans-serif body and headings; monospace metadata only. Existing Outfit/font infrastructure can be reused. Avoid code-font paragraphs, tiny labels, neon green hacker styling, or fake command prompts.
- Desktop: a compact route rail and structured main pane with generous reading width. Mobile: normal top navigation/disclosure, no squeezed sidebar. Route labels remain plain language: Work, Projects, Apps, About, Contact.
- Homepage resembles a well-designed engineering workspace: identity/proposition, a featured professional case, a compact tool index, and career context. Suggested headline: “Reliable products. Sharper tools. Clear engineering.” It must read as a human portfolio, not an infrastructure status dashboard.
- Case studies use a scannable problem/decision/outcome outline and optional sticky on-page contents on wide screens. Project rows expose purpose, contribution, maintenance context, and genuine links instead of decorative metric cards.
- Hover/focus reveals may clarify a row but never conceal its only action. All navigation is clickable and keyboard-operable. Do not add a command palette, mandatory keyboard shortcuts, fake uptime, activity graphs, or simulated terminal output.
- No splash, particles, purple gradients, custom cursor, skill percentages, quotation carousel, or theme customization drawer. Subtle state transitions respect reduced motion. Saved color preference overrides the dark design default.

## Routes and evidence

- `/`: immediate proposition, “Explore my work” / “Get in touch”, selected professional case, compact tool index, career summary. Text precedes portrait on mobile.
- `/work/` and `/work/[slug]/`: three initial cases covering Nykaa product/cart reliability, Nykaa measurement/attribution integration, and Quartic complex data interfaces. Include employer/date, context, personal contribution, decisions/trade-offs, and substantiated outcome. Do not invent confidential diagrams, screenshots, or results.
- `/projects/` and existing `/projects/[slug]/`: curate browse.nvim, cobalt2.nvim, codecompanion-spinners.nvim, markdown-previewer, and dotfiles; keep every existing project slug working. Coursework can live in a smaller archive, not the first evidence of seniority. Credit original Cobalt2 authorship and describe the adaptation accurately.
- `/apps/`: an honest functional app directory; launch the existing Markdown Previewer. Do not invent apps to populate a dashboard.
- `/apps/markdown-preview/`: preserve the existing upstream rewrite and nested assets; actual route name is `markdown-preview`, not `markdown-previewer`. Do not rebuild the app in this repository.
- `/about/`: career chronology (Nykaa, Quartic.ai, KoineArth, Cognitive Clouds), practical capabilities, mentoring, education, résumé. Site copy uses 8+ years; note the résumé's stale 6+ summary without silently editing the PDF.
- `/contact/`: working email/social links and existing form where configured; no invented availability. Preserve form input on failure and offer email fallback.
- `/privacy/`: analytics disclosure and persistent consent controls. No speculative blog or notes section.

Use `data/portfolio.json`, résumé, and repository READMEs. Remove unsupported 10x orders, 60% gains, 1M+ users, and 99.9% uptime. Omit even the résumé's 3x orders figure until Lalit confirms measurement and attribution. Do not fabricate new results. Prefer no star counts to undated/live claims. Forks do not prove contribution. Never turn private research/personality notes into public prose.

## Technical boundaries

Keep the installed Next.js 15 Pages Router, React, TypeScript, Tailwind, next-themes, and existing component libraries. No App Router migration, CMS, database, live GitHub fetching, command system, or new UI framework. Implement a shared site shell, small content components, and local typed case data; reuse slug/static-generation patterns. Existing files include `pages/index.tsx`, `pages/_app.tsx`, `pages/projects/[slug].tsx`, `components/Navigation.tsx`, `styles/globals.css`, and `next.config.js`.

Replace hash-only navigation with route links/current-page state; mobile disclosure supports Escape, clear expanded state, and predictable focus. Ensure one main landmark per page. Canonical/OG URLs use `https://www.lalitmee.com/` plus each route, not the old github.io URL. Unknown project/case slugs return a clear not-found state. Ordinary links and the résumé remain usable independently of analytics.

## GA4/GTM and privacy

- One GTM container delivers GA4; do not duplicate it with direct GA loading. Real container ID comes from configuration. Missing/invalid ID leaves the site functional and untracked. No remote container publication or invented credentials.
- Basic opt-in: no Google tracking loads before accept; equally accessible accept/decline, stored choice, and withdrawal. Advertising remains disabled. Ensure existing Vercel Analytics does not bypass the declared choice. Revocation blocks future events and clears accessible analytics cookies; previously sent data is not locally retractable.
- Allowlisted events: one `page_view` per initial consented view/completed route transition; `case_study_view` (case slug), `project_open` (project slug/destination kind), `resume_download` (link click only), `contact_click` (channel), `app_launch` (app slug).
- No emails, form fields, filenames, document text, user IDs, arbitrary external URLs, query strings, or hashes in events. Sanitize locations/referrers and review GA4 automatic/enhanced tracking for duplicate views and URL/link leaks. No ad pixels, fingerprinting, or custom identification.
- Actual app first meaningful use/repeat use needs upstream app instrumentation outside this repo. Document the handoff; never claim `app_launch` measures use. GA4 consented returning-user reporting is sufficient for portfolio return engagement.
- Deliver GTM trigger/GA4 setup instructions and validation limits. Local dataLayer checks are not proof of live GA delivery; real configuration requires Preview/DebugView verification.

## Acceptance and comparison

Direct entry and navigation work for every route; all legacy project URLs and app nested paths survive. Check desktop 1440px and mobile 390px, both themes, keyboard-only use, reduced motion, 200% zoom, focus, labels, and no horizontal overflow. Small-screen content must remain readable rather than compressing desktop density.

Record baseline and run type-check/production build. The existing `lint` script calls `next lint`; verify compatibility before relying on it. Add small runnable checks for added content/route invariants and consent/event branching without installing a testing framework by default. Validate denied/accepted/revoked consent, absent tracking config, duplicate route views, payload privacy, and form error preservation where configured. Report unavailable external-service checks.

Use the same review tasks across directions: identify Lalit's experience in 30 seconds, read a case, find/launch a tool, download résumé, contact him. Precision Console succeeds if the technical clarity still welcomes non-engineers; it fails if it requires understanding a pretend command interface.

## Approval handoff

After written-spec approval, create `docs/superpowers/plans/2026-10-13-precision-console.md`, obtain plan review/execution selection, and implement only in this worktree. No implementation plan or product code has been created at this stage.
