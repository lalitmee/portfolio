# App stories and independent launches

Status: proposed; awaiting written-spec review. Product implementation, commits,
pushes, and deployment changes are not authorized by this document.

## Intent

Feature only HN Revamped on the homepage, retain all three tools in the app
directory, and give each tool a portfolio-owned detail page explaining its
purpose and origin. The independently deployed apps remain the place to use
the tools. Do not embed, rebuild, or proxy them through the portfolio.

## Scope and visitor flow

- `/`: feature HN Revamped with separate Read the story and Open app actions;
  retain Browse all apps.
- `/apps/`: list HN Revamped, Markdown Previewer, and JSON Assistant in that
  order. Each entry provides story and direct launch links.
- `/apps/hn-revamped/`, `/apps/markdown-preview/`, and
  `/apps/json-assistant/`: show portfolio story pages rather than upstream apps.
- Detail pages provide a title, concise introduction, screenshot, motivation,
  supported capabilities, noteworthy decisions where evidenced, and live-app
  and source links. Reuse the existing site shell and editorial styling.
- Replace directory-wide local-only/privacy claims with neutral app wording.
  Keep app-specific privacy statements only where verified.
- External launches use the existing new-tab external-link convention with
  appropriate relationship attributes and accessible action labels.

## Content evidence

Repository READMEs and inspected source may establish capabilities and technical
decisions, but not personal motivations. Ask Lalit for the origin of each tool
before publishing first-person stories. No invented anecdotes, usage metrics,
testimonials, or unsupported outcomes. Omit unsupported sections rather than
publishing placeholders. Obtain approved motivation copy before calling the
story content complete.

## Implementation direction

Reuse the existing static project-detail approach: local typed app content and
a statically generated `pages/apps/[slug].tsx` with explicit known slugs and
not-found behavior. Use the same app records for homepage selection, directory,
and detail pages. No CMS, database, live GitHub fetch, new dependency, or generic
content framework.

Direct launch destinations:

- HN Revamped: `https://hn-revamped.vercel.app/`.
- Markdown Previewer: `https://md-reader-lalit.vercel.app/`.
- JSON Assistant: `https://json-assistant-one.vercel.app/`.

The latter two are the current portfolio rewrite destinations; HN's destination
is listed in its repository metadata. Validate actual availability before
release. Source links must use verified repository identities.

Only direct app-launch actions emit the existing consent-gated `app_launch`
event. Reading a story must not count as launching an app. Preserve normal
page-view handling and do not add tracking to the upstream tools.

## Routing migration and upstream boundary

Remove the two external app rewrites from the portfolio's `next.config.js`.
Their exact root URLs intentionally change from launches to stories. Do not
redirect those roots away from their new story pages.

Before implementation, inspect old nested URL usage and upstream routing.
Preserve meaningful legacy nested paths with narrowly scoped redirects only
where the destination behavior is verified. Do not blindly redirect old asset
requests to app HTML or claim all bookmarks remain compatible. Record any
unpreserved paths in the implementation handoff.

Read-only inspection on 2026-10-25 found relative `base: './'` settings in both
Markdown Previewer and JSON Assistant, no portfolio-specific base path in HN's
Next configuration, and no app proxy in HN's checked-in Vercel configuration.
This supports a portfolio-only migration; it does not verify live dashboard
settings or deployment behavior. No upstream edits or deployment changes are
approved. If validation reveals one is necessary, stop and report it for
separate approval before making that change.

## Verification

- All three known story routes load directly and through navigation; unknown
  app slugs return 404.
- Homepage features only HN; directory includes all three.
- Story links stay in the portfolio; launch links reach verified deployments.
- Story navigation does not emit `app_launch`; actual launches retain consent
  behavior.
- Check screenshot layout, keyboard access, both themes, mobile sizing, and
  absence of nested interactive links.
- Run existing tests, type checking, formatting checks for changed files, and
  production build. Leave a small regression check for app records/routes and
  launch-versus-story semantics using existing test tooling.

## Approval handoff

Review this written design before creating the implementation plan. Resolve
personal-story copy and legacy nested-path handling during planning. No commits
or pushes without separate explicit approval.
