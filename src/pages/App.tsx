import { ThemeProvider } from '@mui/material';
import './index.scss';
import { RouterProvider } from 'react-router-dom';
import { router } from 'utils/router';
import { theme } from 'utils/theme';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>

  );
}

export default App;
