// App.tsx

import React from 'react';
import AppRouter from './routes/Router';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { baselightTheme } from "./layout/theme/DefaultColors";

const App: React.FC = () => {

  const theme = baselightTheme;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppRouter />
    </ThemeProvider>
  );
};

export default App;
