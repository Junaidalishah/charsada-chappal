import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";

import ReactGA from "react-ga4";

import "./index.css";

import App from "./App.jsx";

import { ToastProvider } from "./context/ToastContext";
ReactGA.initialize("G-DPNZJM55JZ");
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ToastProvider>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </ToastProvider>
  </StrictMode>,
);
