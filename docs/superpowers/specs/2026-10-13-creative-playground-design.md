# Creative Playground — portfolio redesign

Status: proposed; awaiting written-spec approval. No product implementation authorized by this document alone.
Workspace: `/home/lalitmee/Projects/Personal/Github/portfolio-worktrees/creative-playground`
Branch: `feat/creative-playground`
Baseline: `961b6fa`.
Execution owner: Lalit / a separate session in this worktree.

## Intent and comparison contract

Build direction 3 of a three-way portfolio comparison: expressive layout and a small, genuinely functional interaction demonstrate web craft without burying professional experience. Audience includes engineering hiring managers, founders/consulting clients, and engineering peers. Make 8+ years of engineering visible through actual cases and tools. GitHub is incomplete evidence; private statements about personality, learning, and ambition are not public copy.

Use the same route/content/analytics and acceptance contracts as Editorial Workshop and Precision Console. These are independent design candidates, not three themes in one app. Do not implement other directions or merge their branches here. No public deployment until selection.

## Visual design

- Warm canvas `#FAF6ED`, charcoal `#20242B`, cobalt `#234BC4`, restrained burnt orange `#B54420`, and pale blue panels `#DCE8F4`. Use mostly neutral surfaces and purposeful solid accents, not rainbow cards. Validate actual text/focus/interactive contrast. Dark mode uses charcoal surfaces and lighter accent text, not purple glow.
- Large but responsive sans-serif headings, clear body text, strong typographic rhythm. Reuse existing Outfit/font infrastructure where practical. Labels can be monospace without making the site a terminal.
- Desktop: a deliberately asymmetrical composition mixing large professional features, narrow project lists, a compact interactive experiment, and generous space. Mobile: logical single-column reading, not a shrunken collage.
- Hero communicates name, senior experience, and proposition before the experiment. Suggested headline: “Serious engineering. Room to explore.” Primary actions are “Explore my work” / “Get in touch”; portrait is secondary. Curiosity is demonstrated, not declared through private labels.
- One bounded, useful demonstration: a small Markdown-to-preview interaction using fixed example snippets. A labelled selector toggles two or three curated snippets and renders their corresponding semantic previews. No new Markdown parser or upload flow: this is an honest demonstration with a link to the full Markdown Previewer, not a claim that the toy handles arbitrary Markdown. Treat input strings as text; never inject untrusted HTML.
- The demo is optional content below the proposition, reachable by keyboard and readable without animation. Selection state is indicated with text and programmatic state, not color alone. No drag requirement, auto-playing carousel, physics engine, WebGL, audio, custom cursor, or animation-driven navigation.
- Brief transitions may emphasize a selected example; respect reduced motion and never animate essential reading. No splash, particles, purple gradients, skill percentages, quotation carousel, or customization drawer. Light is default; respect saved theme preference.

## Routes and evidence

- `/`: identity/proposition/actions, professional highlights, bounded Markdown demonstration, selected independent work, career context, contact invitation. The experimental portion never displaces evidence of seniority.
- `/work/` and `/work/[slug]/`: Nykaa product/cart reliability, Nykaa measurement/attribution integration, Quartic complex data interfaces. Readable narratives contain employer/dates, context, contribution, decisions/trade-offs, supported outcome. Expressiveness must not turn cases into scroll-driven presentations. No invented confidential screenshots/diagrams.
- `/projects/` and existing `/projects/[slug]/`: feature browse.nvim, cobalt2.nvim, codecompanion-spinners.nvim, markdown-previewer, dotfiles. Identify adaptations and personal configuration accurately. Credit original Cobalt2 creators. Preserve every old slug; historical coursework is subordinate, not deleted for convenience.
- `/apps/`: useful-tool directory, with only existing working apps. Explain and launch Markdown Previewer, without inventing a gallery of nonexistent utilities.
- `/apps/markdown-preview/`: preserve upstream rewrite, trailing slashes, nested assets. Do not rebuild, inject instrumentation into, or theme the upstream app in this portfolio repo. The real route differs from the user's illustrative `markdown-previewer` spelling.
- `/about/`: career chronology (Nykaa, Quartic.ai, KoineArth, Cognitive Clouds), practical capabilities, mentoring, education, portrait, résumé. Site experience copy is 8+; PDF's stale 6+ summary is disclosed, not silently modified.
- `/contact/`: real email/social destinations and existing form if configured. Preserve entered fields on error and provide email fallback. Do not invent availability/client claims.
- `/privacy/`: analytics explanation and stored-choice controls. No speculative writing section.

