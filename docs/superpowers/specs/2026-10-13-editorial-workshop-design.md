# Editorial Workshop — portfolio redesign

Status: proposed; awaiting written-spec approval. No product implementation authorized by this document alone.
Workspace: `/home/lalitmee/Projects/Personal/Github/portfolio-worktrees/feat-ui-revamp`
Branch: `feat/ui-revamp`
Baseline: `961b6fa`.

## Intent and comparison contract

Build a multi-page personal site for engineering hiring managers, founders/consulting clients, and engineering peers. Make Lalit's 8+ years of engineering and breadth legible through real professional work, useful tools, and sustained open-source craft. Avoid the existing generic purple-gradient presentation. GitHub is supporting evidence, not a complete identity. Private descriptions of curiosity, growth, and ambition must not become published self-description.

Compare three independently implemented directions against the same content, routes, accessibility, and analytics contract. This workspace is direction 1, Editorial Workshop. Directions 2 and 3 belong to the user to execute separately. Do not merge all three or build a runtime theme-switching comparison system. No public deployment until selection.

## Visual design

- Warm paper background `#F7F4EC`, ink `#17202A`, cobalt `#1749C6`, and sparing ochre `#A66B00`. These are starting tokens; every actual foreground/background pairing must pass contrast checks. Dark mode uses ink surfaces and a lighter blue accent, not purple glow.
- Editorial typography: a restrained serif display face alongside readable sans-serif body text, with monospace reserved for labels and technical details. Use the existing font infrastructure and at most two font families; do not add a font package.
- Wide margins, deliberate line lengths, asymmetrical desktop composition, numbered section labels, structural rules. Mix open text, large feature rows, and compact lists rather than repeating glass cards.
- Homepage hero pairs a clear engineering proposition with a small portrait/identity block. Text and primary action appear before the portrait on mobile. Suggested headline: “Thoughtful interfaces. Useful tools. Engineering that holds up.” Supporting copy names Lalit, senior engineering experience, and product/developer-tool work without inventing specialties or impact.
- Static content appears immediately: no loading splash, floating technology logos, particles, gradient headline, custom cursor, or quotation carousel. Short feedback transitions only; respect reduced motion.
- Theme toggle is a normal accessible button, not a customization drawer. Light is the visual default, while a saved preference is respected.

## Routes and content hierarchy

- `/`: proposition and “Explore my work” / “Get in touch”; professional highlights; selected independent tools; brief career context; invitation to contact. No skill-percentage display or inflated statistic wall.
- `/work/`: professional work index, organized by engineering problem rather than employer-logo collection.
- `/work/[slug]/`: three initial case narratives: Nykaa product/cart reliability, Nykaa measurement/attribution integration, and Quartic complex data interfaces. Each contains context, personal contribution, decisions/trade-offs, and supported outcome. Include employer and dates. No confidential screenshots or architecture details. Omit unavailable evidence rather than generating it.
- `/projects/`: curated independent work: browse.nvim, cobalt2.nvim, codecompanion-spinners.nvim, markdown-previewer, and dotfiles. Distinguish maintained tools, adaptations, and personal configuration. Smaller historical archive can preserve existing projects without presenting coursework as lead evidence.
- `/projects/[slug]/`: keep every existing project URL valid; restyle the existing detail template and enrich selected entries only with source-backed content.
- `/apps/`: functional tool directory with the existing Markdown Previewer launch link, supported capabilities, and clear privacy boundaries. Do not invent more apps to fill a grid.
- `/apps/markdown-preview/`: preserve the existing upstream rewrite, trailing slashes, and nested asset paths. Do not rebuild or theme the external app in this repo.
- `/about/`: career chronology, practical areas of experience, mentoring, education, portrait, and résumé download. Use 8+ years in site copy, as requested; do not silently rewrite the PDF, whose summary is stale.
- `/contact/`: email, GitHub, LinkedIn, and existing contact form if its current configuration works. Never fabricate availability, testimonials, or client offerings. Form failures keep user input and offer email fallback.
- `/privacy/`: plain-language analytics/consent disclosure and a way to change the stored choice. No speculative blog/notes route.

## Source boundaries

Use `data/portfolio.json`, the existing résumé, and inspected repository READMEs as inputs. Professionally relevant facts: Nykaa variant drawer, cart merge, reliability, GTM/GA4 and attribution work; Quartic virtualized table interactions, LDAP admin integration, GraphQL/React work; KoineArth B2B/NFT interfaces and mentoring; Cognitive Clouds Angular/React delivery. These are experience evidence, not permission to disclose employer internals.

