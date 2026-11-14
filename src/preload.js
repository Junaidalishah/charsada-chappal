import {
  Shop,
  Collection,
  ProductDetail,
  Guide,
  Contact,
  ReturnsRefunds,
  PrivacyPolicy,
  Cart,
  Checkout,
} from "./pages";

const ROUTE_PRELOADS = [
  [/^\/shop\/?$/, Shop],
  [/^\/collections\/?$/, Collection],
  [/^\/product\//, ProductDetail],
  [/^\/charsadda-chappal-guide\/?$/, Guide],
  [/^\/contact\/?$/, Contact],
  [/^\/returns-refunds\/?$/, ReturnsRefunds],
  [/^\/privacy-policy\/?$/, PrivacyPolicy],
  [/^\/cart\/?$/, Cart],
  [/^\/checkout\/?$/, Checkout],
];

export const preloadRoute = (pathname) => {
  const hit = ROUTE_PRELOADS.find(([re]) => re.test(pathname));
  return hit ? hit[1].preload().catch(() => {}) : Promise.resolve();
};

