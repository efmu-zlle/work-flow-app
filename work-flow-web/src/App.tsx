import {
  Card,
  CardContent,
  CardMedia,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";

function App() {
  const customTheme = createTheme({
    typography: {
      fontFamily: ["Wix Madefor Display", "sans-serif"].join(","),
    },
  });

  return (
    <ThemeProvider theme={customTheme}>
      <SignUpPage />
      {/* <SignInPage /> */}
    </ThemeProvider>
  );
}

export default App;
