# Research: Node.js package managers

Generated: 2026-10-28

## Executive summary

For this project, pnpm is a sensible default if you want faster repeat installs and lower disk use across projects, but it is not automatically faster on every first install or CI run. npm is the lowest-friction option and is already good at reproducible installs; modern Yarn is powerful for workspaces and strict dependency handling, but its Plug'n'Play mode can require more ecosystem adaptation; Bun's package manager is attractive when adopting Bun's wider runtime/toolchain, but choosing it solely as a drop-in package manager adds a compatibility variable. [official] The project currently has a `yarn.lock`, uses Yarn's `resolutions` field, and README already documents npm, pnpm, and Yarn install commands. It is a Next.js 15 app with a conventional single `package.json`, so there is no current monorepo/workspace complexity to justify a manager on that basis. [project]

**Recommendation:** move this repository to pnpm if the goal is specifically package installation efficiency, but measure clean and warm install time on your machine and CI before treating speed as established. Keep the default `node_modules` linker for compatibility, pin pnpm through `packageManager`, migrate `resolutions` carefully to pnpm's `overrides`, and configure CI/deployment to use a frozen lockfile. [official][project]

## What “fast” means

Package-manager speed is not one number. It depends on the dependency graph, network, registry, CPU/disk, cold versus warm cache, lifecycle scripts, and whether the benchmark includes removing/recreating `node_modules`. A warm local install can benefit from pnpm's shared store, while a clean CI environment may have no such cache. The official docs explain mechanisms and supported workflows, but do not establish a universally fastest manager for this particular dependency set. [official]

Compare at least:

- **Cold install:** fresh cache and no `node_modules`.
- **Warm install:** repeat install with manager cache available.
- **CI install:** actual runner, lockfile, cache configuration, and install command.
- **Disk use:** especially relevant if many repositories share one machine.

Use identical Node version, dependency lock, machine, network, and lifecycle-script policy; repeat each case and compare medians. Don't infer build speed from install speed.

## Comparison

| Manager | Strengths | Trade-offs | Best fit |
|---|---|---|---|
| **npm** | Bundled with Node.js; broad compatibility; `package-lock.json`; `npm ci` is a frozen clean-install workflow; workspaces are built in. Low adoption friction. [official] | Per-project dependency trees can duplicate files across projects; installs can be slower than alternatives in some conditions, but performance is workload-dependent. | Default, simplest choice; teams wanting maximum familiarity and minimum setup. |
| **pnpm** | Content-addressable shared store with hardlinks/symlinks can reduce duplicated disk use; strict dependency visibility helps expose undeclared dependencies; lockfile and workspace support. [official] | `node_modules` uses links and a different layout; unusual tools/packages that assume a flat layout may need configuration. Shared-store advantage depends on cache and filesystem/CI setup. Yarn `resolutions` needs migration to pnpm `overrides`. | Strong general choice, especially for multiple repositories or monorepos where disk efficiency and stricter dependency correctness matter. |
| **Yarn Classic (1.x)** | Familiar `yarn.lock`, broad legacy compatibility, workspaces. | Legacy major line; compared with modern managers, fewer current features and less reason to choose it for a new migration. Existing install compatibility can still be a reason to keep it. | Existing stable Yarn 1 repositories that do not need a migration. |
| **Modern Yarn (Berry, 2+)** | Workspaces, constraints and plugins; supports Plug'n'Play (no `node_modules`) and can also use a `node_modules` linker. Immutable/frozen install options support CI. [official] | PnP changes module resolution and may expose tooling or dependency assumptions; migration is more involved if choosing PnP. Yarn is not the same manager/configuration as Yarn Classic. | Larger monorepos or teams wanting Yarn's workspace/constraint/plugin features and willing to standardize on its workflow. |
| **Bun package manager** | Fast package manager bundled with Bun runtime, test runner and bundler; can consume common npm packages and lockfiles. [official] | The broader Bun runtime/tooling is a separate decision from package-manager speed. Compatibility and lockfile behavior should be validated for the project's exact dependency scripts and deployment platform before switching. | Projects already adopting Bun, or teams willing to validate the Bun ecosystem as a whole. |

**Corepack is not a separate package manager.** It selects and invokes a project's declared package-manager version (where available), and can help standardize tool versions. Verify availability for your Node distribution/version rather than assuming it is always bundled. [official]

## Important distinctions

