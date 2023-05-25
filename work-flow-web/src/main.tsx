import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import CssBaseline from "@mui/material/CssBaseline";
import { FetchProvider } from "./context/FetchProvider.tsx";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <FetchProvider>
      <CssBaseline />
      <App />
    </FetchProvider>
  </React.StrictMode>
);
