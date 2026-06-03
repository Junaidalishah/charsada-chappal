import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

import DashboardLayout from "../../components/layout/DashboardLayout";
import API_URL from "../../config/api";
import { Link } from "react-router-dom";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const { userInfo } = useAuth();

  // ================= FETCH ORDERS =================
  const fetchOrders = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/orders`, {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      });

      setOrders(data);
    } catch (error) {
      console.log(error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  // ================= UPDATE STATUS =================
  const updateStatus = async (id, status) => {
    console.log("Updating:", id, status);
    try {
      await axios.put(
        `${API_URL}/orders/${id}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        },
      );

      fetchOrders();
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  // ================= USE EFFECT (FIX ADDED) =================
  useEffect(() => {
    if (userInfo?.token) {
      fetchOrders();
    }
  }, [userInfo]);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* TOP */}
        <div>
          <h1 className="text-3xl font-bold text-[#061b0e]">Orders</h1>
          <p className="mt-1 text-sm text-gray-500">
            Track and manage customer orders
          </p>
        </div>

        {/* TABLE */}
        <div className="rounded-3xl border border-black/5 bg-white p-6 shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px]">
              <thead>
                <tr className="border-b border-black/5 text-left text-sm text-gray-500">
                  <th className="pb-4">Order ID</th>
                  <th className="pb-4">Customer</th>
                  <th className="pb-4">Phone</th>
                  <th className="pb-4">Amount</th>
                  <th className="pb-4">Status</th>
                  <th className="pb-4">Change Status</th>
                  <th className="pb-4">View</th>
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  <tr>
                    <td className="py-10 text-center" colSpan="7">
                      Loading Orders...
                    </td>
                  </tr>
                ) : orders.length === 0 ? (
                  <tr>
                    <td className="py-10 text-center" colSpan="7">
                      No Orders Found
                    </td>
                  </tr>
                ) : (
                  orders.map((order) => (
                    <tr key={order._id} className="border-b border-black/5">
                      <td className="py-5 font-medium text-[#061b0e]">
                        #{order._id.slice(-6)}
                      </td>

                      <td>{order.customerName}</td>
                      <td>{order.phone}</td>

                      <td>PKR {order.totalAmount}</td>

                      <td>
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-medium
${
  order.status === "Delivered"
    ? "bg-green-100 text-green-700"
    : order.status === "Cancelled"
      ? "bg-red-100 text-red-700"
      : "bg-yellow-100 text-yellow-700"
}
`}
                        >
                          {order.status}
                        </span>
                      </td>

                      <td>
                        <select
                          value={order.status}
                          onChange={(e) =>
                            updateStatus(order._id, e.target.value)
                          }
                          className="rounded-xl border border-black/10 px-3 py-2 outline-none"
                        >
                          <option value="Pending">Pending</option>
                          <option value="Confirmed">Confirmed</option>
                          <option value="Processing">Processing</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Out For Delivery">
                            Out For Delivery
                          </option>
                          <option value="Delivered">Delivered</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </td>
                      <td>
                        <Link
                          to={`/admin/orders/${order._id}`}
                          className="rounded-xl bg-[#061b0e] px-4 py-2 text-white"
                        >
                          View
                        </Link>
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

export default Orders;