Content comes from `data/portfolio.json`, résumé, and inspected READMEs. Remove unsupported 10x orders, 60% improvements, 1M+ users, 99.9% uptime. The résumé's 3x order claim also waits for confirmation of scope/measurement/attribution. No generated performance numbers, testimonials, star-count guarantees, or invented learning goals. Forks are not authored work. Private research remains private.

## Technical boundaries

Keep installed Next.js 15 Pages Router, React, TypeScript, Tailwind, next-themes, and available dependencies; no router migration, CMS, database, realtime GitHub fetch, experimental rendering engine, or extra UI framework. Shared shell handles navigation/footer/metadata, small content components handle views, local typed data holds cases. Reuse existing project slug/static-generation patterns. The demonstration is one local component with fixed trusted examples; no new app subsystem.

Replace hash-only nav with real route links and current-page state. Mobile disclosure supports keyboard, Escape, clear expanded state, predictable focus. Ensure one main landmark per page. Canonical/OG metadata uses `https://www.lalitmee.com/` plus the current route instead of github.io. Unknown slugs produce a clear not-found result. Links, résumé, and case content do not require interaction with the demo or analytics.

## GA4/GTM and privacy

- One GTM container delivers GA4; no direct duplicate GA loader. Use supplied deployment configuration, never guessed IDs. Missing/invalid ID disables tracking without affecting rendering. Do not publish remote container changes or deploy this candidate.
- Basic opt-in: Google tracking does not load before consent; accept and decline are equally accessible; preference persists and can be revoked. Advertising stays disabled. Existing Vercel Analytics must not bypass the declared choice. Withdrawal suppresses future events and clears accessible analytics cookies; already-sent data cannot be retracted by the browser.
- Allowlisted events: initial consented view/completed route `page_view` once; `case_study_view` with case slug, `project_open` with slug/destination kind, `resume_download` for link click only, `contact_click` with channel, `app_launch` with slug. The fixed example demo does not need its own engagement event in the first version.
- No form values, email addresses, filenames, document contents, query strings, hashes, user IDs, or arbitrary outbound URLs. Sanitize location/referrer and audit automatic/enhanced GA4 collection for duplicate views and URL/link leaks. No fingerprinting or ad pixels.
- True app first-use/repeat-use requires the upstream Markdown Previewer repository to emit meaningful events; document that separate handoff. Portfolio `app_launch` and demo toggles cannot stand in for real app use. Standard consented GA4 returning-user reporting covers portfolio return engagement.
- Deliver owner setup instructions and separate local dataLayer evidence from real GTM Preview/GA4 DebugView validation, which needs configured IDs/container access.

## Acceptance and comparison

Direct loads and navigation work for all routes, all legacy project slugs, and upstream app nested paths. Check 390px mobile and 1440px desktop, both themes, keyboard-only interaction, reduced motion, 200% zoom, focus, labels, no overflow. Demo selections yield the right accessible semantic preview; a full-tool launch remains available without trying the demo. No safety claim implies arbitrary HTML parsing.

Record baseline, run type-check and production build. Existing `next lint` script requires compatibility verification; do not report unexecuted passes. Leave small runnable checks for added route/content invariants, demo selection mappings, and analytics consent/event branches using available tooling, no new test framework by default. Validate denied/accepted/revoked consent, missing tracking config, route-event duplication, private payload absence, and form failures where configured. Clearly report external checks that cannot run.

Compare all candidates with the same tasks: understand Lalit's experience in 30 seconds, read a case, find/launch a tool, download résumé, contact him. Creative Playground succeeds if exploration strengthens trust; it fails if decoration slows or hides these tasks.

## Approval handoff

After written-spec approval, create `docs/superpowers/plans/2026-10-13-creative-playground.md`, obtain plan review/execution selection, and implement only here. No product code or implementation plan exists at this stage.
