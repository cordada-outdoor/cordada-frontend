# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Frontend for the Cordada Outdoor website: a Vite 6 + React + TypeScript SPA that reads all content from a Strapi CMS (v5-style responses, e.g. `documentId`). UI is MUI v5 plus per-page SCSS.

## Commands

```sh
npm start                          # dev server on http://localhost:3000
npm run build                      # typecheck + production build to build/
npm run preview                    # serve the production build locally
npm run lint                       # eslint src
npm run typecheck                  # tsc
npm test                           # vitest in watch mode
npx vitest run                     # single run
npx vitest run path/to/file.test.tsx   # one test file
docker build -t cordada-frontend .  # nginx image serving build/
```

There are currently no test files (only `src/setupTests.ts`).

A Husky pre-commit hook runs lint-staged: `prettier --write` + `eslint --fix` on staged `.ts/.tsx`, and `sort-package-json` on `package.json`.

## Environment

Copy `.env.example` to `.env`. Required vars (`REACT_APP_CMS_HOST`, `REACT_APP_CMS_TOKEN`, `REACT_APP_REACT_QUERY_DEV_TOOLS`) are read from `import.meta.env` through `src/config` helpers, which **throw at startup** if a var is missing or (for booleans) isn't exactly `true`/`false`. Vite is configured (`envPrefix` in `vite.config.ts`) to expose only `REACT_APP_*` vars. Add new env vars in `src/config/config.ts` the same way rather than reading `import.meta.env` directly. Since Vite inlines env vars at build time, the Docker image needs them present during `npm run build`.

## Architecture

- **Imports**: `tsconfig.json` sets `baseUrl: "src"`, so modules are imported absolutely (resolved in Vite by `vite-tsconfig-paths`; SCSS also resolves `utils/...` from `src` via `loadPaths`) (`config`, `http/client`, `models/project`, `utils`, `components/...`, `pages/...`, `assets/...`). ESLint's `simple-import-sort` enforces a specific group order (side effects → react → packages → absolute → local src dirs → relative); run `eslint --fix` rather than ordering by hand.
- **Data fetching**: all CMS calls go through the axios instance in `src/http/client.ts` (base URL + bearer token from config). A request interceptor appends `locale` from `localStorage` to every request. Components call it directly inside TanStack Query hooks (`useQuery`/`useInfiniteQuery`) using the shared `queryClient` from `src/http/query-client.ts`. Types for CMS entities live in `src/models/`.
- **SVG icons**: import as React components with `import Icon from "assets/....svg?react"` (vite-plugin-svgr).
- **Images**: CMS media URLs are relative; use `getImageUrl` / `<StrapiImage>` (prefixes `config.cms.host` and picks a Strapi format size with fallback to the original).
- **Routing & languages**: react-router **v5** (`Switch`, `Redirect`, `useRouteMatch`, not v6 APIs). Supported languages are `ca` (default), `es`, `en` (`src/utils/constants.ts`). `App.tsx` mounts `utils/Routes` twice: once unprefixed (default `ca`) and once under `/:lang(ca|es|en)`. `useUrlLang()` derives `lang`, the `langUrlPrefix` to use when building links (empty for `ca`), and the route base path. When `Routes` sees the language change it calls `i18n.changeLanguage`, stores `locale` in localStorage, and invalidates all queries so CMS content refetches in the new locale. New pages must be added in `Routes.tsx` and internal links should be built with `langUrlPrefix`.
- **Static UI strings**: i18next with the HTTP backend loads `public/locales/{ca,es,en}/translation.json` (fallback `ca`). Add new keys to all three files. Long-form content (markdown bodies) comes from the CMS instead and is rendered via `RenderMarkdown`; `getMarkdownWithEmbeds` splits markdown so Instagram/YouTube links become social embeds.
- **Layout/styling**: pages wrap content in `components/Layout/Layout` (menu + footer). MUI theme is in `utils/theme.ts`; shared SCSS colours/mixins in `utils/colors.scss` and `utils/mixins.scss`, with each page having its own `index.scss`.
- **Deployment**: multi-stage `Dockerfile` builds with Node 20 and serves `build/` from nginx with SPA fallback (`nginx.conf`). Local tooling pins Node 18.12.0 (`.node-version`, `.tool-versions`).

## Formatting

Prettier: 80 cols, 2 spaces, double quotes, semicolons, trailing commas everywhere.
