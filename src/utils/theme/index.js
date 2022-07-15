import { createTheme } from '@mui/material/styles';
import { blue, grey } from '@mui/material/colors'

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
  },
});

export default theme

