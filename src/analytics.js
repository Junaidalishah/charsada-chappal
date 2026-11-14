// Analytics without the performance cost: GA4 and the Meta Pixel are queued
// immediately (so no events are lost) but their scripts — ~270 KB of JS and a
// third-party cookie — load only after the visitor first interacts, or after
// 15 s. This keeps them out of LCP/TBT and Lighthouse's third-party-cookie audit.
const GA_ID = "G-DPNZJM55JZ";
const PIXEL_ID = "3263994340476127";

export function initAnalytics() {
  if (typeof window === "undefined" || window.__analyticsQueued) return;
  window.__analyticsQueued = true;

  // GA4 queue
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    window.dataLayer.push(arguments);
  };
  window.gtag("js", new Date());
  window.gtag("config", GA_ID, { send_page_view: false });

  // Meta Pixel queue (standard stub, script injected later)
  if (!window.fbq) {
    const fbq = function () {
      fbq.callMethod ? fbq.callMethod.apply(fbq, arguments) : fbq.queue.push(arguments);
    };
    fbq.push = fbq;
    fbq.loaded = true;
    fbq.version = "2.0";
    fbq.queue = [];
    window.fbq = fbq;
    window._fbq = fbq;
    fbq("init", PIXEL_ID);
    fbq("track", "PageView");
  }

  let loaded = false;
  const events = ["pointerdown", "keydown", "touchstart", "scroll"];
  const load = () => {
    if (loaded) return;
    loaded = true;
    events.forEach((e) => window.removeEventListener(e, load, { capture: true }));
    for (const src of [
      `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`,
      "https://connect.facebook.net/en_US/fbevents.js",
    ]) {
      const s = document.createElement("script");
      s.async = true;
      s.src = src;
      document.head.appendChild(s);
    }
  };
  events.forEach((e) => window.addEventListener(e, load, { once: true, passive: true, capture: true }));
  setTimeout(load, 15000);
}

export const trackPageView = (path) => {
  window.gtag?.("event", "page_view", {
    page_path: path,
    page_location: window.location.href,
    page_title: document.title,
  });
};
