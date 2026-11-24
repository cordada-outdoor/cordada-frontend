# Refactor plan: code structure and CSS

Main problems today: duplicated markup, and styling split across three systems
(global SCSS, MUI `sx`, inline `style`).

## 0. Bugs to fix first

- [x] **December date filter**: "next month" maths in `pages/Projects/index.tsx`
      produces `2024-13-01`. Use dayjs `.add(1, "month")`.
- [x] **Duplicate React keys**: Projects grid uses `key={i}` (the page index),
      so every card on a page shares a key. Use `p.documentId`.
- [x] **IntersectionObserver leak**: Home creates it but never disconnects, and
      re-subscribes whenever `isMobile` changes. Return a cleanup.
- [x] **History reset during render**: `window.history.replaceState` runs on
      every render in Projects. Move it into an effect.

## 1. Theme and design tokens

- [x] One source for colours: `styles/tokens.ts` feeds the MUI theme and
      CSS custom properties; `styles/_colors.scss` aliases the variables.
- [x] Button style set once in the MUI theme (`components.MuiButton`):
      square, flat, MUI's default darker hover; `variant="inverted"`
      for buttons on primary backgrounds.
- [x] Breakpoints: `down($bp)` / `up($bp)` mixins in `styles/_mixins.scss`
      match MUI; all `max-width: 900px` queries now use `down(md)`.
- [ ] Remaining one-off queries (1000, 1150, 550, 375px) left as-is; revisit
      per component in step 5.
- [x] Replace Sass `@import` with `@use` (deprecated in Dart Sass).

## 2. API layer with typed hooks

Seven components build Strapi calls inline with `http.get`, and responses are
`any` (14 uses).

- [x] Create `src/api/` with `useLatestProjects`, `useProjects`, `useProject`,
      `useClients`, `useClient`, `useServices`, `useHomepage`,
      `useAboutUsPage`.
- [x] Add `StrapiCollectionResponse<T>` / `StrapiSingleResponse<T>` and
      `StrapiMedia` in `models/strapi.ts`; models match the cordada-cms
      schemas.
- [x] Replace the `"id///title"` filter encoding: filters hold ids only and
      chip labels come from the cached services/clients lists.

## 3. Shared components

- [x] **`ProjectCard`**: same card markup is copied 3 times (twice in
      `pages/Home/index.tsx`, once in `pages/Projects/index.tsx`).
- [x] **`SectionTitle`**: the repeated `Typography h3 fontWeight={600}` heading.
- [x] **`Loading`**: the repeated spinner.

## 4. Split large files

- [x] **Home (424 lines)** → `pages/Home/sections/`: `Hero`, `Projects`,
      `Clients`, `Services`, `About`. Move carousel settings into constants.
- [x] **Menu (249 lines)** → `DesktopMenu`, `MobileMenu`, shared `NavLinks`,
      `LanguageSwitcher`.
- [x] Use `<Link>` / `NavLink` instead of `onClick={() => history.push(...)}`:
      today there are no real anchors, so open-in-new-tab and accessibility
      don't work. `NavLink` also replaces the
      `window.location.pathname.includes` selected-state check.

## 5. CSS: one styling approach

Recommendation: **SCSS Modules** (`Component.module.scss` next to each
component). Vite supports them out of the box, we keep SCSS, and class names
get scoped.

- [x] Break up `pages/index.scss`: it holds Menu, Footer, PreviewImage and
      DatePicker styles nested under `.layout`. Move each to its component.
- [x] Remove the 18 `!important` overrides as scoping makes them unnecessary.
- [x] Move `sx` / inline `style` blocks (e.g. `ProjectGallery`) into modules.
- [x] Prefer responsive CSS over `isMobile` branching: Home renders two
      separate project trees depending on `isMobile`, which flashes on load.
- [x] Migrate per component as it's touched in steps 3–4, not big-bang.

  Notes: `StyledEngineProvider injectFirst` lets modules override MUI at
  equal specificity; `useMediaQuery` defaults to `noSsr` (no desktop-first
  flash on mobile). One `!important` remains, against react-slick's inline
  slide width. Typography variant switches and Home's mobile carousel still
  use `isMobile`. The one-off queries (1000, 1150, 550, 375px) are kept as
  literals in their modules.

## 6. Legal pages to the CMS

- [ ] `PrivacyPolicy` (306 lines) and `LegalNotice` are hardcoded Spanish JSX,
      so every locale shows Spanish. Move to CMS markdown rendered with
      `RenderMarkdown`.

## Target folder layout

```
src/
  api/            # typed query hooks per CMS entity
  components/     # shared UI (ProjectCard, SectionTitle, Loading, Layout/...)
  pages/<Page>/   # page + its own sections/ and *.module.scss
  models/         # CMS types, incl. StrapiResponse<T>, StrapiMedia
  styles/         # tokens, mixins, global reset
  utils/
```
