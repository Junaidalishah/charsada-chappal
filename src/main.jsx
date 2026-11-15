import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";

import "./index.css";
import App from "./App.jsx";
import { preloadRoute } from "./preload";
import { ToastProvider } from "./context/ToastContext";
import { initAnalytics } from "./analytics";

initAnalytics();

const render = () => {
  // Prerendered <title>/<meta>/JSON-LD exist for crawlers; React re-creates
  // them per route, so drop the static copies to avoid duplicates.
  document.head.querySelectorAll("[data-prerender]").forEach((el) => el.remove());
  const container = document.getElementById("root");
  const app = (
    <StrictMode>
      <ToastProvider>
        <HelmetProvider>
          <App />
        </HelmetProvider>
      </ToastProvider>
    </StrictMode>
  );

  if (container.firstElementChild) {
    // Prerendered page: adopt the existing DOM instead of repainting it, so the
    // LCP image painted from HTML stays put. If anything differs (e.g. a
    // returning visitor's cart), React quietly re-renders on the client.
    hydrateRoot(container, app, {
      onRecoverableError: (err) => {
        if (import.meta.env.DEV) console.warn("[hydration]", err);
      },
    });
  } else {
    createRoot(container).render(app);
  }
};

// Load the current page's chunk first so hydration can match the prerendered
// HTML synchronously (no Suspense fallback in between).
preloadRoute(window.location.pathname).then(render);
