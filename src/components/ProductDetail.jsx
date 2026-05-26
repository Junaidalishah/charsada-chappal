import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

import Navbar from "./Navbar";
import Footer from "./Footer";

import API_URL from "../config/api";

import { useCart } from "../context/CartContext";

const ProductDetail = () => {
  const { id } = useParams();

  const { addToCart } = useCart();

  const { userInfo } = useAuth();

  const [product, setProduct] = useState(null);

  const [loading, setLoading] = useState(true);

  const [selectedColor, setSelectedColor] = useState(null);

  const [selectedImage, setSelectedImage] = useState("");

  const [selectedSize, setSelectedSize] = useState("");

  const [quantity, setQuantity] = useState(1);

  // ⭐ CAN REVIEW
  const [canReview, setCanReview] = useState(false);

  // ⭐ REVIEW FORM
  const [reviewData, setReviewData] = useState({
    rating: 5,
    comment: "",
  });

  // ================= FETCH PRODUCT =================
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);

        const { data } = await axios.get(`${API_URL}/products/${id}`);

        setProduct(data);

        // DEFAULT COLOR
        if (data.colors && data.colors.length > 0) {
          setSelectedColor(data.colors[0]);

          setSelectedImage(data.colors[0].images[0]);
        } else {
          setSelectedImage(data.image);
        }

        // DEFAULT SIZE
        if (data.sizes?.length > 0) {
          setSelectedSize(data.sizes[0]);
        }

        // ⭐ CHECK REVIEW ACCESS
        if (userInfo) {
          try {
            const response = await axios.get(
              `${API_URL}/products/${id}/can-review`,
              {
                headers: {
                  Authorization: `Bearer ${userInfo.token}`,
                },
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
    addToCart({
      id: product._id,
      title: product.name,
      price: product.price,
      quantity,
      image: selectedImage,
      color: selectedColor?.name || "",
      size: selectedSize,
    });

    window.dispatchEvent(new Event("openCart"));
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
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        },
      );

      alert(response.data.message);

      // REFRESH PRODUCT
      const { data } = await axios.get(`${API_URL}/products/${id}`);

      setProduct(data);

      // REMOVE FORM AFTER REVIEW
      setCanReview(false);

      // CLEAR FORM
      setReviewData({
        rating: 5,
        comment: "",
      });
    } catch (error) {
      alert(error.response?.data?.message || "Review failed");
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f6f1] text-[#061b0e]">
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 md:px-12 pt-28 pb-20">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* LEFT SIDE */}
          <div className="space-y-6">
            {/* MAIN IMAGE */}
            <div className="overflow-hidden rounded-3xl bg-white group border border-black/10">
              <img
                src={selectedImage}
                alt={product.name}
                className="w-full h-[750px] object-cover transition duration-700 group-hover:scale-[1.15]"
              />
            </div>

            {/* GALLERY */}
            {selectedColor?.images?.filter((img) => img !== selectedImage)
              .length > 0 && (
              <div className="space-y-6">
                {selectedColor.images
                  .filter((img) => img !== selectedImage)
                  .map((img, index) => (
                    <div
                      key={index}
                      onMouseEnter={() => setSelectedImage(img)}
                      className="overflow-hidden rounded-3xl bg-white border border-black/10 transition-all duration-300 cursor-pointer hover:border-black/20"
                    >
                      <img
                        src={img}
                        alt={`product-${index}`}
                        className="w-full h-[750px] object-cover transition duration-700 hover:scale-[1.15]"
                      />
                    </div>
                  ))}
              </div>
            )}
          </div>

          {/* RIGHT SIDE */}
          <div className="lg:sticky lg:top-28 h-fit">
            {/* CATEGORY */}
            <p className="mb-3 text-xs uppercase tracking-[0.3em] text-[#775a19]">
              {product.category}
            </p>

            {/* TITLE */}
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              {product.name}
            </h1>

            {/* PRICE */}
            <p className="mt-5 text-3xl font-semibold">PKR {product.price}</p>

            {/* STOCK */}
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
            {product.sizes?.length > 0 && (
              <div className="mt-10">
                <p className="mb-4 text-sm font-medium uppercase tracking-widest">
                  Size
                </p>

                <div className="grid grid-cols-4 gap-3">
                  {product.sizes.map((size) => {
                    const disabled = product.disabledSizes?.includes(size);

                    return (
                      <button
                        key={size}
                        disabled={disabled}
                        onClick={() => setSelectedSize(size)}
                        className={`py-3 border text-sm transition rounded-xl
                          ${
                            selectedSize === size
                              ? "bg-[#061b0e] text-white"
                              : "bg-white hover:border-black"
                          }
                          ${disabled ? "opacity-30 cursor-not-allowed" : ""}
                        `}
                      >
                        {size}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

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
                  className="px-5 py-3 text-xl"
                >
                  -
                </button>

                <span className="px-6 font-medium">{quantity}</span>

                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-5 py-3 text-xl"
                >
                  +
                </button>
              </div>
            </div>

            {/* BUTTONS */}
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className="flex-1 rounded-2xl bg-[#061b0e] px-8 py-4 font-medium text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Add To Cart
              </button>

              <button className="rounded-2xl border border-[#061b0e] px-8 py-4 font-medium text-[#061b0e] transition hover:bg-[#061b0e] hover:text-white">
                Buy Now
              </button>
            </div>
          </div>
        </div>

        {/* REVIEWS */}
        <div className="mt-20 border-t border-black/10 pt-10">
          <h2 className="text-3xl font-bold text-[#061b0e]">
            Customer Reviews
          </h2>

          {/* REVIEW FORM */}
          {userInfo && canReview && (
            <div className="mt-8 rounded-3xl border border-black/5 bg-white p-6">
              <h3 className="text-xl font-semibold">Write a Review</h3>

              <textarea
                rows="4"
                placeholder="Write your review..."
                value={reviewData.comment}
                onChange={(e) =>
                  setReviewData({
                    ...reviewData,
                    comment: e.target.value,
                  })
                }
                className="mt-4 w-full rounded-2xl border border-black/10 p-4 outline-none"
              />

              <select
                value={reviewData.rating}
                onChange={(e) =>
                  setReviewData({
                    ...reviewData,
                    rating: e.target.value,
                  })
                }
                className="mt-4 rounded-2xl border border-black/10 px-4 py-3"
              >
                <option value="5">5 Stars</option>
                <option value="4">4 Stars</option>
                <option value="3">3 Stars</option>
                <option value="2">2 Stars</option>
                <option value="1">1 Star</option>
              </select>

              <button
                onClick={handleSubmitReview}
                className="mt-5 rounded-2xl bg-[#061b0e] px-6 py-3 text-white"
              >
                Submit Review
              </button>
            </div>
          )}
          {/* REVIEW LIST */}
          <div className="mt-10 space-y-5">
            {product.reviews?.length > 0 ? (
              product.reviews.map((review) => (
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
              ))
            ) : (
              <p className="mt-4 text-gray-500">No reviews yet.</p>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetail;
