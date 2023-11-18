import { createTheme } from '@mui/material/styles';
const theme = createTheme({
  palette: {
    primary: {
      light: '#FFC7C7',
      main: '#7071E8',
      dark: '#002884',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000',
    },
  },
});


export default theme;