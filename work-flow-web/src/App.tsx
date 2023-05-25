import { ThemeProvider, createTheme } from "@mui/material";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import SignUpPage from "./pages/SignUpPage";
import SignInPage from "./pages/SignInPage";
import NotFound from "./pages/NotFound";
import HomePage from "./pages/HomePage";
import TeamPage from "./pages/TeamPage";
import MemberPage from "./pages/MemberPage";
import { FetchContext } from "./context/FetchProvider";
import { useContext } from "react";

type Props = {
  children: JSX.Element;
};

function App() {
  const customTheme = createTheme({
    palette: {
      primary: {
        main: "#002233",
        dark: "#001926",
        light: "#EBE5D9",
      },
      divider: "#EBE5D9",
      secondary: {
        main: "#CEDFFF",
        dark: "#D7FFEF",
        light: "#D4F7FF",
      },
    },
    typography: {
      fontFamily: ["Wix Madefor Display", "sans-serif"].join(","),
    },
  });
  const { state } = useContext(FetchContext);

  const AuthSession = ({ children }: Props) =>
    state.currentUser ? children : <Navigate to="/" />;

  return (
    <ThemeProvider theme={customTheme}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              state.currentUser ? (
                <Navigate to="/home" replace />
              ) : (
                <SignInPage />
              )
            }
          />
          <Route path="sign-up" element={<SignUpPage />} />
          <Route
            path="home"
            element={
              <AuthSession>
                <HomePage />
              </AuthSession>
            }
          />
          <Route path="team" element={<TeamPage />} />
          <Route path="member" element={<MemberPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
