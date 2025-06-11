import { createTheme } from '@mui/material/styles';

// Define custom theme colors matching the existing gradient design
export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#ff9c27',
      dark: '#fd48ce',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#5498ff',
      dark: '#a131f9',
      contrastText: '#ffffff',
    },
    background: {
      default: '#ffffff',
      paper: '#f5f5f5',
    },
    text: {
      primary: '#213547',
      secondary: '#646464',
    },
  },
  typography: {
    fontFamily: 'Inter, system-ui, Avenir, Helvetica, Arial, sans-serif',
    h1: {
      fontSize: '3.2rem',
      fontWeight: 700,
      lineHeight: 1.1,
    },
    h2: {
      fontSize: '2.4rem',
      fontWeight: 600,
    },
    h3: {
      fontSize: '2rem',
      fontWeight: 600,
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 600,
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 600,
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          textTransform: 'none',
          fontWeight: 500,
          transition: 'all 0.25s ease-in-out',
          '&:hover': {
            transform: 'scale(1.05)',
          },
        },
        contained: {
          background: 'linear-gradient(125deg, #ff9c27 0%, #fd48ce 51.7%)',
          '&:hover': {
            background: 'linear-gradient(125deg, #e88a20 0%, #e542ba 51.7%)',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: 'linear-gradient(125deg, #ff9c27 0%, #fd48ce 51.7%)',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          transition: 'all 0.25s ease-in-out',
          '&:hover': {
            boxShadow: '0 6px 20px rgba(0, 0, 0, 0.15)',
            transform: 'translateY(-2px)',
          },
        },
      },
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
    },
  },
});

// Dark theme variant
export const darkTheme = createTheme({
  ...theme,
  palette: {
    ...theme.palette,
    mode: 'dark',
    background: {
      default: '#242424',
      paper: '#1a1a1a',
    },
    text: {
      primary: 'rgba(255, 255, 255, 0.87)',
      secondary: 'rgba(255, 255, 255, 0.6)',
    },
  },
});