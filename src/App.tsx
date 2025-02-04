import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Provider, useAtom } from 'jotai';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { themeModeAtom } from './store/atoms';
import { useMemo } from 'react';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import SearchResultsPage from './pages/SearchResultsPage';

function AppContent() {
  const [mode] = useAtom(themeModeAtom);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main: '#1a73e8',
            dark: '#1557b0',
          },
          secondary: {
            main: '#dc004e',
          },
          background: {
            default: mode === 'light' ? '#f8f9fa' : '#121212',
            paper: mode === 'light' ? '#ffffff' : '#1e1e1e',
          },
          text: {
            primary: mode === 'light' ? '#202124' : '#ffffff',
            secondary: mode === 'light' ? '#5f6368' : '#b0b0b0',
          },
        },
        typography: {
          fontFamily: [
            'Google Sans',
            'Roboto',
            'Arial',
            'sans-serif',
          ].join(','),
          h4: {
            fontSize: '24px',
            fontWeight: 400,
          },
          h5: {
            fontSize: '20px',
            fontWeight: 400,
          },
        },
        components: {
          MuiButton: {
            styleOverrides: {
              root: {
                textTransform: 'none',
                borderRadius: 8,
              },
            },
          },
          MuiOutlinedInput: {
            styleOverrides: {
              root: {
                borderRadius: 8,
                '& fieldset': {
                  borderColor: mode === 'light' ? '#dadce0' : '#404040',
                },
                '&:hover fieldset': {
                  borderColor: mode === 'light' ? '#dadce0' : '#404040',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#1a73e8',
                },
              },
            },
          },
          MuiPaper: {
            styleOverrides: {
              root: {
                backgroundImage: 'none',
              },
            },
          },
        },
      }),
    [mode],
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="search" element={<SearchResultsPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </LocalizationProvider>
    </ThemeProvider>
  );
}

function App() {
  return (
    <Provider>
      <AppContent />
    </Provider>
  );
}

export default App;
