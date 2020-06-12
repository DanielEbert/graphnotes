import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#b5ffff',
      main: '#80d8ff',
      dark: '#49a7cc',
      contrastText: '#000000',
    },
    secondary: {
      light: '#ffbdaf',
      main: '#ff8b80',
      dark: '#c85b53',
      contrastText: '#000000',
    },
  },
})

export default theme;