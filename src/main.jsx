import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import ReactGA from "react-ga4";

import "./index.css";
import App from "./App.jsx";
import { ToastProvider } from "./context/ToastContext";

// GA4 init
ReactGA.initialize("G-DPNZJM55JZ");

// Meta Pixel
const PIXEL_ID = "3263994340476127";

(function () {
  if (typeof window === "undefined") return;
  if (window.fbq) return;

  window.fbq = function () {
    window.fbq.callMethod
      ? window.fbq.callMethod.apply(window.fbq, arguments)
      : window.fbq.queue.push(arguments);
  };

  window._fbq = window.fbq;
  window.fbq.push = window.fbq;
  window.fbq.loaded = true;
  window.fbq.version = "2.0";
  window.fbq.queue = [];

  const script = document.createElement("script");
  script.async = true;
  script.src = "https://connect.facebook.net/en_US/fbevents.js";
  document.head.appendChild(script);

  window.fbq("init", PIXEL_ID);
  window.fbq("track", "PageView");
})();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ToastProvider>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </ToastProvider>
  </StrictMode>,
);
