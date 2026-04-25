const products = [
  {
    id: 1,
    title: "Shirt",
    price: "$1,250",
    description: "A timeless silhouette reimagined for the modern collector.",

    colors: [
      {
        name: "Dark gray",
        images: ["/images/shirt1.png", "/images/shirt3.png"],
      },
      {
        name: "Light peach",
        images: ["/images/shirt2.png"],
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
    title: "Coat",
    price: "$1,250",
    description: "A timeless silhouette reimagined for the modern collector.",

    colors: [
      {
        name: "Deep green",
        images: ["/images/coat1.png", "/images/coat2.png", "/images/coat4.png"],
      },
      {
        name: "Dark gray",
        images: ["/images/coat3.png"],
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
