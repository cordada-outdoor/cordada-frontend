// Single source of truth for design tokens. The MUI theme reads these
// directly, and `cssVariables` exposes them to SCSS as CSS custom properties
// (see styles/_colors.scss).

export const colors = {
  primary: "#ff521c",
  primaryTranslucent: "rgba(255, 82, 28, 0.08)",
  secondary: "#b2b2b2",
  white: "#ffffff",
  black: "#000000",
} as const;

// MUI's default breakpoints, stated explicitly so styles/_mixins.scss can
// mirror them. Keep both in sync.
export const breakpoints = {
  xs: 0,
  sm: 600,
  md: 900,
  lg: 1200,
  xl: 1536,
} as const;

export const cssVariables = {
  "--color-primary": colors.primary,
  "--color-primary-translucent": colors.primaryTranslucent,
  "--color-secondary": colors.secondary,
  "--color-white": colors.white,
  "--color-black": colors.black,
};
