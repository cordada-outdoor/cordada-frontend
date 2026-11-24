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

- [ ] Create `src/api/` with `useProjects`, `useProject`, `useClients`,
      `useHomepage`, `useServices`.
- [ ] Add generic `StrapiResponse<T>` and a `StrapiMedia` type to replace
      `image: any` / `gallery: any[]` in `models/`.
- [ ] Replace the `"id///title"` string encoding in the projects filter with a
      typed `{ id, label }` value.

## 3. Shared components

- [ ] **`ProjectCard`**: same card markup is copied 3 times (twice in
      `pages/Home/index.tsx`, once in `pages/Projects/index.tsx`).
- [ ] **`SectionTitle`**: the repeated `Typography h3 fontWeight={600}` heading.
- [ ] **`Loading`**: the repeated spinner.

## 4. Split large files

- [ ] **Home (424 lines)** → `pages/Home/sections/`: `Hero`, `Projects`,
      `Clients`, `Services`, `About`. Move carousel settings into constants.
- [ ] **Menu (249 lines)** → `DesktopMenu`, `MobileMenu`, shared `NavLinks`,
      `LanguageSwitcher`.
- [ ] Use `<Link>` / `NavLink` instead of `onClick={() => history.push(...)}`:
      today there are no real anchors, so open-in-new-tab and accessibility
      don't work. `NavLink` also replaces the
      `window.location.pathname.includes` selected-state check.

## 5. CSS: one styling approach

Recommendation: **SCSS Modules** (`Component.module.scss` next to each
component). Vite supports them out of the box, we keep SCSS, and class names
get scoped.

- [ ] Break up `pages/index.scss`: it holds Menu, Footer, PreviewImage and
      DatePicker styles nested under `.layout`. Move each to its component.
- [ ] Remove the 18 `!important` overrides as scoping makes them unnecessary.
- [ ] Move `sx` / inline `style` blocks (e.g. `ProjectGallery`) into modules.
- [ ] Prefer responsive CSS over `isMobile` branching: Home renders two
      separate project trees depending on `isMobile`, which flashes on load.
- [ ] Migrate per component as it's touched in steps 3–4, not big-bang.

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
