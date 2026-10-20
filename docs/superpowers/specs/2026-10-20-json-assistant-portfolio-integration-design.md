# JSON Assistant Portfolio Integration

## Goal

Serve the existing JSON Assistant app under the portfolio's `/apps/json-assistant/` route, following the Markdown Previewer integration pattern, while keeping its standalone Vercel deployment working.

## Design

- Configure the JSON Assistant Vite build to emit relative asset URLs so the same deployment works at its domain root and when reverse-proxied under a nested path. Change the favicon URL in `index.html` to a relative URL for the same reason.
- Add a Next.js rewrite from `/apps/json-assistant/:path*` to `https://json-assistant-one.vercel.app/:path*`, matching the existing Markdown Previewer rewrite.
- Add a JSON Assistant card to the existing Apps section linking to `/apps/json-assistant/`.
- Do not copy or fork app source into the portfolio, change JSON processing behavior, or alter unrelated portfolio UI.

## Verification

- Run the JSON Assistant checks, unit tests, and production build using its documented Yarn scripts.
- Run the portfolio type check and production build.
- Verify the built JSON Assistant references assets relative to its served path, then verify the nested route and its assets through the portfolio rewrite.

## Scope and deployment

The change spans `lalitmee/json-assistant` (Vite base and favicon paths) and the portfolio repository (Next rewrite and Apps card). The JSON Assistant Vercel deployment must be rebuilt from the updated repository before the portfolio proxy can serve the updated build.
