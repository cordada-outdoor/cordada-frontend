import { ThemeProvider } from '@mui/material';
import './index.scss';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { theme } from 'utils/theme';
import Routes from 'utils/Routes';
import { SUPPORTED_LANGS } from 'utils/constants';
import ScrollToTop from 'utils/ScrollToTop';

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
}

export default App;
