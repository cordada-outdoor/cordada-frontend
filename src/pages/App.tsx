import "./index.scss";

import { BrowserRouter, Route, Switch } from "react-router-dom";

import { ThemeProvider } from "@mui/material";

import { SUPPORTED_LANGS } from "utils/constants";
import Routes from "utils/Routes";
import ScrollToTop from "utils/ScrollToTop";
import { theme } from "utils/theme";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
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
