import { useEffect, useState } from "react";
import axios from "axios";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";
import ShopHeader from "../components/ShopHeader";
import FilterSidebar from "../components/FilterSidebar";
import { useLocation, useNavigate } from "react-router-dom";

import API_URL from "../config/api";

function Shop() {
  const location = useLocation();
  const navigate = useNavigate();
  const category = new URLSearchParams(location.search).get("category");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedCategory, setSelectedCategory] = useState("");
  const [priceRange, setPriceRange] = useState({
    min: 0,
    max: 10000,
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

  const filteredProducts = category
    ? products.filter((product) => product.category === category)
    : products;

  return (
    <div className="font-body bg-background text-on-surface selection:bg-secondary-container">
      <Navbar />

      <main className="pt-24 min-h-screen">
        <ShopHeader />

        <section className="max-w-7xl mx-auto px-6 md:px-12 pb-32 flex flex-col lg:flex-row gap-12">
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
            {/* TOP */}
            <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between border-b border-black/5 pb-5">
              <div>
                <h2 className="text-2xl font-bold text-[#061b0e]">
                  {category || "All Products"}
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  {filteredProducts.length} Products Found
                </p>
              </div>

              {category && (
                <button
                  onClick={() => navigate("/shop")}
                  className="px-5 py-2 rounded-xl border border-[#061b0e] text-[#061b0e] hover:bg-[#061b0e] hover:text-white transition"
                >
                  View All Products
                </button>
              )}
            </div>

            {/* LOADING */}
            {loading ? (
              <div className="py-20 text-center">Loading products...</div>
            ) : products.length === 0 ? (
              <div className="py-20 text-center">No products found</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-16">
                {filteredProducts.map((product) => {
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
