'use client';
import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import { raleway, roboto } from '@/lib/fonts';

// Accent colour (df-portfolio's #F2674E coral) used for the "open the app" CTAs.
declare module '@mui/material/styles' {
  interface Palette {
    accent: Palette['primary'];
  }
  interface PaletteOptions {
    accent?: PaletteOptions['primary'];
  }
}
declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    accent: true;
  }
}

const theme = createTheme({
  typography: {
    fontFamily: raleway.style.fontFamily,
    h1: {
      margin: '45px 0px',
      fontWeight: 'normal',
    },
    h2: {
      fontSize: 'clamp(1.8rem, 3vw, 2.8rem)',
      fontWeight: 700,
      lineHeight: 1.2,
      margin: '0 0 2rem',
      textAlign: 'left',
      fontFamily: roboto.style.fontFamily,
    },
    h3: {
      margin: '1rem 0rem',
    },
    body1: {
      marginBottom: '1rem',
      fontSize: '1rem',
      lineHeight: 1.75,
    },
    body2: {
      marginBottom: '1rem',
      fontSize: '0.9rem',
      lineHeight: 1.65,
    },
  },
  palette: {
    primary: {
      main: '#4961b0',
    },
    secondary: {
      main: '#ffffff',
    },
    accent: {
      main: '#F2674E',
      contrastText: '#ffffff',
    },
  },
  components: {
    MuiTab: {
      styleOverrides: {
        textColorPrimary: {
          '&.Mui-selected': {
            color: '#32406e',
          },
        },
      },
    },
    MuiListItemText: {
      styleOverrides: {
        root: {
          marginBottom: 0,
        },
      },
    },
    MuiCardHeader: {
      styleOverrides: {
        title: {
          fontStyle: 'italic',
          fontSize: '1rem',
        },
        subheader: {
          fontStyle: 'italic',
          fontSize: '1rem',
        },
      },
    },
  },
});

// Skip h2/body1/body2 so their explicit reference-matched sizes (h2 uses a
// self-responsive clamp; body sizes are fixed) aren't overridden by the
// auto-generated responsive breakpoints. Other headings still scale responsively.
export default responsiveFontSizes(theme, {
  variants: ['h1', 'h3', 'h4', 'h5', 'h6'],
});
