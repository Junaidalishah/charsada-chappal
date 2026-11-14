import { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";
import ShopHeader from "../components/ShopHeader";
import FilterSidebar from "../components/FilterSidebar";
import useProducts, { ratingInfo } from "../hooks/useProducts";
import Seo from "../seo/Seo";
import { graph, itemListSchema, breadcrumbSchema, organizationSchema } from "../seo/schema.js";

function Shop() {
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const category = params.get("category");
  const query = (params.get("q") || "").trim().toLowerCase();

  // Build-time snapshot renders instantly; live data replaces it when the API answers.
  const products = useProducts();

  const [selectedCategory, setSelectedCategory] = useState("");
  const [priceRange, setPriceRange] = useState({ min: 0, max: 10000 });

  const categories = useMemo(
    () => [...new Set(products.map((p) => p.category).filter(Boolean))],
    [products],
  );

  const filteredProducts = products.filter((p) => {
    const price = Number(p.price);
    if (price < priceRange.min || price > priceRange.max) return false;
    if (selectedCategory && p.category !== selectedCategory) return false;
    if (category && p.category !== category) return false;
    if (query) {
      const hay = `${p.name} ${p.category} ${p.description}`.toLowerCase();
      if (!query.split(/\s+/).every((w) => hay.includes(w))) return false;
    }
    return true;
  });

  return (
    <div className="font-body bg-background text-on-surface selection:bg-secondary-container">
      <Seo
        path="/shop"
        jsonLd={graph(
          organizationSchema(),
          itemListSchema(products),
          breadcrumbSchema([
            ["Home", "/"],
            ["Shop", "/shop"],
          ]),
        )}
      />
      <Navbar />

      <main className="pt-24 min-h-screen">
        <ShopHeader />

        <section
          aria-label="Products"
          className="max-w-7xl mx-auto px-6 md:px-12 pb-32 flex flex-col lg:flex-row gap-12"
        >
          {/* FILTER SIDEBAR */}
          <div className="w-full lg:w-72">
            <FilterSidebar
              categories={categories}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              priceRange={priceRange}
              setPriceRange={setPriceRange}
            />
          </div>

          {/* PRODUCTS */}
          <div className="flex-grow">
            <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between border-b border-black/5 pb-5">
              <div>
                <h2 className="text-2xl font-bold text-[#061b0e]">
                  {query ? `Results for “${params.get("q")}”` : category || "All Products"}
                </h2>

                <p className="mt-1 text-sm text-[#5f5a52]" aria-live="polite">
                  {filteredProducts.length} Products Found
                </p>
              </div>

              {(category || query) && (
                <button
                  type="button"
                  onClick={() => navigate("/shop")}
                  className="px-5 py-2 rounded-xl border border-[#061b0e] text-[#061b0e] hover:bg-[#061b0e] hover:text-white transition"
                >
                  View All Products
                </button>
              )}
            </div>

            {filteredProducts.length === 0 ? (
              <div className="py-20 text-center">No products found</div>
            ) : (
              <ul className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-16">
                {filteredProducts.map((product, i) => {
                  const rating = ratingInfo(product.reviews);

                  return (
                    <li key={product._id} className="relative">
                      <div className="absolute top-3 left-3 z-10 bg-white px-3 py-1 rounded-full text-xs font-medium shadow">
                        <span aria-hidden="true">⭐</span> {rating.avg} ({rating.count}
                        <span className="sr-only"> reviews</span>)
                      </div>

                      <ProductCard product={product} priority={i === 0} />
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default Shop;
