import { ThemeProvider, createTheme } from "@mui/material";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import SignUpPage from "./pages/SignUpPage";
import SignInPage from "./pages/SignInPage";
import NotFound from "./pages/NotFound";
import HomePage from "./pages/HomePage";
import MemberPage from "./pages/MemberPage";
import TodoPage from "./pages/TodoPage";
import TeamPage from "./pages/TeamPage";
import { useAppSelector } from "./hooks/useStore";

function App() {
  const { currentUser } = useAppSelector((state) => state.authSlice);

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

  return (
    <ThemeProvider theme={customTheme}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              currentUser ? <Navigate to="/home" replace /> : <SignInPage />
            }
          />
          <Route
            path="sign-up"
            element={
              currentUser ? <Navigate to="/home" replace /> : <SignUpPage />
            }
          />
          <Route
            path="home"
            element={!currentUser ? <Navigate to="/" replace /> : <HomePage />}
          />
          <Route path="member" element={<MemberPage />} />
          <Route path="team">
            <Route
              index
              element={
                !currentUser ? <Navigate to="/" replace /> : <TeamPage />
              }
            />
            <Route
              path="todo/:teamId"
              element={
                !currentUser ? <Navigate to="/" replace /> : <TodoPage />
              }
            />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
