import { createTheme, responsiveFontSizes } from "@mui/material";

declare module "@mui/material/styles" {
  interface Palette {
    white: Palette["primary"];
  }
  interface PaletteOptions {
    white?: PaletteOptions["primary"];
  }
}

declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    white: true;
  }
}

// Keep in sync with utils/colors.scss
export const colors = {
  primary: "#ff521c",
  primaryDark: "#d63d0a",
  white: "#ffffff",
  black: "#000000",
};

export const theme = responsiveFontSizes(
  createTheme({
    typography: {
      fontFamily: ["Montserrat"].join(","),
      fontSize: 16,
    },
    spacing: (factor: number) => {
      return `${factor * 0.5}rem`;
    },
    palette: {
      primary: {
        main: colors.primary,
        dark: colors.primaryDark,
        contrastText: colors.white,
      },
      common: {
        black: colors.black,
        white: colors.white,
      },
      text: {
        primary: colors.black,
      },
      background: {
        default: colors.white,
      },
      // For buttons on orange or photo backgrounds
      white: {
        main: colors.white,
        dark: "#f2f2f2",
        contrastText: colors.primaryDark,
      },
    },
    components: {
      MuiButton: {
        defaultProps: {
          variant: "contained",
          disableElevation: true,
        },
        styleOverrides: {
          root: {
            borderRadius: 0,
            fontWeight: 700,
            letterSpacing: "0.04em",
            padding: "8px 20px",
          },
          text: {
            padding: "6px 8px",
          },
          // White on the brand orange is only 3.2:1, so filled buttons use
          // the darker shade to reach 4.5:1
          textPrimary: {
            color: colors.primaryDark,
          },
          containedPrimary: {
            backgroundColor: colors.primaryDark,
            "&:hover": {
              backgroundColor: "#b8340a",
            },
          },
        },
      },
    },
  }),
);
