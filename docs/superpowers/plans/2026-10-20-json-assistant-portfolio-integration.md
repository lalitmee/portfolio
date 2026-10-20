# JSON Assistant Portfolio Integration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Serve JSON Assistant at `/apps/json-assistant/` through the portfolio while preserving its standalone Vercel deployment.

**Architecture:** Configure the Vite app to emit relative asset URLs, then proxy its deployment through a Next.js rewrite and expose it in the existing Apps section. Deploy the path-compatible JSON Assistant build before deploying the portfolio rewrite.

**Tech Stack:** Svelte 5, Vite, Yarn, Next.js 15, React/TypeScript.

**Spec:** `docs/superpowers/specs/2026-10-20-json-assistant-portfolio-integration-design.md`

## Global Constraints

- Keep the standalone Vercel app working.
- Do not copy or fork app source into the portfolio.
- Do not change JSON processing behavior or unrelated portfolio UI.
- Use Yarn only; `yarn.lock` is the dependency lockfile. Install with `yarn install --frozen-lockfile`; do not create or restore `package-lock.json`.
- Requires Node.js 22.12 or newer.

## Review Focus

- Standalone root deployment assets and processing worker still load: check root serving and run a JSON format operation.
- Nested JS and CSS asset URLs remain under `/apps/json-assistant/`: assert generated `dist/index.html` asset references are relative and check proxied responses after deploy.
- App favicon resolves under the nested route: assert HTML uses a relative favicon URL and check the proxied icon response.
- Rewritten nested asset paths reach the matching upstream paths: request the emitted JS and CSS through the portfolio route and verify successful responses.
- Portfolio’s trailing-slash root route resolves to the upstream app: request `/apps/json-assistant/` through a running portfolio server and verify the JSON Assistant HTML title.

---

## File Structure

- `json-assistant/vite.config.ts` — configure Vite output asset base for root and nested-path hosting.
- `json-assistant/index.html` — make the favicon URL relative to the app path.
- `portfolio/next.config.js` — add the path-preserving rewrite to the JSON Assistant Vercel deployment.
- `portfolio/pages/index.tsx` — add a matching card to the Apps section.

## Task 1: Make JSON Assistant Hostable Under a Path Prefix

**Files:**
- Modify: `json-assistant/vite.config.ts`
- Modify: `json-assistant/index.html`

**Interfaces:**
- Produces: a production build whose script, stylesheet, and favicon URLs resolve relative to the URL hosting the app, at both `/` and `/apps/json-assistant/`.

- [ ] **Step 1: Set Vite’s asset base to a relative path**

In `vite.config.ts`, set the Vite config `base` option to `'./'`; keep the existing Svelte plugin and Vitest configuration unchanged.

- [ ] **Step 2: Make the favicon URL relative**

In `index.html`, change `/logo.svg` to `./logo.svg`.

- [ ] **Step 3: Build and inspect output**

Run from the JSON Assistant repository:

```bash
yarn install --frozen-lockfile
yarn check
yarn test
yarn build
```

Expected: all checks pass; `dist/index.html` refers to JS/CSS under `./assets/` and favicon at `./logo.svg`.

- [ ] **Step 4: Check root deployment compatibility**

Run `yarn run vite preview`, open the printed local URL, and verify the app loads with JS, CSS, and favicon requests succeeding from the root path. Format a JSON document to verify the processing worker also loads.

- [ ] **Step 5: Commit the JSON Assistant change**

```bash
git add vite.config.ts index.html
git commit -m "fix: support JSON Assistant subpath hosting"
```

Deploy this commit to the existing JSON Assistant Vercel project and verify its standalone root URL before proceeding to Task 2.

## Task 2: Proxy JSON Assistant Through the Portfolio

**Files:**
- Modify: `portfolio/next.config.js`
- Modify: `portfolio/pages/index.tsx`

**Interfaces:**
- Consumes: Task 1’s deployed relative-asset build at `https://json-assistant-one.vercel.app/`.
- Produces: `/apps/json-assistant/` and all nested asset requests proxy to the same paths on the JSON Assistant deployment; the Apps section links to that route.

- [ ] **Step 1: Add the Next.js rewrite**

Add a rewrite matching the existing Markdown Previewer pattern in `next.config.js`:

```js
{
  source: '/apps/json-assistant/:path*',
  destination: 'https://json-assistant-one.vercel.app/:path*',
}
```

Preserve existing rewrites and `trailingSlash` configuration.

- [ ] **Step 2: Add the Apps card**

In the existing Apps section of `pages/index.tsx`, add a card matching the Markdown Previewer card, linking to `/apps/json-assistant/`, titled `JSON Assistant`, and describing it as a browser-based JSON editor/viewer. Do not alter the existing card.

- [ ] **Step 3: Run portfolio checks**

```bash
yarn type-check
yarn build
```

Expected: both commands exit successfully.

- [ ] **Step 4: Verify the proxy end to end**

Run the built portfolio locally with `yarn start`. Request `/apps/json-assistant/` and the emitted relative JS, CSS, and favicon URLs under `/apps/json-assistant/`. Expected: HTML title is `JSON Assistant`; all three asset responses succeed. Also open the route in a browser, format a JSON document, and confirm the editor remains usable.

- [ ] **Step 5: Commit the portfolio change**

```bash
git add next.config.js pages/index.tsx
git commit -m "feat: add JSON Assistant to portfolio apps"
```

Deploy the portfolio after the JSON Assistant deployment is confirmed path-compatible; verify the same route and assets on the deployed portfolio.
