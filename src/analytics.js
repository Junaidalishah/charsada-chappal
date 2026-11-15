// Analytics, set up the way Google and Meta recommend for fast sites:
//
// • GA4 (first-party cookies) is queued immediately and its script is loaded
//   once the page has finished loading and the browser is idle. Every visit
//   that lasts past page load is measured, and it never delays first paint/LCP.
//
// • Meta: Pixel + Conversions API (CAPI) with deduplication. Every event gets
//   an event_id and is sent twice — through the browser Pixel and server-side
//   via our backend (/api/meta/events) — and Meta merges the pair. The Pixel
//   script (which sets a third-party cookie and ~100 KB of JS) loads on the
//   visitor's first interaction; the server copy guarantees PageView/ViewContent
//   etc. are still recorded for visitors who never interact, are on iOS, or
//   block the Pixel.
import API_URL from "./config/api";

const GA_ID = "G-DPNZJM55JZ";
const PIXEL_ID = "3263994340476127";
const CAPI_URL = `${API_URL}/meta/events`;
// GA loads on the first interaction, or this long after the page is loaded
// and idle — whichever comes first.
const GA_FALLBACK_MS = 10000;

const load = (src) => {
  const s = document.createElement("script");
  s.async = true;
  s.src = src;
  document.head.appendChild(s);
};

const whenIdleAfterLoad = (fn) => {
  const idle = () =>
    "requestIdleCallback" in window ? requestIdleCallback(fn, { timeout: 3000 }) : setTimeout(fn, 1500);
  if (document.readyState === "complete") idle();
  else window.addEventListener("load", idle, { once: true });
};

// Runs fn once, on the visitor's first real interaction: a tap/click/key, or
// scrolling the page itself (not programmatic scrolls inside widgets).
const onFirstInteraction = (fn) => {
  let done = false;
  const opts = { passive: true, capture: true };
  const inputs = ["pointerdown", "keydown", "touchstart"];
  const cleanup = () => {
    inputs.forEach((e) => window.removeEventListener(e, onInput, opts));
    window.removeEventListener("scroll", onScroll, { passive: true });
  };
  const fire = () => {
    if (done) return;
    done = true;
    cleanup();
    fn();
  };
  const onInput = (e) => e.isTrusted && fire();
  const onScroll = (e) => e.isTrusted && window.scrollY > 0 && fire();
  inputs.forEach((e) => window.addEventListener(e, onInput, opts));
  window.addEventListener("scroll", onScroll, { passive: true });
};

// ---------- first-party Meta identifiers (shared by Pixel and CAPI) ----------
const readCookie = (name) =>
  document.cookie.split("; ").find((c) => c.startsWith(`${name}=`))?.split("=")[1];
const writeCookie = (name, value) => {
  document.cookie = `${name}=${value}; max-age=${90 * 24 * 3600}; path=/; SameSite=Lax; Secure`;
};

function metaIds() {
  // _fbp: browser id. The Pixel reuses an existing _fbp cookie, so creating it
  // here lets server events match browser events before the Pixel loads.
  let fbp = readCookie("_fbp");
  if (!fbp) {
    fbp = `fb.1.${Date.now()}.${Math.floor(Math.random() * 1e10)}`;
    writeCookie("_fbp", fbp);
  }
  // _fbc: ad click id from ?fbclid=… (needed to attribute ad clicks).
  let fbc = readCookie("_fbc");
  const fbclid = new URLSearchParams(window.location.search).get("fbclid");
  if (fbclid && (!fbc || !fbc.endsWith(fbclid))) {
    fbc = `fb.1.${Date.now()}.${fbclid}`;
    writeCookie("_fbc", fbc);
  }
  return { fbp, fbc };
}

const newEventId = () =>
  window.crypto?.randomUUID?.() || `${Date.now()}-${Math.random().toString(36).slice(2)}`;

export function initAnalytics() {
  if (typeof window === "undefined" || window.__analyticsQueued) return;
  window.__analyticsQueued = true;

  // GA4 queue + idle load
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    window.dataLayer.push(arguments);
  };
  window.gtag("js", new Date());
  window.gtag("config", GA_ID, { send_page_view: false });
  let gaLoaded = false;
  const loadGA = () => {
    if (gaLoaded) return;
    gaLoaded = true;
    load(`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`);
  };
  onFirstInteraction(loadGA);
  whenIdleAfterLoad(() => setTimeout(loadGA, GA_FALLBACK_MS));

  // Meta Pixel queue (standard stub); script on first interaction
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
  }
  onFirstInteraction(() => load("https://connect.facebook.net/en_US/fbevents.js"));
}

/**
 * Track a Meta standard event in the browser Pixel and via the Conversions API.
 * `user` (optional: { email, phone, city }) is hashed server-side before it is
 * sent to Meta, and only used for purchase matching.
 */
export function trackMeta(eventName, customData = {}, user) {
  if (typeof window === "undefined") return;
  const eventId = newEventId();
  window.fbq?.("track", eventName, customData, { eventID: eventId });

  const body = JSON.stringify({
    event_name: eventName,
    event_id: eventId,
    event_source_url: window.location.href,
    custom_data: customData,
    ...metaIds(),
    ...(user ? { user } : {}),
  });
  try {
    fetch(CAPI_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
      keepalive: true,
    }).catch(() => {});
  } catch {
    /* analytics must never break the page */
  }
}

export const trackPageView = (path) => {
  window.gtag?.("event", "page_view", {
    page_path: path,
    page_location: window.location.href,
    page_title: document.title,
  });
  // Keep the server call off the critical path too.
  whenIdleAfterLoad(() => trackMeta("PageView"));
};
