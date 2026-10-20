# Portfolio motion and interaction — design

Status: proposed; awaiting written-spec approval. No implementation is authorized by this document alone.

Repository: `portfolio` (`https://github.com/lalitmee/portfolio.git`)
Worktree: `/home/lalitmee/Projects/Personal/Github/portfolio-worktrees/feat-ui-revamp`
Branch: `feat/ui-revamp`

## Intent

Make the portfolio feel more authored through restrained, consistent motion and give hiring teams one useful way to explore the engineer's judgment. Preserve the current editorial layout, content, routes, and palette. Josh W. Comeau's site is a reference for considered micro-interactions, not a template to copy.

## Approved direction

- Motion direction: **Quiet craft**. Apply small, purposeful responses to shared links, buttons, and action icons; do not add ambient spectacle.
- Audience: hiring teams.
- Interactive story: **Nykaa cart reliability**, reached from the existing Nykaa work row on the homepage.
- The interaction belongs on the Nykaa case-study page and presents three numbered disclosures: **The challenge**, **What I did and why**, and **The outcome**.
- The visitor should be able to inspect the narrative; it is not a cart simulator.

## Motion language

- Directional arrows glide a few pixels toward their direction on hover and keyboard focus. Text links may briefly reveal a restrained trailing chevron echo; buttons do not use the echo.
- Buttons get a slight hover lift and a distinct pressed state. Keep hit areas, text, and destinations unchanged; do not create layout shifts.
- Animate icons only when their control changes state (for example, theme or menu state). Do not animate static decorative icons.
- Preserve the existing active-navigation indicator and route transition. Use CSS for the new shared micro-interactions; keep the current Framer Motion usage for navigation and page transitions.
- No parallax, cursor-following, perpetual decorative motion, or copied artwork/colors/layout from the reference.
- Respect `prefers-reduced-motion`: remove movement and decorative echo transitions while preserving visible hover, focus, and pressed states. Hover styling must not be the only indication of an action on touch devices.

## Nykaa decision path

- On `/work/nykaa-cart-reliability/`, present three native `<details>` disclosures with useful `<summary>` labels and visible numbering.
- **The challenge** uses the existing case-study `context`: customer choices span product details, variants, and cart; inconsistent state harms predictability.
- **What I did and why** combines the existing `contribution` and `decisions`: product-variant drawer/refactor, cart merging across sessions, archived-product behavior, and the rationale for keeping variant/cart state aligned and treating archived products as a real state.
- **The outcome** uses the existing `outcome`: improvements focused on preserving customer intent and predictable shopping flows.
- Replace the four currently separate Context, Contribution, Decisions, and Outcome sections on this case only; do not repeat the same content in both static sections and the interaction. Other work case-study pages keep their current structure.
- Keep the existing homepage Nykaa work-row link as the entry point. Do not add a second competing CTA or alter the destination.
- Do not invent metrics, claim quantified impact, reproduce a production UI, or imply access to private screenshots. All copy must stay grounded in `data/caseStudies.ts`.

## Implementation boundaries

- Expected source files: `styles/globals.css`, `pages/work/[slug].tsx`; touch `pages/index.tsx` only if browser verification shows the existing Nykaa work-row link is not a clear entry point.
- Reuse installed icons and existing motion dependencies. Add no packages, new routes, analytics events, content systems, or generic animation abstractions.
- Preserve focus-visible styling, semantics, theme behavior, analytics consent, and all unrelated case-study content.
- This is local UI work only. Do not deploy, merge, or send analytics requests.
- Earlier shell/detail polish specs already cover icon alignment, navigation underline, and static section icons. This spec extends those with motion and the Nykaa interaction; it does not reopen or duplicate their requirements.

## Acceptance and verification

- On the home page and representative work/project/detail routes, verify arrow, button, and state-changing icon behavior on pointer hover, keyboard focus, and press without layout shifts or changed destinations.
- Verify reduced-motion removes movement/echo animation but retains visible interaction states.
- Verify the Nykaa page shows exactly the three disclosures with accurate existing content and no duplicate Context/Contribution/Decisions/Outcome sections. Confirm the other work case studies remain unchanged.
- Test the disclosure controls by keyboard and touch at mobile and desktop widths, in both themes; verify meaningful summary names and visible focus.
- Run `yarn test`, `yarn type-check`, `yarn lint`, `yarn build`, and `git diff --check`. Review the final diff to confirm only the intended portfolio UI and tests changed. Do not deploy.
