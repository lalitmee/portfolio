# Persistent navigation and mobile overlay — design

Status: proposed; implementation requires approval of this written design and its implementation plan.

Repository: `portfolio` (`https://github.com/lalitmee/portfolio.git`)
Worktree: `/home/lalitmee/Projects/Personal/Github/portfolio-worktrees/feat-ui-revamp`
Branch: `feat/ui-revamp`

## Intent

Refine the site navigation after review of the mobile screenshots: make the menu control circular, remove the awkward full-row mobile underline, show mobile navigation as an overlay, and animate the active desktop indicator traveling between routes. Use restrained translucency only where it serves the navigation; do not apply a broad liquid-glass treatment to the editorial content.

## Findings

- The mobile menu button is currently 56×40px while the theme button is 40×40px; the 16px menu SVG makes the control read as a pill rather than a circular icon button.
- The open mobile active underline spans the full 358px row and sits below its border; the final link border plus header border adds another separator.
- The desktop navigation currently underlines hovered and focused links, contrary to the desired interaction. The active underline is CSS-local and does not travel.
- `Navigation` is rendered inside each page’s `SiteLayout`; route changes remount it. A shared traveling indicator therefore needs a persistent navigation instance in the Pages Router shell.
- The sticky header already uses a 94%-opaque paper background and 12px backdrop blur. Additional strong glass effects across content would conflict with the existing editorial palette and introduce contrast/performance costs.

## Shared shell and desktop indicator

- Render one persistent `Navigation` from `pages/_app.tsx`; keep one skip link before it, one main landmark per route, existing metadata, footer, and route-focus behavior. Remove the duplicate navigation/skip-link placement from `SiteLayout` without changing route content.
- On desktop, do not reveal an underline on hover. Keep the active route indicated at rest. When client-side navigation changes the active item, animate one 1px ochre indicator from the previous item’s bounds to the new item’s bounds. Use the existing `framer-motion` dependency and a shared layout indicator; keep `aria-current="page"` authoritative and preserve visible keyboard focus styling.
- Initial full-page loads show the active indicator without a travel animation. Respect reduced motion by switching the indicator immediately.

## Mobile menu and materials

- Make the menu toggle 40×40px with a centered 20px Material icon, matching the theme control’s circular geometry. Preserve its accessible name, `aria-expanded`, `aria-controls`, and visible focus ring.
- Present links in a full-width overlay below the sticky header instead of expanding the document flow. Use a native modal `<dialog>` so the page behind is inert, Escape closes it, and browser focus restoration is preserved. Keep the current active route visibly marked beneath its label, not across the row; retain clear row separators without a duplicate bottom rule.
- Reuse the current muted paper/ink palette and existing header blur for a restrained translucent overlay/backdrop. Do not add a dependency, glass styling to cards/content, or high-contrast glossy effects. Maintain text contrast in light/dark themes.
- Preserve close-on-route-change, keyboard access, and reduced-motion behavior. Do not add a custom focus trap if native dialog behavior covers it.

## Constraints and verification

- Portfolio repository only; do not edit the separately hosted Markdown Previewer repository.
- No analytics changes, placeholder IDs, new packages, copy/content changes, deployment, merge, or push.
- Verify desktop indicator on initial load, click navigation, Back/Forward, hover (no underline), keyboard focus, and reduced motion. Verify mobile overlay open/close, Escape/focus return, route close, background inertness, scroll behavior, active marker, both themes, and 320/390/760px layouts.
- Confirm one main landmark, no horizontal overflow, stable focus, and no console errors. Run formatting, tests, type-check, lint, build, and `git diff --check`; leave local preview on port 3000.
