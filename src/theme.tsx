import { createTheme } from '@mui/material/styles';

// A custom theme for this app
const theme = createTheme({
  palette: {
    mode: 'light', // dark|light
  },
  typography: {
    button: {
      textTransform: 'none',
      fontWeight: 500,
    },
  },
});

export default theme;
