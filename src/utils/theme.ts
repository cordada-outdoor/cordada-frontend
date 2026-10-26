import { createTheme, responsiveFontSizes } from "@mui/material";

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
    },
  }),
);
