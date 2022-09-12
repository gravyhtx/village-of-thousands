import { ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/system";

const MuiStyleProvider = ({ component }) => {

  const theme = createTheme({
    components: {
      MuiButton : {
        styleOverrides: {
          root: {
            fontSize: 'inherit',
          }
        }
      }
    },
    typography: {
      button: {
        fontSize: 'inherit',
      }
    }
  });

  return (
    <ThemeProvider theme={theme}>
      { component }
    </ThemeProvider>
  )

}

export default MuiStyleProvider;