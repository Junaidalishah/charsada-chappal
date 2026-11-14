import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import useProducts from "../hooks/useProducts";
import { cld, cldSrcSet } from "../utils/image";
import Seo from "../seo/Seo";
import { graph, breadcrumbSchema, organizationSchema } from "../seo/schema.js";

const titleCase = (s = "") => s.replace(/\b\w/g, (c) => c.toUpperCase());

const CollectionPage = () => {
  const products = useProducts();

  const grouped = {};
  products.forEach((product) => {
    const category = product.category;
    if (!grouped[category]) {
      grouped[category] = {
        category,
        image: product.colors?.[0]?.images?.[0] || product.image,
        count: 1,
      };
    } else {
      grouped[category].count += 1;
    }
  });
  const collections = Object.values(grouped);

  return (
    <div className="min-h-screen bg-[#f8f6f1] text-[#061b0e]">
      <Seo
        path="/collections"
        jsonLd={graph(
          organizationSchema(),
          {
            "@type": "CollectionPage",
            name: "Charsadda Chappal Collections",
            hasPart: collections.map((c) => ({
              "@type": "CollectionPage",
              name: titleCase(c.category),
              url: `https://www.charsaddachappal.store/shop?category=${encodeURIComponent(c.category)}`,
            })),
          },
          breadcrumbSchema([
            ["Home", "/"],
            ["Collections", "/collections"],
          ]),
        )}
      />
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 md:px-12 pt-32 pb-24">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <p className="uppercase tracking-[0.3em] text-[#6b5216] text-sm">
            Charsadda Craftsmanship
          </p>

          <h1 className="mt-4 text-4xl sm:text-5xl md:text-7xl font-bold">
            Our Collections
          </h1>

          <p className="mt-6 text-[#4b4740] leading-8">
            Discover handcrafted Charsadda Chappals made with tradition, comfort
            and timeless craftsmanship.
          </p>
        </div>

        {/* Collection Cards */}
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {collections.map((collection, i) => (
            <li key={collection.category}>
              <Link
                to={`/shop?category=${encodeURIComponent(collection.category)}`}
                className="group block overflow-hidden rounded-3xl bg-white border border-black/10 hover:shadow-xl transition-all duration-300 active:scale-[0.98]"
              >
                <div className="overflow-hidden">
                  <img
                    src={cld(collection.image, 800)}
                    srcSet={cldSrcSet(collection.image, [480, 640, 800, 1000])}
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, calc(100vw - 48px)"
                    alt={`${titleCase(collection.category)} collection`}
                    width="800"
                    height="800"
                    loading={i === 0 ? "eager" : "lazy"}
                    fetchPriority={i === 0 ? "high" : "auto"}
                    decoding={i === 0 ? "sync" : "async"}
                    className="w-full h-[280px] sm:h-[350px] md:h-[420px] object-cover transition duration-700 group-hover:scale-110"
                  />
                </div>

                <div className="p-6">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                    <h2 className="text-2xl font-bold">{titleCase(collection.category)}</h2>

                    <span className="text-sm text-[#5f5a52]">
                      {collection.count} Products
                    </span>
                  </div>

                  <p className="mt-3 text-[#4b4740]">
                    Explore our premium {titleCase(collection.category)} collection.
                  </p>

                  <div className="mt-5 font-medium text-[#061b0e]">
                    Explore Collection <span aria-hidden="true">→</span>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </main>

      <Footer />
    </div>
  );
};

export default CollectionPage;
