import { useEffect, useState } from "react";
import axios from "axios";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";
import ShopHeader from "../components/ShopHeader";
import FilterSidebar from "../components/FilterSidebar";

import API_URL from "../config/api";

function Shop() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedCategory, setSelectedCategory] = useState("");
  const [priceRange, setPriceRange] = useState({
    min: 0,
    max: 50000,
  });

  // ================= FETCH PRODUCTS =================
  const fetchProducts = async () => {
    try {
      setLoading(true);

      let url = `${API_URL}/products?minPrice=${priceRange.min}&maxPrice=${priceRange.max}`;

      if (selectedCategory) {
        url += `&category=${selectedCategory}`;
      }

      const { data } = await axios.get(url);
      setProducts(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [selectedCategory, priceRange]);

  // ================= SAFE RATING CALC =================
  const getRatingInfo = (reviews) => {
    if (!reviews || reviews.length === 0) {
      return { avg: 0, count: 0 };
    }

    const total = reviews.reduce((acc, r) => acc + (r.rating || 0), 0);

    return {
      avg: (total / reviews.length).toFixed(1),
      count: reviews.length,
    };
  };

  const categories = [
    ...new Set(products.map((product) => product.category).filter(Boolean)),
  ];

  return (
    <div className="font-body bg-background text-on-surface selection:bg-secondary-container">
      <Navbar />

      <main className="pt-24 min-h-screen">
        <ShopHeader />

        <section className="max-w-7xl mx-auto px-6 md:px-12 pb-32 flex gap-12">
          {/* FILTER SIDEBAR */}
          <FilterSidebar
            categories={categories}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            priceRange={priceRange}
            setPriceRange={setPriceRange}
          />

          {/* PRODUCTS */}
          <div className="flex-grow">
            {/* TOP */}
            <div className="mb-10 flex items-center justify-between border-b border-black/5 pb-5">
              <div>
                <h2 className="text-2xl font-bold text-[#061b0e]">
                  Artisanal Collection
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  {products.length} Products Found
                </p>
              </div>
            </div>

            {/* LOADING */}
            {loading ? (
              <div className="py-20 text-center">Loading products...</div>
            ) : products.length === 0 ? (
              <div className="py-20 text-center">No products found</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-16">
                {products.map((product) => {
                  const rating = getRatingInfo(product.reviews);

                  return (
                    <div key={product._id} className="relative">
                      {/* ⭐ RATING BADGE */}
                      <div className="absolute top-3 left-3 z-10 bg-white px-3 py-1 rounded-full text-xs font-medium shadow">
                        ⭐ {rating.avg} ({rating.count})
                      </div>

                      <ProductCard product={product} />
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default Shop;
