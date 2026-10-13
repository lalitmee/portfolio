# Portfolio detail polish — design

Status: proposed; implementation is not authorized by this document alone.

Repository: `portfolio` (`https://github.com/lalitmee/portfolio.git`)
Worktree: `/home/lalitmee/Projects/Personal/Github/portfolio-worktrees/feat-ui-revamp`
Branch: `feat/ui-revamp`

## Intent

Make directional links and calls to action feel aligned, add a restrained animated underline to the site navigation, and give case-study sections small visual cues. Preserve the portfolio’s editorial style and current page content. Josh Comeau’s site is inspiration for thoughtful micro-interactions, not a visual template to copy.

## Findings this design addresses

- Tailwind Preflight sets SVGs to `display: block`. The active portfolio’s `.text-link` is inline, so a leading or trailing Material SVG is laid out on a separate line. This was reproduced on work/project detail back-links and About/404 forward links at 320px and 390px.
- Text arrow glyphs in inline-flex CTAs are separate flex items and sit slightly out of alignment with their labels. Button text itself did not wrap in the sampled home and project-detail CTAs at 320px or 390px; do not impose a global no-wrap rule based on `innerText` line breaks.
- The hosted Markdown Previewer is a separate repository and route target. Its inspected picker buttons align their icons and labels and intentionally wrap as a group on small screens. The reproduced break is on the portfolio’s `/projects/markdown-previewer/` case study, not the hosted app.

## Directional links and calls to action

- Keep inline text links naturally wrappable while rendering their Material SVG arrows inline with the text. Scope the rule to the active portfolio link treatment; do not globally override SVG display.
- Replace Unicode arrow glyphs used inside active-site CTA buttons—including the home CTAs and source/demo buttons on project details—with the already-installed Material `MdArrowOutward` icon. Align the icon and text as button contents, keep the visible label and destination unchanged, and mark decorative icons `aria-hidden`.
- Use the existing forward/back Material icons for directional text links and detail back-links. Keep work/project list-row arrows in their dedicated grid cell; they are not button icons.
- Do not apply `white-space: nowrap` globally. Labels may wrap naturally when space is genuinely constrained, without separating the icon from the button’s alignment.

## Header underline

- Replace the static active-link text decoration with a subtle CSS underline reveal using the existing palette. The active route remains underlined at rest; hover and `:focus-visible` reveal the same treatment for other links.
- Keep `aria-current="page"` as the route indicator, preserve a visible keyboard focus state, and disable underline movement under `prefers-reduced-motion`.
- Do not add JavaScript animation or copy Josh Comeau’s colors, artwork, or layout.

## Case-study section cues

- Add small Material icons beside existing section headings in `pages/work/[slug].tsx` and `pages/projects/[slug].tsx`; keep the heading text and document structure unchanged.
- Suggested mapping: work Context → `MdInfoOutline`, Contribution → `MdBuild`, Decisions → `MdTune`, Outcome → `MdTrendingUp`; project What it does → `MdLightbulbOutline`, Technologies → `MdCode`.
- Treat icons as decorative (`aria-hidden="true"`), style them consistently with the current section typography, and avoid emoji, new packages, or content changes.

## Brain record and repository boundary

- Update the existing repo-specific record `brain/repo/editorial-workshop/README.md` to identify repository `portfolio`, worktree `feat-ui-revamp`, and branch `feat/ui-revamp` as distinct values. Preserve its existing artifact links and no-deploy boundary; do not add secrets.
- This change is portfolio-only. Do not modify the separately hosted Markdown Previewer repository. If the user later requests independent work on that app, investigate and plan it as a separate repository task.
- Do not change analytics behavior, introduce placeholder IDs, add dependencies, rewrite page content, or deploy.

## Acceptance and verification

- At 320px, 390px, 760px, and desktop width, check home CTAs, project source/demo actions, row links, detail back-links, About, Contact fallback markup, and 404. Icon-bearing text links remain together in the line flow; CTA text and icon are vertically aligned; text wraps only when available width requires it; no horizontal overflow is introduced.
- On work and project detail pages, confirm each icon remains decorative and its heading remains the accessible section name.
- Check the header underline on hover, keyboard focus, and active route, including reduced motion and mobile navigation behavior.
- Run repository formatting, `yarn test`, `yarn type-check`, `yarn lint`, `yarn build`, and `git diff --check`. Use local Chrome DevTools at the viewport widths above; do not deploy or send analytics requests.
