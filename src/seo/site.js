// Single source of truth for brand facts and answer-style content.
// Used by React pages AND by scripts/prerender.mjs, so keep this file plain JS
// (no JSX, no browser APIs). Only state facts the business can stand behind.

export const SITE_URL = "https://www.charsaddachappal.store";

export const BUSINESS = {
  name: "Charsadda Chappal",
  legalName: "Charsadda Chappal",
  url: SITE_URL,
  logo: `${SITE_URL}/images/logo-512.png`,
  image: `${SITE_URL}/images/og-image.jpg`,
  description:
    "Charsadda Chappal is an online store for handmade Charsadda and Peshawari chappals — Kaptaan, Zardari and Gol T styles — made from genuine leather by artisans in Charsadda, Khyber Pakhtunkhwa, and delivered across Pakistan.",
  phones: ["+92 310 2991736"],
  phonesE164: ["+923102991736"],
  whatsapp: "923102991736",
  email: "infocharsaddachappal@gmail.com",
  locality: "Charsadda",
  region: "Khyber Pakhtunkhwa",
  country: "PK",
  sameAs: [
    "https://www.instagram.com/infocharsaddachappal/",
    "https://www.facebook.com/people/Charsadda-Chappal/61590432431640/",
  ],
  currency: "PKR",
  returnDays: 30,
};

// Short, direct answers (40–60 words) under question headings: the format
// featured snippets, People Also Ask, voice assistants and AI Overviews quote.
export const FAQS = [
  {
    q: "What is a Charsadda chappal?",
    a: "A Charsadda chappal is a handmade Pashtun leather sandal from Charsadda in Khyber Pakhtunkhwa, Pakistan. It has an open toe, a T-strap or cross straps over the foot, a back strap with a buckle, and a thick stitched leather sole. It is a regional style of the Peshawari chappal.",
  },
  {
    q: "What is the difference between a Charsadda chappal and a Peshawari chappal?",
    a: "Peshawari chappal is the umbrella name for the traditional Khyber Pakhtunkhwa sandal. A Charsadda chappal is the version made in Charsadda, known for heavier hand stitching, a sturdier sole and designs such as Kaptaan, Zardari and Gol T. Many people use the two names interchangeably.",
  },
  {
    q: "What is a Kaptaan chappal?",
    a: "A Kaptaan chappal is a Charsadda/Peshawari chappal style named after \"Kaptaan\" (captain), the nickname of former Pakistani cricket captain and prime minister Imran Khan, who made it popular. It is worn with shalwar kameez for casual and formal occasions. Our handmade genuine-leather Kaptaan chappal costs PKR 5,000.",
  },
  {
    q: "How much does a Charsadda chappal cost in Pakistan?",
    a: "Handmade genuine-leather Charsadda chappals on our store cost PKR 4,000 to PKR 5,000: Gol T and Zardari chappals are PKR 4,000 and the Kaptaan chappal is PKR 5,000. Delivery is free across Pakistan. Prices for synthetic or machine-made copies are lower, but they wear out much faster.",
  },
  {
    q: "How do I choose the right Charsadda chappal size?",
    a: "Pick your usual Pakistani shoe size; we list each size with its EU equivalent, for example PAK 6 / EU 39, PAK 9 / EU 42 and PAK 13 / EU 46. Leather chappals fit snug at first and soften within a week. If you are between sizes, choose the larger size or message us on WhatsApp.",
  },
  {
    q: "How can I tell if a Charsadda chappal is handmade and genuine leather?",
    a: "A genuine handmade chappal has visible, slightly irregular hand stitching around the sole, layered leather on the sole edge, and a natural leather smell. Real leather creases and absorbs a drop of water; synthetic leather stays shiny and repels it. Glued, perfectly uniform soles usually indicate a machine-made copy.",
  },
  {
    q: "How do I care for leather chappals?",
    a: "Wipe your chappals with a dry cloth after use, keep them out of rain and direct sun, and let them air-dry naturally if they get wet. Apply leather polish or conditioner every few weeks to stop cracking, and store them in a dry, ventilated place.",
  },
  {
    q: "Do you deliver Charsadda chappals across Pakistan?",
    a: "Yes. We deliver to every city in Pakistan, including Karachi, Lahore, Islamabad, Rawalpindi, Peshawar and Quetta, with free delivery. Orders are paid in advance through EasyPaisa or JazzCash, and we confirm every order on WhatsApp before dispatch.",
  },
  {
    q: "What is your return and exchange policy?",
    a: "You can return or exchange unused chappals in their original packaging within 30 days of purchase. We also replace items that are defective, damaged or the wrong size. Message us on WhatsApp at +92 310 2991736 with your order details to start a return or exchange.",
  },
  {
    q: "How do I order a Charsadda chappal online?",
    a: "Open the shop, choose a style, select your colour and size, and tap Add to Cart or Buy Now. At checkout enter your name, phone, city and address, then pay through EasyPaisa or JazzCash. You can also order directly on WhatsApp at +92 310 2991736.",
  },
];