- **Lockfile formats are manager-specific.** A migration should produce and commit only the chosen manager's lockfile; retaining multiple active lockfiles invites inconsistent installs and contributor confusion. [community consensus]
- **Reproducibility is not unique to pnpm.** npm's `npm ci` requires a matching lockfile and does not update it; Yarn and pnpm also provide immutable/frozen installation modes. [official]
- **pnpm's strictness is a correctness feature, not just speed.** Code relying on undeclared/transitive dependencies can fail when moved from a flatter dependency layout. Fix the manifest or explicitly configure compatibility rather than weakening strictness without a reason. [official][community consensus]
- **Bun is also a runtime/toolchain choice.** Comparing Bun's package manager with npm/pnpm does not establish that a Bun runtime migration is beneficial; those are separate decisions. [official]
- **There is no project-specific benchmark here.** The dependency list and installation have not been benchmarked under controlled conditions, so “pnpm will be faster for this project” remains unverified. [project]

## Project-specific assessment

Verified from `package.json`, `yarn.lock`, and `README.md`:

- The repository has one root package manifest and a Yarn lockfile; no workspace manifest was found.
- `package.json` has a `resolutions` block, so this is the main migration-specific configuration to translate and validate.
- The README currently offers `npm install`, `pnpm install`, and `yarn install`, while its documented scripts use npm syntax. It currently gives contributors mixed-manager guidance.
- The app uses Next.js 15 and React 19. Keep the standard `node_modules` layout during migration rather than simultaneously changing to Yarn PnP or Bun runtime.
- The project has `node_modules` in the working tree, but that does not by itself reveal which manager/lockfile originally created it.

## Recommendation and migration guardrails

1. Choose **pnpm** if lower repeated install time/shared disk use is a priority and you are comfortable adopting its lockfile and linked `node_modules` layout. Choose npm instead if minimizing tooling changes is more important than potential speed/disk improvements.
2. Pin an exact pnpm version using the `packageManager` field in `package.json`; use the same version locally and in CI/deployment. [official]
3. Translate Yarn `resolutions` entries to pnpm `overrides`, then inspect the generated lockfile and run clean frozen installs. Do not assume every Yarn selector/glob maps one-to-one. [official]
4. Generate `pnpm-lock.yaml`, verify the dependency graph/build/type-check/lint, and check for code that improperly imports undeclared transitive dependencies.
5. Update README and CI/deployment install commands to one manager. In CI use pnpm's frozen-lockfile behavior, and ensure the package-manager version is pinned.
6. Benchmark cold and warm local/CI installs if speed is the main reason. If the difference is not meaningful for this project's small/simple dependency topology, npm remains a perfectly sound choice.

## Findings by source type

### Official documentation

- pnpm's comparison with npm describes a content-addressable store plus links into `node_modules`, in contrast to npm's flattened tree. This explains its disk-efficiency and strictness trade-offs; it is not a universal speed guarantee.
- npm documents `package-lock.json` as the exact dependency tree representation, and `npm ci` as a clean install that errors on lockfile mismatch and does not rewrite manifests/lockfiles.
- Yarn documentation covers `yarn.lock`, frozen installs, workspaces, and Plug'n'Play. Yarn Classic documentation is distinct from modern Yarn documentation, so version must be made explicit.
- Bun describes itself as an all-in-one JavaScript toolkit, including package manager/runtime/bundler/test runner; this supports evaluating runtime adoption separately.

### Community and benchmark evidence limitation

The configured browser search tool was unavailable in this session, so I could not independently gather current Reddit/Hacker News threads, inspect popular GitHub projects' READMEs, or verify third-party benchmark methodology. The recommendation therefore prioritizes official behavior documentation and the checked-in project files. Treat broad claims such as “pnpm is always fastest” as unproven; use the controlled benchmark above for this repo.

## Sources

Official documentation queried through Context7:

- pnpm vs npm: https://pnpm.io/pnpm-vs-npm
- pnpm installation settings: https://pnpm.io/settings
- pnpm overrides: https://pnpm.io/package_json#pnpmoverrides
- pnpm CI / frozen lockfile: https://pnpm.io/cli/install
- npm package-lock: https://docs.npmjs.com/cli/v10/configuring-npm/package-lock-json
- npm ci: https://docs.npmjs.com/cli/v10/commands/npm-ci
- npm workspaces: https://docs.npmjs.com/cli/v10/using-npm/workspaces
- Yarn Plug'n'Play: https://yarnpkg.com/features/pnp
- Yarn install: https://yarnpkg.com/cli/install
- Yarn Classic lockfile: https://classic.yarnpkg.com/en/docs/yarn-lock/
- Bun package manager: https://bun.sh/docs/pm
- Node Corepack: https://nodejs.org/api/corepack.html

Project files checked:

- `package.json`
- `yarn.lock`
- `README.md`
