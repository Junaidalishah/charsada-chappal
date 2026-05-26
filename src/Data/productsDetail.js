const products = [
  {
    id: 1,
    title: "zardari chappal",
    price: 3000,
    description: "A timeless silhouette reimagined for the modern collector.",

    colors: [
      {
        name: "BLACK",
        images: ["/images/chappal2.png", "/images/chappal3.png"],
      },
      {
        name: "RED",
        images: ["/images/chappal4.png"],
      },
    ],

    sizes: ["S", "M", "L"],
    disabledSizes: ["XL"],

    details: [
      "Double-breasted front",
      "Signature silk-blend lining",
      "Hand-stitched lapel",
    ],
  },

  {
    id: 2,
    title: "Golti chappal",
    price: 400,
    description: "A timeless silhouette reimagined for the modern collector.",

    colors: [
      {
        name: "RED",
        images: ["/images/chappal4.png", "/images/chappal4.png"],
      },
      {
        name: "RED",
        images: ["/images/chappal4.png"],
      },
    ],

    sizes: ["S", "M", "L"],
    disabledSizes: ["XL"],

    details: [
      "Double-breasted front",
      "Signature silk-blend lining",
      "Hand-stitched lapel",
    ],
  },
];

export default products;
