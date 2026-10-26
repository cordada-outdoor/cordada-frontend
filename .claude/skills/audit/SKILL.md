---
name: audit
description: Full review of the Horari Bus app (coding standards, design standards, bugs and possible improvements), reported as a prioritised list. Use when asked to audit or review the whole app, not a single diff.
---

# Audit the app

A read-only review of the whole repo. Find problems, check them, and report them ranked. Don't change code until the user picks what to fix.

## 1. Baseline

Run these and note anything that isn't clean (CLAUDE.md requires all of them):

```sh
yarn format:check
yarn lint
yarn typecheck
yarn test
yarn build   # note the chunk sizes and any warnings
```

Also check that `check.yml` still runs all of them.

## 2. Read everything

The app is small, so read every file instead of sampling. Skip `src/components/ui/` (shadcn copies) unless something points there.

- `src/lib/`: the schedule logic. Check the service-day maths: times past `24:00`, the previous service day in "now" lookups, seasons that wrap the new year, the holiday rules (`skip` / `also` / `ignore`) and DST nights (the last Sunday of March and October).
- `src/views/`, `src/components/`: components should only display things. Flag date or schedule logic that belongs in `src/lib/` with tests, data hard-coded in the UI (line names, phone numbers, hours) that belongs in the generator, raw colours instead of palette roles, and state that isn't reset when it should be.
- `src/data/index.ts`, `src/data/data.test.ts`, `src/types.ts`: are the data tests guarding what matters, including things that break with time, such as the holiday list running out?
- `scripts/generate_timetables.py`: correctness of the asserts, and readability.
- `src/style.css`, `src/theme.ts`, `index.html`: every palette defines every role, the pre-paint script and `theme.ts` use the same keys, and the focus styles work.
- `vite.config.ts` (PWA manifest), `nginx/default.conf`, `Dockerfile`, `.github/workflows/`, `helm/`: caching headers, the SPA fallback and the CI checks.
- `package.json`: exact versions, packages in the right section (dependencies vs devDependencies), `@types/node` matching the Node in Docker and CI.
- Docs: README, CLAUDE.md, PLAN.md and the manifest description should match the code (lines covered, data files, step status).

## 3. See it running

Build, then serve `dist/` and drive it with Playwright at phone width (390 × 844), in dark and in light:

```sh
yarn build
npx vite preview --port 4173 &
```

Playwright isn't a project dependency. Install it in the scratchpad, not the repo, at the version that matches the cached browser (`ls ~/.cache/ms-playwright`; `chromium-1194` is `playwright@1.56.1`), and run [browse.cjs](browse.cjs):

```sh
cd <scratchpad> && npm init -y && npm i playwright@1.56.1
NODE_PATH=<scratchpad>/node_modules node .claude/skills/audit/browse.cjs <scratchpad>
```

It saves screenshots of Departures, Lines and the stop picker, and prints the results of a few behaviour checks. Look at every screenshot: hierarchy, spacing, truncation, contrast, empty and end-of-day states. Add checks for anything you suspect from reading the code. Confirm a bug in the browser before you report it. Stop the preview server when you're done.

## 4. Report

Report in the terminal, grouped and ranked, with numbers so the user can refer to findings:

1. **Bugs**: confirmed wrong behaviour, each with a `file:line` and how to reproduce it.
2. **Coding standards**: departures from CLAUDE.md conventions, missing tests, outdated docs.
3. **Design and UX**: what you saw in the screenshots, plus accessibility (headings, labels, hover-only information).
4. **Lower priority**: real but not worth much code (bundle size, time zones, cosmetic tidying).

For each finding, give what's wrong, why it matters, and the fix in a sentence. Leave out anything you couldn't confirm, or label it as unconfirmed. End with a recommendation of what to fix first, and ask before changing anything. If the user wants fixes, make them on a branch, not `main`.
