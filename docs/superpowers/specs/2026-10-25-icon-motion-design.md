# Internal icon motion

## Intent

Give icons across the active portfolio application small, meaningful internal
animations. The user approved hover-triggered motion, including brand icons:
preserve brand shapes, animate details where natural, and use a restrained reveal
where independent movement would distort the logo. Do not substitute whole-icon
bouncing, rotation, or scaling for internal motion.

## Scope

Cover icons rendered by active routes and their shared components:

- About, app, project, and work-detail headings.
- External-launch actions on the homepage, app directory, and app detail.
- Contact email, GitHub, LinkedIn, location, send, and fallback-link icons.
- Navigation menu/close, theme toggle, appearance palette/selection icons.
- Directional arrows, tilted arrows, and back-to-top controls.
- The 404 route's action icon.

Do not modify unused legacy components, photographic/image assets, education
institution logo images, favicons, or text-only links to add new icons.
Preserve destinations, analytics, accessible names, focus management, and control
state behavior. Keep the previously approved app-card button treatments.

## Structure

Use a small shared SVG component module containing explicitly named icons with
separate paths/groups for movable details. Reuse each icon wherever its meaning
recurs. Keep existing icon size, currentColor inheritance, and visual weight close
to the current application. No new dependency or general-purpose animation engine.

Use CSS keyframes for finite internal animations. Scope activation to a heading,
link, button, or the immediate static label containing an icon, never an entire
content section. Handle native input focus for appearance choices. Reuse existing
arrow behavior where it already animates internal geometry; do not run a second
conflicting animation on those arrows.

## Motion vocabulary

- Bulb: rays brighten sequentially, bulb body stays fixed.
- Sliders: individual knobs move along fixed tracks and settle.
- Widgets: tiles make small staggered internal movements and settle.
- Construction: a tool pivots around its internal joint; outer frame stays fixed.
- Career: briefcase clasp responds while the case stays fixed.
- Education: tassel swings while the cap stays fixed.
- Document/code: lines reveal or brackets separate slightly and return.
- Information/outcome: inner mark reveals while its circle stays fixed.
- External link: arrow travels slightly inside its fixed corner/frame.
- Email: envelope flap opens and closes inside a fixed envelope footprint.
- Location: inner dot pulses, pin stays fixed.
- Send: internal strokes reveal; avoid replacing this with whole-plane travel.
- Menu/close: individual strokes move and settle without changing control state.
- Theme: sun rays or moon detail responds without rotating the entire icon.
- Palette/check: color wells or check stroke reveal inside the fixed silhouette.
- Brands: retain existing GitHub/LinkedIn silhouettes and proportions, using a
  brief clipped highlight reveal rather than attempting to extract or distort
  a flattened logo path. Keep appearance theme-aware; no forced brand colors.

## Interaction and accessibility

Each animation plays once on hover entry and settles even if hover continues.
Leaving and re-entering permits another play. Keyboard-visible focus triggers
equivalent feedback on interactive controls. Static headings remain non-focusable.
Hover animations run only on hover-capable, fine-pointer devices. Touch does not
need animation to communicate state or complete an action.

With prefers-reduced-motion enabled, all added icon motion is disabled and icons
remain fully visible. Decorative SVGs remain aria-hidden and non-focusable;
existing control labels remain the accessibility source of truth. SVG overlays
must not intercept pointer events or create duplicate accessible names. No
autoplay or infinite animation is added. Replace existing perpetual decorative
back-to-top motion with finite hover/focus motion for consistency.

## Verification

Add small runnable checks for shared SVG rendering and interaction activation,
including reduced motion and re-entry. Update existing icon tests only where
component names or rendering change; retain destination and analytics assertions.
Run the full npm test suite and npm run type-check, plus a production build when
the environment permits. Inspect representative heading, contact brand, theme,
menu, launch-button, and arrow interactions in the browser in both themes; check
keyboard focus and reduced-motion behavior. Report any unavailable verification.

## Review and delivery

User review of this written spec precedes the implementation plan. No commits or
pushes without separate explicit approval. Implementation must preserve unrelated
working-tree changes.
