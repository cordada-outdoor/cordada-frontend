import { createTheme } from "@mui/material";

import { breakpoints, colors } from "./tokens";

declare module "@mui/material/Button" {
  interface ButtonPropsVariantOverrides {
    // Primary-coloured text on white, for use on primary backgrounds.
    inverted: true;
  }
}

export const theme = createTheme({
  typography: {
    fontFamily: ["Montserrat"].join(","),
    fontSize: 16,
  },
  spacing: (factor: number) => {
    return `${factor * 0.5}rem`;
  },
  breakpoints: {
    values: breakpoints,
  },
  palette: {
    primary: {
      main: colors.primary,
    },
  },
  components: {
    // Read the media query on the first render, so components branching on
    // breakpoints don't render the desktop layout first on mobile.
    MuiUseMediaQuery: {
      defaultProps: { noSsr: true },
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          borderRadius: 0,
        },
      },
      variants: [
        {
          props: { variant: "inverted" },
          style: {
            padding: "6px 16px",
            backgroundColor: colors.white,
            color: colors.primary,
            "&:hover": {
              backgroundColor: "rgba(255, 255, 255, 0.9)",
            },
          },
        },
      ],
    },
  },
});
