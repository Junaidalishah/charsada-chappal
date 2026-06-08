import { useEffect, useState } from "react";

import api from "../../config/axios";
import DashboardLayout from "../../components/layout/DashboardLayout";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  // ================= FETCH REVIEWS =================
  const fetchReviews = async () => {
    try {
      const { data } = await api.get("/products");

      const allReviews = [];

      data.forEach((product) => {
        product.reviews?.forEach((review) => {
          allReviews.push({
            productId: product._id,
            reviewId: review._id,
            productName: product.name,
            reviewer: review.name,
            rating: review.rating,
            comment: review.comment,
            createdAt: review.createdAt,
          });
        });
      });

      setReviews(allReviews.reverse());
    } catch (error) {
      console.log(error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  // ================= DELETE REVIEW =================
  const handleDeleteReview = async (productId, reviewId) => {
    const confirmDelete = window.confirm("Delete this review?");

    if (!confirmDelete) return;

    try {
      await api.delete(`/products/${productId}/reviews/${reviewId}`);

      fetchReviews();
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* TOP */}
        <div>
          <h1 className="text-3xl font-bold text-[#061b0e]">Reviews</h1>

          <p className="mt-1 text-sm text-gray-500">
            Moderate customer product reviews
          </p>
        </div>

        <div className="space-y-4 lg:hidden">
          {loading ? (
            <div className="rounded-2xl border bg-white p-6 text-center">
              Loading reviews...
            </div>
          ) : reviews.length === 0 ? (
            <div className="rounded-2xl border bg-white p-6 text-center">
              No Reviews Found
            </div>
          ) : (
            reviews.map((review) => (
              <div
                key={review.reviewId}
                className="rounded-2xl border border-black/10 bg-white p-4 shadow-sm"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-semibold text-[#061b0e]">
                      {review.productName}
                    </h3>

                    <p className="text-sm text-gray-500">{review.reviewer}</p>
                  </div>

                  <span className="text-yellow-500">
                    {"⭐".repeat(review.rating)}
                  </span>
                </div>

                <p className="mt-3 text-sm text-gray-600 break-words">
                  {review.comment}
                </p>

                <p className="mt-3 text-xs text-gray-400">
                  {new Date(review.createdAt).toLocaleDateString()}
                </p>

                <button
                  onClick={() =>
                    handleDeleteReview(review.productId, review.reviewId)
                  }
                  className="mt-4 w-full rounded-xl bg-red-500 py-2 text-white"
                >
                  Delete Review
                </button>
              </div>
            ))
          )}
        </div>

        {/* TABLE */}
        <div className="rounded-3xl border border-black/5 bg-white p-6 shadow-sm">
          <div className="hidden lg:block overflow-x-auto">
            <table className="w-full min-w-[1000px]">
              <thead>
                <tr className="border-b border-black/5 text-left text-sm text-gray-500">
                  <th className="pb-4">Product</th>

                  <th className="pb-4">Reviewer</th>

                  <th className="pb-4">Rating</th>

                  <th className="pb-4">Comment</th>

                  <th className="pb-4">Date</th>

                  <th className="pb-4 text-right">Actions</th>
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  <tr>
                    <td className="py-10 text-center" colSpan="6">
                      Loading reviews...
                    </td>
                  </tr>
                ) : reviews.length === 0 ? (
                  <tr>
                    <td className="py-10 text-center" colSpan="6">
                      No Reviews Found
                    </td>
                  </tr>
                ) : (
                  reviews.map((review) => (
                    <tr
                      key={review.reviewId}
                      className="border-b border-black/5"
                    >
                      {/* PRODUCT */}
                      <td className="py-5 font-medium text-[#061b0e]">
                        {review.productName}
                      </td>

                      {/* REVIEWER */}
                      <td>{review.reviewer}</td>

                      {/* RATING */}
                      <td>{"⭐".repeat(review.rating)}</td>

                      {/* COMMENT */}
                      <td className="max-w-[300px]">
                        <p className="line-clamp-2 text-sm text-gray-600">
                          {review.comment}
                        </p>
                      </td>

                      {/* DATE */}
                      <td>{new Date(review.createdAt).toLocaleDateString()}</td>

                      {/* ACTION */}
                      <td className="text-right">
                        <button
                          onClick={() =>
                            handleDeleteReview(
                              review.productId,
                              review.reviewId,
                            )
                          }
                          className="rounded-xl bg-red-500 px-4 py-2 text-sm text-white hover:bg-red-600"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Reviews;
