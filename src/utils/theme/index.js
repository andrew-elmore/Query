import { createTheme } from '@mui/material/styles';
import { blue, grey, green, red, yellow } from '@mui/material/colors'

const theme = createTheme({
  palette: {
    primary: {
      main: blue[600],
      light: blue[200],
      dark: blue[900],
      contrastText: blue[50]
    },
    secondary: {
      main: grey[600],
      light: grey[200],
      dark: grey[900],
      contrastText: grey[50]
    },
    success: {
      main: green[600],
      light: green[200],
      dark: green[900],
      contrastText: green[50]
    },
    warning: {
      main: yellow[600],
      light: yellow[200],
      dark: yellow[900],
      contrastText: yellow[50]
    },
    error: {
      main: red[600],
      light: red[200],
      dark: red[900],
      contrastText: red[50]
    },
  },
  spacing: (i) => 8 * i,
});

export default theme

