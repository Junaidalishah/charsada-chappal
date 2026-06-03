import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import API_URL from "../config/api";

const CollectionPage = () => {
  const navigate = useNavigate();

  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/products`);

        const grouped = {};

        data.forEach((product) => {
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

        setCollections(Object.values(grouped));
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCollections();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading Collections...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8f6f1] text-[#061b0e]">
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 md:px-12 pt-32 pb-24">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <p className="uppercase tracking-[0.3em] text-[#775a19] text-sm">
            Charsadda Craftsmanship
          </p>

          <h1 className="mt-4 text-5xl md:text-7xl font-bold">
            Our Collections
          </h1>

          <p className="mt-6 text-gray-600 leading-8">
            Discover handcrafted Charsadda Chappals made with tradition, comfort
            and timeless craftsmanship.
          </p>
        </div>

        {/* Collection Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {collections.map((collection) => (
            <div
              key={collection.category}
              onClick={() =>
                navigate(
                  `/shop?category=${encodeURIComponent(collection.category)}`,
                )
              }
              className="group cursor-pointer overflow-hidden rounded-3xl bg-white border border-black/10 hover:shadow-xl transition-all duration-300"
            >
              <div className="overflow-hidden">
                <img
                  src={collection.image}
                  alt={collection.category}
                  className="w-full h-[420px] object-cover transition duration-700 group-hover:scale-110"
                />
              </div>

              <div className="p-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold">{collection.category}</h2>

                  <span className="text-sm text-gray-500">
                    {collection.count} Products
                  </span>
                </div>

                <p className="mt-3 text-gray-600">
                  Explore our premium {collection.category} collection.
                </p>

                <div className="mt-5 font-medium text-[#061b0e]">
                  Explore Collection →
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CollectionPage;
