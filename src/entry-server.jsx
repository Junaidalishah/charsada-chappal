// Build-time renderer used by scripts/prerender.mjs (never shipped to browsers).
import { prerenderToNodeStream } from "react-dom/static";
import { StaticRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { AppShell } from "./App.jsx";
import { ToastProvider } from "./context/ToastContext";

const streamToString = async (stream) => {
  let out = "";
  for await (const chunk of stream) out += chunk.toString();
  return out;
};

export async function render(url) {
  const helmetContext = {};
  const { prelude } = await prerenderToNodeStream(
    <ToastProvider>
      <HelmetProvider context={helmetContext}>
        <AppShell Router={StaticRouter} routerProps={{ location: url }} />
      </HelmetProvider>
    </ToastProvider>,
  );
  const html = await streamToString(prelude);
  const h = helmetContext.helmet;
  const head = h
    ? [h.title, h.meta, h.link, h.script].map((x) => x.toString()).join("\n    ")
    : "";
  return { html, head };
}
