import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import axios from "axios";

import Navbar from "./Navbar";
import Footer from "./Footer";

import API_URL from "../config/api";
import { useCart } from "../context/CartContext";
import { createWhatsAppProductMessage } from "../utils/whatsapp";
import { Phone } from "lucide-react";
import { Helmet } from "react-helmet-async";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, clearCart } = useCart();
  const { userInfo } = useAuth();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [zoomStyle, setZoomStyle] = useState({});
  const [isZooming, setIsZooming] = useState(false);
  const phoneNumber = "923102991736";
  // Can Review
  const [canReview, setCanReview] = useState(false);

  // Review Form
  const [reviewData, setReviewData] = useState({
    rating: 5,
    comment: "",
  });

  const [showFullscreen, setShowFullscreen] = useState(false);

  // ================= FETCH PRODUCT =================
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`${API_URL}/products/${id}`);

        setProduct(data);

        // Fetch random products
        const productsResponse = await axios.get(`${API_URL}/products`);

        const randomProducts = productsResponse.data
          .filter((item) => item._id !== data._id)
          .sort(() => Math.random() - 0.5)
          .slice(0, 4);

        setRelatedProducts(randomProducts);

        // Default Color
        if (data.colors && data.colors.length > 0) {
          setSelectedColor(data.colors[0]);
          setSelectedImage(data.colors[0].images[0]);
        } else {
          setSelectedImage(data.image);
        }

        // Default Size (First Available)
        if (data.sizes?.length > 0) {
          setSelectedSize(data.sizes[0]);
        }

        // Check Review Access
        if (userInfo) {
          try {
            const response = await axios.get(
              `${API_URL}/products/${id}/can-review`,
              {
                headers: { Authorization: `Bearer ${userInfo.token}` },
              },
            );
            setCanReview(response.data.canReview);
          } catch (error) {
            console.log(error);
          }
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, userInfo]);

  useEffect(() => {
    if (product && window.fbq) {
      window.fbq("track", "ViewContent", {
        content_name: product.name,
        content_ids: [product._id],
        content_type: "product",
        value: product.price,
        currency: "PKR",
      });
    }
  }, [product]);

  // ================= LOADING =================
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading Product...
      </div>
    );
  }

  // ================= PRODUCT NOT FOUND =================
  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Product Not Found
      </div>
    );
  }

  // ================= ADD TO CART =================
  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Please select a size");
      return;
    }

    addToCart({
      id: product._id,
      title: product.name,
      price: product.price,
      quantity,
      image: selectedImage,
      color: selectedColor?.name || "",
      size: selectedSize,
    });

    if (window.fbq) {
      window.fbq("track", "AddToCart", {
        content_name: product.name,
        content_ids: [product._id],
        value: product.price,
        currency: "PKR",
      });
    }

    window.dispatchEvent(new Event("openCart"));
  };

  // ================= BUY NOW =================
  const handleBuyNow = () => {
    if (!selectedSize) {
      alert("Please select a size");
      return;
    }

    clearCart();

    addToCart({
      id: product._id,
      title: product.name,
      price: product.price,
      quantity,
      image: selectedImage,
      color: selectedColor?.name || "",
      size: selectedSize,
    });

    navigate("/checkout");
  };
  // ================= SUBMIT REVIEW =================
  const handleSubmitReview = async () => {
    try {
      const response = await axios.post(
        `${API_URL}/products/${id}/reviews`,
        {
          rating: reviewData.rating,
          comment: reviewData.comment,
        },
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        },
      );

      alert(response.data.message);

      // Refresh product
      const { data } = await axios.get(`${API_URL}/products/${id}`);
      setProduct(data);

      setCanReview(false);
      setReviewData({ rating: 5, comment: "" });
    } catch (error) {
      alert(error.response?.data?.message || "Review failed");
    }
  };

  const handleMouseMove = (e) => {
    const { left, top, width, height } =
      e.currentTarget.getBoundingClientRect();

    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;

    setZoomStyle({
      transformOrigin: `${x}% ${y}%`,
      transform: "scale(2)",
    });
  };

  const handleMouseLeave = () => {
    setZoomStyle({
      transform: "scale(1)",
    });

    setIsZooming(false);
  };

  const handleMouseEnter = () => {
    setIsZooming(true);
  };

  const handleBuyOnWhatsApp = () => {
    const message = createWhatsAppProductMessage(product);

    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message,
    )}`;

    window.open(url, "_blank");
  };

  return (
    <div className="min-h-screen bg-[#f8f6f1] text-[#061b0e]">
      {product && (
        <Helmet>
          <title>{product.name} | Charsadda Chappal</title>

          <meta
            name="description"
            content={product.description?.slice(0, 150)}
          />

          <meta property="og:title" content={product.name} />
          <meta property="og:description" content={product.description} />
          <meta
            property="og:image"
            content={product.colors?.[0]?.images?.[0] || product.image}
          />
          <meta property="og:type" content="product" />

          <meta property="og:url" content={window.location.href} />

          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Product",

              name: product.name,

              image: product.colors?.flatMap((c) => c.images) || [
                product.image,
              ],

              description: product.description,

              sku: product._id,

              brand: {
                "@type": "Brand",
                name: "Charsadda Chappal",
              },

              offers: {
                "@type": "Offer",

                url: `https://www.charsaddachappal.store/product/${product._id}`,

                priceCurrency: "PKR",

                price: product.price,

                availability:
                  product.stock > 0
                    ? "https://schema.org/InStock"
                    : "https://schema.org/OutOfStock",

                itemCondition: "https://schema.org/NewCondition",
              },

              aggregateRating:
                product.reviews?.length > 0
                  ? {
                      "@type": "AggregateRating",
                      ratingValue: (
                        product.reviews.reduce((sum, r) => sum + r.rating, 0) /
                        product.reviews.length
                      ).toFixed(1),

                      reviewCount: product.reviews.length,
                    }
                  : undefined,
            })}
          </script>
        </Helmet>
      )}

      <Navbar />

      <main className="max-w-[1600px] mx-auto px-6 md:px-10 lg:px-12 pt-28 pb-20">
        <div className="grid lg:grid-cols-[1.3fr_0.7fr] gap-14">
          {/* LEFT SIDE - IMAGES */}
          <div className="space-y-6">
            <div
              className="overflow-hidden rounded-3xl bg-white border border-black/10 cursor-zoom-in"
              onMouseMove={handleMouseMove}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <img
                src={selectedImage}
                alt={product.name}
                style={zoomStyle}
                onClick={() => setShowFullscreen(true)}
                className="
    w-full
    aspect-square
    lg:h-[750px]
    lg:aspect-auto
    object-cover
    transition-transform
    duration-200
  "
              />
            </div>

            {/* Gallery */}
            {selectedColor?.images?.filter((img) => img !== selectedImage)
              .length > 0 && (
              <div className="space-y-6">
                {selectedColor.images
                  .filter((img) => img !== selectedImage)
                  .map((img, index) => (
                    <div
                      key={index}
                      onClick={() => {
                        setSelectedImage(img);
                        setShowFullscreen(true);
                      }}
                      className="overflow-hidden rounded-3xl bg-white border border-black/10 transition-all duration-300 cursor-pointer hover:border-black/20"
                    >
                      <div className="overflow-hidden">
                        <img
                          src={img}
                          alt={`product-${index}`}
                          className="
      w-full
      aspect-square
      lg:h-[750px]
      lg:aspect-auto
      object-cover
      transition-transform
      duration-300
      hover:scale-[2]
      cursor-zoom-in
    "
                        />
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>

          {/* RIGHT SIDE - DETAILS */}
          <div className="lg:sticky lg:top-28 h-fit">
            <p className="mb-3 text-xs uppercase tracking-[0.3em] text-[#775a19]">
              {product.category}
            </p>

            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              {product.name}
            </h1>

            <p className="mt-5 text-3xl font-semibold">PKR {product.price}</p>

            {/* Stock Status */}
            <div className="mt-4">
              {product.stock > 0 ? (
                <span className="rounded-full bg-green-100 px-4 py-2 text-sm text-green-700">
                  In Stock ({product.stock})
                </span>
              ) : (
                <span className="rounded-full bg-red-100 px-4 py-2 text-sm text-red-700">
                  Out Of Stock
                </span>
              )}
            </div>

            {/* COLORS */}
            {product.colors?.length > 0 && (
              <div className="mt-10">
                <p className="mb-4 text-sm font-medium uppercase tracking-widest">
                  Color: {selectedColor?.name}
                </p>
                <div className="flex gap-3 flex-wrap">
                  {product.colors.map((color, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setSelectedColor(color);
                        setSelectedImage(color.images[0]);
                      }}
                      className={`overflow-hidden rounded-2xl border-2 transition ${
                        selectedColor?.name === color.name
                          ? "border-[#061b0e]"
                          : "border-transparent"
                      }`}
                    >
                      <img
                        src={color.images[0]}
                        alt={color.name}
                        className="h-20 w-16 object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* SIZES */}

            <div className="mt-10">
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm font-medium uppercase tracking-widest">
                  Size
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                {product.sizes?.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`min-w-[140px] px-5 py-3 rounded-xl border text-sm font-medium transition-all duration-200
          ${
            selectedSize === size
              ? "bg-[#061b0e] text-white border-[#061b0e] shadow-md"
              : "bg-white border-gray-300 hover:border-[#061b0e]"
          }
        `}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* DESCRIPTION */}
            <div className="mt-10 border-t border-black/10 pt-8">
              <h3 className="mb-4 text-lg font-semibold">
                Product Description
              </h3>
              <p className="leading-8 text-gray-600">{product.description}</p>
            </div>

            {/* DETAILS */}
            {product.details?.length > 0 && (
              <div className="mt-8">
                <ul className="space-y-3 text-gray-600">
                  {product.details.map((detail, index) => (
                    <li key={index} className="flex gap-3">
                      <span>•</span>
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* QUANTITY */}
            <div className="mt-10">
              <p className="mb-4 text-sm font-medium uppercase tracking-widest">
                Quantity
              </p>
              <div className="flex w-fit items-center overflow-hidden rounded-2xl border border-black/10 bg-white">
                <button
                  onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                  className="px-5 py-3 text-xl hover:bg-gray-100"
                >
                  −
                </button>
                <span className="px-6 font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-5 py-3 text-xl hover:bg-gray-100"
                >
                  +
                </button>
              </div>
            </div>

            <div className="mt-10 space-y-4">
              {/* First Row: Cart + Buy Now */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleAddToCart}
                  disabled={product.stock === 0 || !selectedSize}
                  className="flex-1 rounded-2xl bg-[#061b0e] px-8 py-4 font-medium text-white transition hover:opacity-90 disabled:opacity-50"
                >
                  Add To Cart
                </button>

                <button
                  onClick={handleBuyNow}
                  disabled={product.stock === 0 || !selectedSize}
                  className="flex-1 rounded-2xl border border-[#061b0e] px-8 py-4 font-medium text-[#061b0e] transition hover:bg-[#061b0e] hover:text-white disabled:opacity-50"
                >
                  Buy Now
                </button>
              </div>

              {/* Second Row: WhatsApp */}
              {/* <button
                onClick={handleBuyOnWhatsApp}
                className="
      w-full
      bg-green-600 hover:bg-green-700
      text-white font-semibold
      py-4 rounded-2xl
      flex items-center justify-center gap-2
      transition
    "
              >
                <Phone size={18} />
                Buy Now on WhatsApp
              </button> */}
            </div>
          </div>
        </div>

        {/* REVIEWS SECTION */}
        {product.reviews?.length > 0 && (
          <div className="mt-20 border-t border-black/10 pt-10">
            <h2 className="text-3xl font-bold text-[#061b0e] mb-8">
              Customer Reviews
            </h2>

            <div className="space-y-5">
              {product.reviews.map((review) => (
                <div
                  key={review._id}
                  className="rounded-3xl border border-black/5 bg-white p-6"
                >
                  <div className="flex items-center justify-between">
                    <h4 className="text-lg font-semibold">{review.name}</h4>

                    <span className="text-yellow-500">
                      {"⭐".repeat(review.rating)}
                    </span>
                  </div>

                  <p className="mt-4 leading-7 text-gray-600">
                    {review.comment}
                  </p>

                  <p className="mt-3 text-xs text-gray-400">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {canReview && (
          <div className="mt-16 border-t border-black/10 pt-10">
            <h2 className="text-3xl font-bold text-[#061b0e] mb-6">
              Write a Review
            </h2>

            <div className="rounded-3xl bg-white p-6 border border-black/5">
              <div className="mb-4">
                <label className="block mb-2 font-medium">Rating</label>

                <select
                  value={reviewData.rating}
                  onChange={(e) =>
                    setReviewData({
                      ...reviewData,
                      rating: Number(e.target.value),
                    })
                  }
                  className="w-full rounded-xl border p-3"
                >
                  <option value={5}>⭐⭐⭐⭐⭐</option>
                  <option value={4}>⭐⭐⭐⭐</option>
                  <option value={3}>⭐⭐⭐</option>
                  <option value={2}>⭐⭐</option>
                  <option value={1}>⭐</option>
                </select>
              </div>

              <div className="mb-6">
                <label className="block mb-2 font-medium">Comment</label>

                <textarea
                  rows="5"
                  value={reviewData.comment}
                  onChange={(e) =>
                    setReviewData({
                      ...reviewData,
                      comment: e.target.value,
                    })
                  }
                  className="w-full rounded-xl border p-3"
                  placeholder="Write your review..."
                />
              </div>

              <button
                onClick={handleSubmitReview}
                className="rounded-xl bg-[#061b0e] px-6 py-3 text-white"
              >
                Submit Review
              </button>
            </div>
          </div>
        )}

        {/* YOU MAY ALSO LIKE */}
        {relatedProducts.length > 0 && (
          <section className="mt-24 border-t border-black/10 pt-16">
            <div className="mb-10">
              <h2 className="text-3xl md:text-4xl font-bold text-[#061b0e]">
                You May Also Like
              </h2>

              <p className="mt-2 text-gray-500">
                Premium handcrafted footwear selected for you.
              </p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((item) => (
                <Link
                  key={item._id}
                  to={`/product/${item._id}`}
                  className="group"
                >
                  <div className="relative aspect-square overflow-hidden rounded-3xl bg-white border border-black/5">
                    <img
                      src={item.colors?.[0]?.images?.[0] || item.image}
                      alt={item.name}
                      className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  </div>

                  <h3 className="mt-4 font-semibold text-[#061b0e] group-hover:text-[#775a19] transition">
                    {item.name}
                  </h3>

                  <p className="mt-1 font-bold">PKR {item.price}</p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>

      {showFullscreen && (
        <div
          className="fixed inset-0 z-[9999] bg-black flex items-center justify-center"
          onClick={() => setShowFullscreen(false)}
        >
          <button
            onClick={() => setShowFullscreen(false)}
            className="absolute top-4 right-4 text-white text-4xl z-10"
          >
            ✕
          </button>

          <img
            src={selectedImage}
            alt={product.name}
            className="w-full h-full object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
      <Footer />
    </div>
  );
};

export default ProductDetail;
