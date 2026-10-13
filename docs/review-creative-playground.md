# Creative Playground review

## Outcome

The portfolio keeps the requested tasks visible while making room for a small, clearly bounded Markdown example. Career evidence and case studies precede the optional demo; the full Markdown app is a separate, explicit launch. This exploration strengthens trust rather than hiding the work, résumé, or contact paths.

## Common tasks

- **Identify experience quickly:** the homepage states 8+ years and names Nykaa and Quartic before the case list and demo.
- **Read a case:** Work links lead to static case pages organized as Context, Contribution, Decisions, and Outcome.
- **Launch the app:** Apps links to `/apps/markdown-preview/`. The upstream route and its nested JavaScript/CSS assets returned 200; the app remains a separately maintained service.
- **Get the résumé:** the résumé link resolves to `public/Lalit_Kumar_Resume.pdf` (HTTP 200, `application/pdf`). The About page discloses that the PDF summary predates the current 8+ years copy.
- **Contact:** the form exposes required name, email, subject, and message fields and inline validation; absent EmailJS configuration leaves entries intact and offers the email fallback. A mocked rejected send also retains the entered values. No real email was sent.

## Browser and route checks

Checked the production build at `http://127.0.0.1:3034/` in the existing Chrome instance; port 3000 was not used. Home, Work, all three case pages, Projects, Apps, About, Contact, Privacy, all 15 legacy project-detail URLs, and the résumé returned 200. Unknown work/project slugs returned 404. The upstream app rewrite returned 200, as did its relative nested JS and CSS assets.

At 1440×1000, the homepage presents the proposition, experience, work evidence, demo, selected tools, and contact/resume paths. At 390×844 there is no horizontal overflow (document/body width 390); at a 720 CSS-pixel viewport representing 200% zoom from 1440px, document width was 705px and did not overflow. The shell has one main landmark. On mobile, Enter opens the menu and focuses its first link; Escape closes it and returns focus to the toggle. The focused toggle has a visible solid outline. Light and dark themes both render, and the dark choice survives reload.

The fixed Markdown examples select correctly: checklist renders a semantic list and table renders a semantic table with headers. Source appears as text, not injected HTML; selection works without animation. The full-tool link is present independently of the demo interaction.

Full-page screenshots, captured at a 1440×1000 viewport:

- [Home](review-assets/creative-playground/home.png)
- [Case study](review-assets/creative-playground/case.png)
- [Apps](review-assets/creative-playground/apps.png)

## Accessibility and privacy checks

The first Lighthouse snapshot found two accessibility defects: the demo eyebrow had 4.43:1 contrast against its blue panel, and the brand accessible name omitted visible “LK.”. Scoped the demo heading color to the ink token and included “LK.” in its accessible name. Added focused regression tests; both failed before the fixes and pass now. The post-fix Lighthouse snapshot reports Accessibility 100, Best Practices 100, SEO 100, Agentic Browsing 100, with 34 checks passed and none failed.

The stylesheet includes a `prefers-reduced-motion: reduce` rule; the demo and navigation do not require animation. This Chrome DevTools session did not provide an OS reduced-motion override, so reduced-motion behavior was source-inspected rather than browser-emulated.

Consent checks on the existing browser verified no Google script/request before choice or after acceptance/decline while measurement IDs were absent; choices and the blocked-storage in-memory fallback were checked in Task 4. There are no live GTM/GA IDs, so delivery and withdrawal after a real tag load were not exercised against Google. Automatic collection and sanitized path guidance are documented in `docs/analytics-setup.md`; upstream app analytics are outside this portfolio.

## Validation and limits

- `yarn test`: 13/13 pass, including visible brand-name and demo contrast-selector regressions.
- `yarn type-check`: pass.
- `yarn lint`: pass with existing warnings in legacy `components/Contact.tsx` (`console`) and Next.js `next lint` deprecation.
- `yarn build`: pass; 27 static pages generated.
- `git diff --check`: pass before this commit.
- EmailJS live delivery is unverified because no EmailJS configuration is present. No Google measurement IDs or container access were supplied. Nothing was deployed.
