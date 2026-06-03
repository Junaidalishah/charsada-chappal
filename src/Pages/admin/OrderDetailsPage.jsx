import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

import API_URL from "../../config/api";
import { useAuth } from "../../context/AuthContext";

const statuses = [
  "Pending",
  "Processing",
  "Shipped",
  "Out For Delivery",
  "Delivered",
];

const OrderDetailsPage = () => {
  const { id } = useParams();
  const { userInfo } = useAuth();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/orders/${id}`, {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        });

        setOrder(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id, userInfo]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading Order...
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Order Not Found
      </div>
    );
  }

  const currentStatusIndex = statuses.indexOf(order.status);

  return (
    <div className="min-h-screen bg-[#f8f6f1]">
      <Navbar />

      <main className="max-w-6xl mx-auto px-6 pt-32 pb-20">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold">Order #{order._id.slice(-6)}</h1>

          <p className="text-gray-500 mt-2">
            Placed on {new Date(order.createdAt).toLocaleDateString()}
          </p>
        </div>

        {/* Status Tracker */}
        <div className="bg-white rounded-3xl p-8 border mb-10">
          <h2 className="text-2xl font-semibold mb-8">Order Status</h2>

          {order.status === "Cancelled" && (
            <div className="bg-red-100 text-red-700 px-4 py-3 rounded-xl mb-6">
              This order has been cancelled.
            </div>
          )}

          <div className="flex flex-wrap gap-4">
            {statuses.map((status, index) => (
              <div
                key={status}
                className={`px-4 py-2 rounded-full text-sm font-medium
                  ${
                    index <= currentStatusIndex
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-100 text-gray-500"
                  }`}
              >
                {index <= currentStatusIndex ? "✓ " : ""}
                {status}
              </div>
            ))}
          </div>
        </div>

        {/* Shipping Info */}
        <div className="bg-white rounded-3xl p-8 border mb-10">
          <h2 className="text-2xl font-semibold mb-6">Shipping Information</h2>

          <div className="space-y-2">
            <p>
              <strong>Name:</strong> {order.customerName}
            </p>
            <p>
              <strong>Phone:</strong> {order.phone}
            </p>
            <p>
              <strong>Address:</strong> {order.address}
            </p>
            <p>
              <strong>City:</strong> {order.city}
            </p>
            <p>
              <strong>Courier Name:</strong>{" "}
              {order.courierCompany || "Not Assigned Yet"}
            </p>
            <p>
              <strong>Tracking Number:</strong>{" "}
              {order.trackingNumber || "Not Available Yet"}
            </p>
          </div>
        </div>

        {/* Products */}
        <div className="bg-white rounded-3xl p-8 border mb-10">
          <h2 className="text-2xl font-semibold mb-6">Ordered Items</h2>

          <div className="space-y-6">
            {order.items.map((item, index) => (
              <div key={index} className="flex gap-5 border-b pb-5">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-24 h-24 rounded-xl object-cover"
                />

                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{item.title}</h3>

                  <p className="text-gray-500">Size: {item.size}</p>

                  <p className="text-gray-500">Color: {item.color}</p>

                  <p className="text-gray-500">Qty: {item.quantity}</p>
                </div>

                <div className="font-semibold">PKR {item.price}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Summary */}
        <div className="bg-white rounded-3xl p-8 border">
          <h2 className="text-2xl font-semibold mb-6">Order Summary</h2>

          <div className="space-y-3">
            <div className="flex justify-between">
              <span>Payment Method</span>
              <span>{order.paymentMethod}</span>
            </div>

            <div className="flex justify-between">
              <span>Order Status</span>
              <span>{order.status}</span>
            </div>

            <div className="border-t pt-4 flex justify-between font-bold text-xl">
              <span>Total</span>
              <span>PKR {order.totalAmount}</span>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default OrderDetailsPage;
