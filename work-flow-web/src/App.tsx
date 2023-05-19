import { ThemeProvider, createTheme } from "@mui/material";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";

function App() {
  const customTheme = createTheme({
    palette: {
      primary: {
        main: "#002233",
        dark: "#023459",
        light: "#B2A59F",
      },
    },
    typography: {
      fontFamily: ["Wix Madefor Display", "sans-serif"].join(","),
    },
  });

  return <ThemeProvider theme={customTheme}></ThemeProvider>;
}

export default App;
