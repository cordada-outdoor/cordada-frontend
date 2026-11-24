import { BrowserRouter, Route, Switch } from "react-router-dom";

import {
  GlobalStyles,
  StyledEngineProvider,
  ThemeProvider,
} from "@mui/material";

import { theme } from "styles/theme";
import { cssVariables } from "styles/tokens";
import { SUPPORTED_LANGS } from "utils/constants";
import Routes from "utils/Routes";
import ScrollToTop from "utils/ScrollToTop";

const App = () => {
  return (
    // injectFirst puts MUI's styles before ours, so component SCSS modules
    // override MUI at equal specificity.
    <StyledEngineProvider injectFirst>
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
    </StyledEngineProvider>
  );
};

export default App;
