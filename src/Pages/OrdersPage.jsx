import { useEffect, useState } from "react";
import axios from "axios";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import API_URL from "../config/api";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

const OrdersPage = () => {
  const { userInfo } = useAuth();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/orders/myorders`, {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        });

        setOrders(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [userInfo]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading Orders...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8f6f1]">
      <Navbar />

      <main className="max-w-6xl mx-auto px-6 pt-32 pb-20">
        <h1 className="text-4xl font-bold mb-10">My Orders</h1>

        {orders.length === 0 ? (
          <div className="bg-white rounded-3xl p-10 text-center border">
            <h2 className="text-2xl font-semibold">No Orders Yet</h2>

            <Link
              to="/shop"
              className="inline-block mt-4 px-6 py-3 bg-[#061b0e] text-white rounded-xl"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order._id}
                className="bg-white rounded-3xl border p-6 shadow-sm"
              >
                <div className="grid md:grid-cols-5 gap-6 items-center">
                  <div>
                    <p className="text-xs text-gray-500">Order ID</p>

                    <p className="font-semibold">#{order._id.slice(-6)}</p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500">Date</p>

                    <p>{new Date(order.createdAt).toLocaleDateString()}</p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500">Total</p>

                    <p className="font-semibold">PKR {order.totalAmount}</p>
                  </div>

                  <div>
                    <span
                      className={`px-4 py-2 rounded-full text-sm ${
                        order.status === "Delivered"
                          ? "bg-green-100 text-green-700"
                          : order.status === "Cancelled"
                            ? "bg-red-100 text-red-700"
                            : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>

                  <div>
                    <Link
                      to={`/orders/${order._id}`}
                      className="px-5 py-2 rounded-xl bg-[#061b0e] text-white"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default OrdersPage;
