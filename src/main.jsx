import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";

import "./index.css";

import App from "./App.jsx";

import { ToastProvider } from "./context/ToastContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ToastProvider>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </ToastProvider>
  </StrictMode>,
);
