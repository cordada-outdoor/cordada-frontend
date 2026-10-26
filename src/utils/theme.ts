import { createTheme, responsiveFontSizes } from "@mui/material";

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
        main: "#ff521c",
      },
    },
  }),
);
