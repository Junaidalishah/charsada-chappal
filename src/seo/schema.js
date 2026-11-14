// JSON-LD builders shared by React (via <Seo/>) and the build-time prerenderer.
import { BUSINESS, SITE_URL, FAQS, GUIDE } from "./site.js";

const ORG_ID = `${SITE_URL}/#organization`;
const SITE_ID = `${SITE_URL}/#website`;

const clean = (s = "") => String(s).replace(/\s+/g, " ").trim();
const titleCase = (s = "") => clean(s).replace(/\b\w/g, (c) => c.toUpperCase());

export const productName = (p) => {
  const n = titleCase(p.name);
  return /chappal/i.test(n) ? n : `${n} Chappal`;
};

export const productImages = (p) => {
  const imgs = (p.colors || []).flatMap((c) => c.images || []).filter(Boolean);
  return imgs.length ? [...new Set(imgs)] : [p.image].filter(Boolean);
};

export const organizationSchema = () => ({
  "@type": ["Organization", "OnlineStore"],
  "@id": ORG_ID,
  name: BUSINESS.name,
  url: SITE_URL,
  logo: { "@type": "ImageObject", url: BUSINESS.logo, width: 512, height: 512 },
  image: BUSINESS.image,
  description: BUSINESS.description,
  email: BUSINESS.email,
  telephone: BUSINESS.phonesE164[0],
  address: {
    "@type": "PostalAddress",
    addressLocality: BUSINESS.locality,
    addressRegion: BUSINESS.region,
    addressCountry: BUSINESS.country,
  },
  areaServed: { "@type": "Country", name: "Pakistan" },
  knowsAbout: [
    "Charsadda chappal",
    "Peshawari chappal",
    "Kaptaan chappal",
    "Zardari chappal",
    "Gol T chappal",
    "Handmade leather footwear",
  ],
  contactPoint: BUSINESS.phonesE164.map((t) => ({
    "@type": "ContactPoint",
    telephone: t,
    contactType: "customer service",
    areaServed: "PK",
    availableLanguage: ["en", "ur", "ps"],
  })),
  sameAs: BUSINESS.sameAs,
  hasMerchantReturnPolicy: returnPolicy(),
});

export const websiteSchema = () => ({
  "@type": "WebSite",
  "@id": SITE_ID,
  url: SITE_URL,
  name: BUSINESS.name,
  inLanguage: "en-PK",
  publisher: { "@id": ORG_ID },
  potentialAction: {
    "@type": "SearchAction",
    target: { "@type": "EntryPoint", urlTemplate: `${SITE_URL}/shop?q={search_term_string}` },
    "query-input": "required name=search_term_string",
  },
});

function returnPolicy() {
  return {
    "@type": "MerchantReturnPolicy",
    applicableCountry: "PK",
    returnPolicyCategory: "https://schema.org/MerchantReturnFiniteReturnWindow",
    merchantReturnDays: BUSINESS.returnDays,
    returnMethod: "https://schema.org/ReturnByMail",
    url: `${SITE_URL}/returns-refunds`,
  };
}

const shippingDetails = () => ({
  "@type": "OfferShippingDetails",
  shippingRate: { "@type": "MonetaryAmount", value: 0, currency: "PKR" },
  shippingDestination: { "@type": "DefinedRegion", addressCountry: "PK" },
});

export const faqSchema = (faqs = FAQS) => ({
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
});

export const breadcrumbSchema = (items) => ({
  "@type": "BreadcrumbList",
  itemListElement: items.map(([name, path], i) => ({
    "@type": "ListItem",
    position: i + 1,
    name,
    item: `${SITE_URL}${path}`,
  })),
});

export const productSchema = (p) => {
  const reviews = p.reviews || [];
  const url = `${SITE_URL}/product/${p._id}`;
  const node = {
    "@type": "Product",
    "@id": `${url}#product`,
    name: productName(p),
    url,
    image: productImages(p),
    description: clean(p.description),
    sku: p._id,
    category: "Apparel & Accessories > Shoes > Sandals",
    material: "Genuine leather",
    countryOfOrigin: "PK",
    brand: { "@type": "Brand", name: BUSINESS.name },
    color: (p.colors || []).map((c) => c.name).join(", ") || undefined,
    size: (p.sizes || []).filter((s) => !(p.disabledSizes || []).includes(s)),
    offers: {
      "@type": "Offer",
      url,
      priceCurrency: "PKR",
      price: Number(p.price),
      availability: p.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      itemCondition: "https://schema.org/NewCondition",
      seller: { "@id": ORG_ID },
      shippingDetails: shippingDetails(),
      hasMerchantReturnPolicy: returnPolicy(),
    },
  };
  if (reviews.length) {
    const avg = reviews.reduce((s, r) => s + (r.rating || 0), 0) / reviews.length;
    node.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: avg.toFixed(1),
      reviewCount: reviews.length,
      bestRating: 5,
      worstRating: 1,
    };
    node.review = reviews.slice(0, 5).map((r) => ({
      "@type": "Review",
      reviewRating: { "@type": "Rating", ratingValue: r.rating, bestRating: 5 },
      author: { "@type": "Person", name: r.name || "Customer" },
      reviewBody: clean(r.comment),
    }));
  }
  return node;
};

export const itemListSchema = (products, name = "Charsadda Chappals") => ({
  "@type": "ItemList",
  name,
  numberOfItems: products.length,
  itemListElement: products.map((p, i) => ({
    "@type": "ListItem",
    position: i + 1,
    url: `${SITE_URL}/product/${p._id}`,
    name: productName(p),
  })),
});

export const guideSchema = (dateModified) => ({
  "@type": "Article",
  "@id": `${SITE_URL}${GUIDE.path}#article`,
  headline: GUIDE.title,
  description: GUIDE.description,
  about: { "@type": "Thing", name: "Charsadda chappal" },
  author: { "@id": ORG_ID },
  publisher: { "@id": ORG_ID },
  mainEntityOfPage: `${SITE_URL}${GUIDE.path}`,
  image: BUSINESS.image,
  inLanguage: "en-PK",
  datePublished: "2026-11-14",
  dateModified: dateModified || "2026-11-14",
  speakable: { "@type": "SpeakableSpecification", cssSelector: ["#guide-intro", ".faq-answer"] },
});

export const graph = (...nodes) => ({
  "@context": "https://schema.org",
  "@graph": nodes.filter(Boolean),
});
