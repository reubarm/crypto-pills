import { createTheme, responsiveFontSizes } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

// Create a theme instance.
let theme = createTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#000',
    },
    textPrimary: {
      main: '#000'
    },
    secondary: {
      main: '#222',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#FFF',
    },
  },
  typography: {
    fontFamily: [
      'Work Sans',
      'Roboto',
      'Arial',
      'sans-serif'
    ].join(','),
    h1: {
      fontWeight: '800',
    },
    h2: {
      fontWeight: '800',
    },
    h3: {
      fontWeight: '800',
    },
    h4: {
      fontWeight: '800',
    },
    h5: {
      fontWeight: '800',
    },
    h6: {
      fontWeight: '800',
    },
    body1: {
      fontSize: '1.25rem',
      marginBlockStart: '1rem'
    },
    body2: {
      fontSize: '1rem',
    }
  }
});

theme = responsiveFontSizes(theme);

export default theme;