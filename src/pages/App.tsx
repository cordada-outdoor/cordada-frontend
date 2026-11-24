import "./index.scss";

import { BrowserRouter, Route, Switch } from "react-router-dom";

import { GlobalStyles, ThemeProvider } from "@mui/material";

import { theme } from "styles/theme";
import { cssVariables } from "styles/tokens";
import { SUPPORTED_LANGS } from "utils/constants";
import Routes from "utils/Routes";
import ScrollToTop from "utils/ScrollToTop";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles styles={{ ":root": cssVariables }} />
      <BrowserRouter>
        <ScrollToTop />
        <Switch>
          <Routes />
          <Route path={`/:lang(${SUPPORTED_LANGS.join("|")})`}>
            <Routes />
          </Route>
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
