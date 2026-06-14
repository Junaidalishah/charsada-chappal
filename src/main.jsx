import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import ReactGA from "react-ga4";
import ReactPixel from "react-facebook-pixel";

import "./index.css";
import App from "./App.jsx";
import { ToastProvider } from "./context/ToastContext";

// GA4 init
ReactGA.initialize("G-DPNZJM55JZ");

// Meta Pixel init
const pixelOptions = {
  autoConfig: true,
  debug: false,
};

ReactPixel.init("3263994340476127", pixelOptions);
ReactPixel.pageView();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ToastProvider>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </ToastProvider>
  </StrictMode>,
);
