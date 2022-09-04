import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

import { useAppSelector } from './app/hooks';

import './styles.css'
import './App.css';

import { selectTrip, selectTripStatus } from './features/trip/tripslice';

import Dashboard from './views/Dashboard/Dashboard';
import TopBar from './views/TopBar/TopBar';
import TripSegment from './views/TripSegments/TripSegments';
import WelcomeOverlay from './views/welcomeOverlay/welcomeOverlay';
import createTheme from "@mui/material/styles/createTheme";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import swanseaRegular from './font/Swansea/SwanseaRegular.ttf'
import swanseaBold from './font/Swansea/SwanseaBold.ttf'
import swanseaBoldItalic from './font/Swansea/SwanseaBoldItalic.ttf'
import swanseaItalic from './font/Swansea/SwanseaItalic.ttf'
import AppBar from "@mui/material/AppBar/AppBar";
import Toolbar from "@mui/material/Toolbar/Toolbar";

declare module '@mui/material/styles' {
  interface Theme {
    status: {
      danger: string;
    };
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    status?: {
      danger?: string;
    };
  }
}

interface PaletteColor {
  light?: string;
  main: string;
  dark?: string;
  contrastText?: string;
}

function App() {
  const trip = useAppSelector(selectTrip);
  const tripStatus = useAppSelector(selectTripStatus);

  const theme = createTheme({
    typography: {
      fontFamily: 'Swansea',
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: `
          @font-face {
            font-family: 'Swansea';
            font-style: normal;
            font-display: swap;
            font-weight: 400;
            src: local('Swansea'), local('Swansea-Regular'), url(${swanseaRegular}) format('woff2');
            unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
          }

          @font-face {
            font-family: 'Swansea';
            font-style: bold;
            font-display: swap;
            font-weight: 600;
            src: local('Swansea'), local('Swansea-Bold'), url(${swanseaBold}) format('woff2');
            unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
          }

          @font-face {
            font-family: 'Swansea';
            font-style: boldItalic;
            font-display: swap;
            font-weight: 500;
            src: local('Swansea'), local('Swansea-boldItalic'), url(${swanseaBoldItalic}) format('woff2');
            unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
          }

          @font-face {
            font-family: 'Swansea';
            font-style: italic;
            font-display: swap;
            font-weight: 400;
            src: local('Swansea'), local('Swansea-Italic'), url(${swanseaItalic}) format('woff2');
            unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
          }
        `,
      },
    },
    palette: {
      primary: {
        light: '#607b41',
        main: '#526649',
        dark: '354d39',
        // contrastText: will be calculated to contrast with palette.primary.main
      },
      secondary: {
        light: '#cfddde',
        main: '#8cb6d0',
        dark: '#5c869f',
        // contrastText: will be calculated to contrast with palette.primary.main
      },
      error: {
        light: '#f9b39b',
        main: '#ff8f73',
        dark: '#cd5f47',
        // contrastText: will be calculated to contrast with palette.primary.main
      },
      warning: {
        light: '#ffe284',
        main: '#f0b055',
        dark: '#ba8126',
        // contrastText: will be calculated to contrast with palette.primary.main
      },
      info: {
        light: '#94a0a1',
        main: '#738491',
        dark: '#647486',
        // contrastText: will be calculated to contrast with palette.primary.main
      },
      success: {
        light: '#4caf50',
        main: '#2e7d32',
        dark: '#1b5e20',
        // contrastText: will be calculated to contrast with palette.primary.main
      },
      // Used by `getContrastText()` to maximize the contrast between
      // the background and the text.
      contrastThreshold: 3,
      // Used by the functions below to shift a color's luminance by approximately
      // two indexes within its tonal palette.
      // E.g., shift from Red 500 to Red 300 or Red 700.
      tonalOffset: 0.2,
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <WelcomeOverlay />
        <TopBar segments={trip.tripSegments} />
        <div>
          <Routes>
            <Route path="/" element={<Dashboard trip={trip} />}>
            </Route>
            <Route path="/segment" element={tripStatus === 'welcome' ?
              <Dashboard trip={trip} /> :
              <TripSegment tripSegments={trip.tripSegments} />}>
            </Route>
          </Routes>
        </div>
        <AppBar position="relative" color="primary" sx={{ top: 'auto', bottom: 0 }}>
          <Toolbar>
            <div className="footer-content">
              Made by&nbsp;<a style={{ color: 'white' }} href="https://mohaelder.github.io/me">MohaElder</a>
              &nbsp;with ❤️ and some overlanding spirit 🏔️;
              &nbsp;<a style={{ color: 'white' }} href="https://github.com/MohaElder/Trip">source code</a>
            </div>
          </Toolbar>
        </AppBar>
      </Router >
    </ThemeProvider>
  );
}


export default App;