// Long-form buying guide (rendered at /charsadda-chappal-guide).
export const GUIDE = {
  path: "/charsadda-chappal-guide",
  title: "Charsadda Chappal Guide: Styles, Sizes, Prices & Care (2026)",
  description:
    "Everything to know before buying a Charsadda chappal: what it is, Kaptaan vs Zardari vs Gol T styles, sizing, price in Pakistan, how to spot genuine handmade leather, and care tips.",
  intro:
    "A Charsadda chappal is a handmade leather sandal from Charsadda, a district of Khyber Pakhtunkhwa near Peshawar, Pakistan. It is the best-known regional style of the Peshawari chappal, worn with shalwar kameez for everyday and formal occasions. This guide explains the styles, sizing, prices and care so you can buy the right pair.",
  sections: [
    {
      h: "Where do Charsadda chappals come from?",
      p: [
        "Charsadda chappals are made in Charsadda district, Khyber Pakhtunkhwa, where Pashtun leather-workers have made Peshawari-style sandals for generations. Each pair is cut, stitched and finished by hand.",
        "The design is open-toed with straps across the foot, a heel strap with buckle, and a thick sole built from several layers of leather stitched together, which is why a good pair lasts for years.",
      ],
    },
    {
      h: "Which Charsadda chappal styles are there?",
      list: [
        "Kaptaan chappal — the iconic style made popular by Imran Khan; suits both casual and formal wear. Black, PAK 6–13.",
        "Zardari chappal — premium handmade traditional chappal in pure genuine leather, built for comfort and years of wear. Brown or black, PAK 6–13.",
        "Gol T chappal — our most popular style: a traditional round-toe design with a T-strap for everyday comfort. Brown or black, PAK 6–13.",
      ],
    },
    {
      h: "How much does a Charsadda chappal cost?",
      table: {
        head: ["Style", "Material", "Price (PKR)"],
        rows: [
          ["Gol T Chappal", "Genuine leather, handmade", "4,000"],
          ["Zardari Chappal", "Genuine leather, handmade", "4,000"],
          ["Kaptaan Chappal", "Genuine leather, handmade", "5,000"],
        ],
      },
      p: ["Prices include free delivery anywhere in Pakistan."],
    },
    {
      h: "How do I find my Charsadda chappal size?",
      steps: [
        "Check the Pakistani size of shoes that fit you well.",
        "Match it to our size chart, which lists both PAK and EU sizes (for example PAK 9 / EU 42).",
        "If you are between sizes, choose the larger one — leather softens and moulds to your foot within a week.",
        "Still unsure? Send us your foot length on WhatsApp and we will recommend a size.",
      ],
    },
    {
      h: "How can I tell a genuine handmade chappal from a copy?",
      list: [
        "Hand stitching around the sole that is strong but slightly irregular.",
        "Layered leather visible on the edge of the sole instead of a moulded rubber block.",
        "Leather that creases naturally and absorbs a small drop of water.",
        "A natural leather smell rather than a chemical or plastic one.",
      ],
    },
    {
      h: "How should I care for my leather chappals?",
      steps: [
        "Wipe off dust with a dry cloth after wearing.",
        "Keep them away from rain and long exposure to direct sunlight.",
        "If they get wet, stuff them with paper and let them dry naturally — never near a heater.",
        "Polish or condition the leather every few weeks to prevent cracking.",
      ],
    },
  ],
};

export const PAGES = {
  "/": {
    title: "Charsadda Chappal | Handmade Peshawari Chappals Online in Pakistan",
    description:
      "Buy handmade Charsadda chappals online — Kaptaan, Zardari & Gol T styles in genuine leather from PKR 4,000. Made in Charsadda, KPK. Free delivery across Pakistan.",
  },
  "/shop": {
    title: "Shop Charsadda Chappals — Kaptaan, Zardari & Gol T | Charsadda Chappal",
    description:
      "Shop handmade genuine-leather Charsadda chappals: Kaptaan, Zardari and Gol T styles from PKR 4,000, all sizes PAK 6–13. Free delivery across Pakistan.",
  },
  "/collections": {
    title: "Charsadda Chappal Collections | Kaptaan, Zardari, Gol T",
    description:
      "Browse Charsadda chappal collections by style — Kaptaan, Zardari and Gol T — handmade from genuine leather in Charsadda, Khyber Pakhtunkhwa.",
  },
  "/contact": {
    title: "Contact Charsadda Chappal | WhatsApp +92 310 2991736",
    description:
      "Contact Charsadda Chappal for orders, sizing, delivery and returns. WhatsApp or call +92 310 2991736, email infocharsaddachappal@gmail.com.",
  },
  "/returns-refunds": {
    title: "Returns & Refunds Policy | Charsadda Chappal",
    description:
      "30-day returns and exchanges on unused Charsadda chappals in original packaging, plus replacements for defective, damaged or wrong-size pairs.",
  },
  "/privacy-policy": {
    title: "Privacy Policy | Charsadda Chappal",
    description: "How Charsadda Chappal collects, uses and protects your personal information.",
  },
  [GUIDE.path]: { title: GUIDE.title, description: GUIDE.description },
};

export const productSlugUrl = (p) => `${SITE_URL}/product/${p._id}`;
