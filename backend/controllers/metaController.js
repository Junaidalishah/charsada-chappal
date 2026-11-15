// Meta Conversions API relay. The storefront sends every Pixel event here as
// well (same event_id, so Meta deduplicates). This records events for visitors
// whose browser never loads the Pixel (no interaction, ad blockers, iOS).
//
// Env: META_PIXEL_ID, META_CAPI_TOKEN (Events Manager → Settings → Conversions
// API → Generate access token), optional META_TEST_EVENT_CODE, META_GRAPH_VERSION.
import crypto from "node:crypto";

const ALLOWED_EVENTS = new Set([
  "PageView",
  "ViewContent",
  "AddToCart",
  "InitiateCheckout",
  "Purchase",
  "Contact",
  "Lead",
  "Search",
]);

const sha256 = (v) => crypto.createHash("sha256").update(v).digest("hex");
const normEmail = (e) => String(e || "").trim().toLowerCase();
// Pakistani numbers: 03XXXXXXXXX -> 923XXXXXXXXX (digits only, country code first)
const normPhone = (p) => {
  const d = String(p || "").replace(/\D/g, "");
  if (d.startsWith("0")) return `92${d.slice(1)}`;
  return d;
};
const normCity = (c) => String(c || "").toLowerCase().replace(/[^a-z]/g, "");

export const relayMetaEvent = async (req, res) => {
  const token = process.env.META_CAPI_TOKEN;
  const pixelId = process.env.META_PIXEL_ID || "3263994340476127";
  // Not configured yet: accept and ignore so the storefront never errors.
  if (!token) return res.status(204).end();

  const { event_name, event_id, event_source_url, custom_data, fbp, fbc, user } = req.body || {};
  if (!ALLOWED_EVENTS.has(event_name) || typeof event_id !== "string") {
    return res.status(400).json({ message: "Invalid event" });
  }
  // Only accept events for our own site.
  if (event_source_url && !/^https:\/\/(www\.)?charsaddachappal\.store\//.test(event_source_url)) {
    return res.status(204).end();
  }

  const forwarded = String(req.headers["x-forwarded-for"] || "").split(",")[0].trim();
  const user_data = {
    client_ip_address: forwarded || req.socket?.remoteAddress,
    client_user_agent: req.headers["user-agent"],
    ...(typeof fbp === "string" && { fbp }),
    ...(typeof fbc === "string" && { fbc }),
  };
  // Customer details are only sent (hashed) for purchases.
  if (event_name === "Purchase" && user) {
    if (user.email) user_data.em = [sha256(normEmail(user.email))];
    if (user.phone) user_data.ph = [sha256(normPhone(user.phone))];
    if (user.city) user_data.ct = [sha256(normCity(user.city))];
    user_data.country = [sha256("pk")];
  }

  const payload = {
    data: [
      {
        event_name,
        event_time: Math.floor(Date.now() / 1000),
        event_id: event_id.slice(0, 100),
        event_source_url,
        action_source: "website",
        user_data,
        custom_data: custom_data && typeof custom_data === "object" ? custom_data : {},
      },
    ],
    ...(process.env.META_TEST_EVENT_CODE && { test_event_code: process.env.META_TEST_EVENT_CODE }),
  };

  // Respond immediately; the browser never waits on Meta.
  res.status(202).end();

  try {
    const version = process.env.META_GRAPH_VERSION || "v24.0";
    const r = await fetch(
      `https://graph.facebook.com/${version}/${pixelId}/events?access_token=${encodeURIComponent(token)}`,
      { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) },
    );
    if (!r.ok) console.warn("[meta-capi]", r.status, (await r.text()).slice(0, 300));
  } catch (err) {
    console.warn("[meta-capi]", err.message);
  }
};