Remove unsourced 10x orders, 60% improvements, 1M+ users, and 99.9% uptime. The résumé's 3x orders claim is attribution-sensitive: omit numeric impact until Lalit confirms measurement, scope, and phrasing. GitHub star counts are dated snapshots, not live guarantees; prefer omission to a new fetch subsystem. Cobalt2 work must credit the original color scheme and describe Lalit's adaptations. Forks do not establish authorship. Private research notes are not public site content.

## Architecture and behavior

Keep Next.js 15 Pages Router, React, TypeScript, Tailwind, next-themes, and installed dependencies. No router migration, CMS, database, live GitHub aggregation, or new component framework. Use one shared site shell (navigation, footer, metadata), small reusable content components, and local typed case-study data. Retain project slug generation and static generation patterns where compatible.

Replace hash-only navigation with normal route links and an active-page indicator. Mobile navigation is an accessible disclosure with correct expanded state, Escape behavior, and predictable focus; keyboard users need not discover special shortcuts. Ensure exactly one main landmark per page rather than nesting the existing `_app.tsx` main around another main. Canonical and Open Graph URLs use `https://www.lalitmee.com/` and each real route, replacing github.io metadata. Provide clear not-found behavior for unknown slugs. External links and résumé work without analytics or JavaScript enhancements.

## GA4/GTM contract

- Use one GTM container to deliver GA4, not both GTM and a duplicate direct GA loader. Container ID is supplied through deployment configuration; absent/invalid configuration means no tracking and no broken page. Do not invent IDs or publish container changes.
- Default to basic opt-in analytics: no GTM/GA4 network loading before approval, equally available accept/decline actions, persistent preference, and withdrawal. Advertising remains disabled. Audit existing Vercel Analytics so it does not bypass the stated choice. Revocation suppresses future events and clears accessible analytics cookies; explain that already-sent data cannot be withdrawn locally.
- Allowlisted events: `page_view` on initial consented view and each completed route change exactly once; `case_study_view` with case slug; `project_open` with project slug/destination kind; `resume_download` for the click (not proof of a completed download); `contact_click` with channel; `app_launch` with app slug.
- Never send email addresses, contact-form data, filenames, document text, query strings, URL hashes, arbitrary external URLs, or user IDs. Normalize page locations/referrers and review GA4 automatic/enhanced collection to avoid URL or outbound-link leaks and duplicate views. No ad pixels or user fingerprinting.
- Actual `app_first_use` and repeat meaningful-use measurement require instrumentation in the upstream Markdown Previewer repository, which is outside this worktree. Document that handoff explicitly; an app launch is not app usage. After opt-in, GA4's standard returning-user reporting covers portfolio return visits without custom identity tracking.
- Supply setup/validation documentation for the GTM/GA4 owner. Browser dataLayer evidence validates the local emitter; live GA4 delivery remains unverified until a real container is configured and checked in Preview/DebugView.

## Acceptance and review

Every route loads directly and through navigation; all existing project slugs and the app rewrite still work. Test 390px mobile and 1440px desktop, keyboard-only navigation, both color modes, reduced motion, focus visibility, meaningful labels, 200% zoom, and no horizontal overflow. Mobile's first screen communicates identity and offers a primary action rather than a decorative portrait.

Run repository type-check and production build against a recorded baseline. Existing `lint` uses `next lint`, which needs compatibility checking with this Next version; do not claim a lint pass without execution. Leave small runnable regression checks for added route/content invariants and analytics consent/event logic, using available tooling instead of adding a framework by default. Test consent denied, accepted, revoked, missing configuration, and route changes for duplicates/data leaks. Check contact success/failure only where configuration permits; report limits.

Review all three directions with the same tasks: understand Lalit's work in 30 seconds, read a professional case, find and launch a tool, download the résumé, and contact him. Editorial Workshop succeeds if it is professionally credible yet personal, not a generic minimal template.

## Approval handoff

Review this spec before implementation planning. After written-spec approval, create `docs/superpowers/plans/2026-10-13-editorial-workshop.md`, review the plan, and select inline execution for this workspace. Do not implement directions 2 or 3 here. Current document preparation is not product implementation.
