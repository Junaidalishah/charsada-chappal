import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";
import API_URL from "../config/api";

const TopSelling = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/products?featured=true`);

        setProducts(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, []);

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

  return (
    <section className="bg-[#f8f6f1] py-16 md:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-14">
          <p className="mb-3 text-xs uppercase tracking-[0.3em] text-gray-500">
            Charsadda Heritage
          </p>

          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#061b0e]">
            🔥 Top Selling Charsadda Chappals
          </h2>
        </div>

        {loading ? (
          <div className="py-20 text-center">Loading products...</div>
        ) : (
          <div className="grid grid-cols-1 gap-x-8 gap-y-14 md:grid-cols-2 xl:grid-cols-3">
            {products.map((product) => {
              const rating = getRatingInfo(product.reviews);

              return (
                <div key={product._id} className="relative">
                  <div className="absolute top-2 left-2 z-10 bg-white px-2 py-1 rounded-full text-xs shadow">
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
  );
};

export default TopSelling;
