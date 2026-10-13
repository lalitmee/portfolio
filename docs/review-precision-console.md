# Precision Console review evidence

## Candidate and preview

- Candidate before this review: `7bef34f` (`feat: add consented precision console analytics`).
- Preview: `http://localhost:3001/`, served from the production build with Next.js 15.5.7. Port 3000 belongs to an unrelated server and was not stopped, restarted, or otherwise touched.
- Reproduce locally: run `yarn install --frozen-lockfile`, `yarn build`, then `yarn start --port 3001`. If 3001 is occupied, select another free port; do not stop another process to make room.

## Automated checks

- `yarn test`: exit 0; 18/18 passed.
- `yarn type-check`: exit 0 (`tsc --noEmit`).
- `yarn lint`: exit 0. `next lint` is supported here but deprecated for Next 16; it reports two existing `no-console` warnings in legacy `components/Contact.tsx` (lines 119 and 141).
- `yarn build`: exit 0; Next.js 15.5.7 generated all 27 pages, including static work cases and all 15 project slugs. Existing warnings: the same two legacy console statements and Browserslist data 13 months old.
- `git diff --check`: exit 0 with no whitespace errors.

The Node test runner emits a Node `DEP0169` warning from a dependency using `url.parse()`. No dependency upgrades were made as part of this review.

## Routes and visitor tasks

Node `fetch` checks against the local production server returned 200 for the home, Work, Projects, Apps, About, Contact, and Privacy routes; all three case pages; and all 15 project-detail slugs. An unknown case returned 404 and the résumé PDF returned 200. `/apps/markdown-preview/` returned the existing upstream app, and its discovered JavaScript and CSS assets under `/apps/markdown-preview/assets/` both returned 200.

- **Identify experience within 30 seconds:** The first screen states 8+ years, product reliability, measurement systems, and developer tools, with Work and Contact actions.
- **Read a case:** Work lists three cases; each detail page leads with employer/date and summary, then Context, Contribution, Decisions, and Outcome, with a contents list on wide screens.
- **Find and launch a tool:** Apps is a plain-language route and presents the existing Markdown Previewer with a direct launch link. The nested route and assets remain functional.
- **Download résumé:** About includes a direct PDF download and clearly flags its stale 6+ years summary.
- **Contact:** Contact offers a required, labeled form and direct email/social links. With EmailJS configuration absent, submitting a valid preview-only form displayed an inline polite error and preserved every field. No message was sent.

The design remains approachable to non-engineers: the proposition, case structure, app label, and actions use ordinary language; technical terms appear as supporting evidence rather than required navigation or a simulated command interface.

## Browser and privacy checks

- Captured dark desktop pages at 1440×1000 and mobile at 390×844. At 390px the document remained 390px wide, with one main landmark and normal mobile navigation. At a 720×500 viewport (the 1440px desktop width at a 200% zoom-equivalent CSS width), the document was 705px wide with no horizontal overflow and the navigation reflowed. The browser emulator clamps the 195px mobile viewport to a 245px CSS `innerWidth`; therefore exact 200% zoom on the 390px mobile layout was not verified.
- Verified dark and light themes, including a saved light preference surviving reload. The `prefers-reduced-motion` override exists in the stylesheet; the available browser control did not emulate the OS reduced-motion preference, so the media-query behavior was not observed in a reduced-motion browser session.
- Measured theme text/focus palette combinations previously: the lowest recorded text contrast was 4.60:1 (light muted text); other tested light combinations were 5.06:1 and 5.39:1, and tested dark combinations ranged from 8.08:1 to 13.32:1.
- Keyboard checks exposed the skip link, route links, and theme control. The mobile navigation opened with an expanded state; Escape closed it and restored focus to the trigger. Contact inputs expose associated accessible names, required state, and a polite status region. The consent choices precede the skip link in tab order, so keyboard users encounter consent controls first.
- A fresh no-consent page had no `dataLayer`, GTM script, or Google requests. The current environment has no real EmailJS, GTM, or GA4 configuration. Task 4 separately verified accept/decline/withdrawal and route event counts using syntactically valid fake IDs in isolated browser contexts; no real messages were sent and no live GA4 delivery is claimed. Withdrawal blocked future events and Google traffic in that local test.

### Screenshots

- Home (dark): [`docs/review-assets/precision-console/home-dark.png`](review-assets/precision-console/home-dark.png)
- Nykaa cart case (dark): [`docs/review-assets/precision-console/case-nykaa-cart.png`](review-assets/precision-console/case-nykaa-cart.png)
- Apps (dark): [`docs/review-assets/precision-console/apps.png`](review-assets/precision-console/apps.png)

## Limits

Live EmailJS delivery and real GTM/GA4 tag configuration remain unverified because this worktree has no service credentials or container access. Exact mobile 200% browser zoom and OS-level reduced-motion emulation were not available in the browser controls used. No deployment, external analytics configuration, merge, or push was performed.
