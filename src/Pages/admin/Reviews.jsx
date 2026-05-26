import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

import DashboardLayout from "../../components/layout/DashboardLayout";

import API_URL from "../../config/api";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);

  const [loading, setLoading] = useState(true);
  const { userInfo } = useAuth();

  // ================= FETCH REVIEWS =================
  const fetchReviews = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/products`);

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
      await axios.delete(
        `${API_URL}/products/${productId}/reviews/${reviewId}`,
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        },
      );

      fetchReviews();
    } catch (error) {
      console.log(error);
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

        {/* TABLE */}
        <div className="rounded-3xl border border-black/5 bg-white p-6 shadow-sm">
          <div className="overflow-x-auto">
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
