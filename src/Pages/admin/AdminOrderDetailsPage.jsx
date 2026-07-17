import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import DashboardLayout from "../../components/layout/DashboardLayout";
import API_URL from "../../config/api";
import { useAuth } from "../../context/AuthContext";

const AdminOrderDetailsPage = () => {
  const { id } = useParams();
  const { userInfo } = useAuth();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [courierCompany, setCourierCompany] = useState("");
  const [trackingNumber, setTrackingNumber] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/orders/${id}`, {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        });

        setOrder(data);
        setCourierCompany(data.courierCompany || "");
        setTrackingNumber(data.trackingNumber || "");
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id, userInfo]);

  const getPaymentDisplay = (method) => {
    if (method === "cod") return "Cash on Delivery";
    if (method === "online") return "EasyPaisa / JazzCash";
    return method || "N/A";
  };

  const saveTrackingInfo = async () => {
    try {
      setSaving(true);
      const { data } = await axios.put(
        `${API_URL}/orders/${order._id}`,
        {
          status: order.status,
          courierCompany,
          trackingNumber,
        },
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        },
      );

      setOrder(data);
      alert("Tracking information updated successfully");
    } catch (error) {
      console.log(error);
      alert("Failed to update tracking information");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div>Loading Order...</div>
      </DashboardLayout>
    );
  }

  if (!order) {
    return (
      <DashboardLayout>
        <div>Order Not Found</div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold">Order #{order._id.slice(-6)}</h1>
          <p className="text-gray-500 mt-2">
            {new Date(order.createdAt).toLocaleDateString()}
          </p>
        </div>

        {/* CUSTOMER INFO */}
        <div className="bg-white p-6 rounded-3xl border">
          <h2 className="text-xl font-semibold mb-4">Customer Information</h2>
          <div className="space-y-2">
            <p>
              <strong>Name:</strong> {order.customerName}
            </p>
            <p>
              <strong>Email:</strong> {order.user?.email || order.email}
            </p>
            <p>
              <strong>Phone:</strong> {order.phone}
            </p>
            <p>
              <strong>City:</strong> {order.city}
            </p>
            <p>
              <strong>Address:</strong> {order.address}
            </p>
            <p>
              <strong>Payment Method:</strong>{" "}
              <span className="font-semibold text-green-700">
                {getPaymentDisplay(order.paymentMethod)}
              </span>
            </p>
          </div>
        </div>

        {/* PRODUCTS */}
        <div className="bg-white p-6 rounded-3xl border">
          <h2 className="text-xl font-semibold mb-6">Ordered Products</h2>
          <div className="space-y-6">
            {order.items.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-5 border-b pb-5"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-20 h-20 rounded-xl object-cover"
                />
                <div className="flex-1">
                  <h3 className="font-semibold">{item.title}</h3>
                  <p>Size: {item.size}</p>
                  <p>Color: {item.color}</p>
                  <p>Qty: {item.quantity}</p>
                </div>
                <div>PKR {item.price}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ORDER SUMMARY */}
        <div className="bg-white p-6 rounded-3xl border">
          <h2 className="text-xl font-semibold mb-6">Order Summary</h2>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span>Payment Method</span>
              <span className="font-semibold">
                {getPaymentDisplay(order.paymentMethod)}
              </span>
            </div>

            <div className="flex justify-between">
              <span>Order Status</span>
              <span>{order.status}</span>
            </div>

            <div>
              <label className="block mb-2 font-medium">Courier Company</label>
              <input
                type="text"
                value={courierCompany}
                onChange={(e) => setCourierCompany(e.target.value)}
                placeholder="Leopard Courier"
                className="w-full rounded-xl border px-4 py-3"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">Tracking Number</label>
              <input
                type="text"
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value)}
                placeholder="LP123456789"
                className="w-full rounded-xl border px-4 py-3"
              />
              <button
                onClick={saveTrackingInfo}
                disabled={saving}
                className="mt-4 rounded-xl bg-[#061b0e] px-5 py-3 text-white disabled:opacity-50"
              >
                {saving ? "Saving..." : "Save Tracking Info"}
              </button>
            </div>

            <div className="border-t pt-4 flex justify-between font-bold text-xl">
              <span>Total</span>
              <span>PKR {order.totalAmount}</span>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminOrderDetailsPage;
