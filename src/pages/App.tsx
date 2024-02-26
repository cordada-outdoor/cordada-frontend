import React from 'react';
import './index.scss';
import { useTranslation } from 'react-i18next';
import { RouterProvider } from 'react-router-dom';
import { router } from '../router/router';

const App = () => {
  const { t } = useTranslation()
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
