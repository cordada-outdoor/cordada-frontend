import { createTheme } from "@mui/material";

export const theme = createTheme({
  typography: {
    fontFamily: ["AeonikPro"].join(","),
    fontSize: 14,
  },
  spacing: (factor: number) => {
    return `${factor * 0.5}rem`;
  },
  palette: {
    primary: {
      main: "#ff521c",
    },
  },
});
