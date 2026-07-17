import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import api from "../../config/axios";
import DashboardLayout from "../../components/layout/DashboardLayout";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // ================= FETCH ORDERS =================
  const fetchOrders = async () => {
    try {
      const { data } = await api.get("/orders");
      setOrders(data);
    } catch (error) {
      console.log(error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  // ================= UPDATE STATUS =================
  const updateStatus = async (id, status) => {
    try {
      await api.put(`/orders/${id}`, { status });
      fetchOrders(); // Refresh list after update
    } catch (error) {
      console.log(error.response?.data || error.message);
      alert("Failed to update status");
    }
  };

  // ================= DELETE ORDER =================
  const deleteOrder = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this order?",
    );
    if (!confirmDelete) return;

    try {
      await api.delete(`/orders/${id}`);
      fetchOrders();
    } catch (error) {
      console.log(error.response?.data || error.message);
      alert("Failed to delete order");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#061b0e]">
            Orders
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Track and manage customer orders
          </p>
        </div>

        {/* TABLE */}
        <div className="rounded-3xl border border-black/5 bg-white p-6 shadow-sm">
          {/* Mobile View */}
          <div className="space-y-4 lg:hidden">
            {orders.map((order) => (
              <div
                key={order._id}
                className="rounded-2xl border bg-white p-4 shadow-sm"
              >
                <div className="flex justify-between">
                  <h3 className="font-semibold">#{order._id.slice(-6)}</h3>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${
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

                <div className="mt-3 space-y-2 text-sm">
                  <p>
                    <strong>Customer:</strong> {order.customerName}
                  </p>
                  <p>
                    <strong>Phone:</strong> {order.phone}
                  </p>
                  <p>
                    <strong>Amount:</strong> PKR {order.totalAmount}
                  </p>
                </div>

                <select
                  value={order.status}
                  onChange={(e) => updateStatus(order._id, e.target.value)}
                  className="mt-4 w-full rounded-xl border p-2"
                >
                  <option value="Pending">Pending</option>
                  <option value="Confirmed">Confirmed</option>
                  <option value="Processing">Processing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Out For Delivery">Out For Delivery</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                </select>

                <div className="mt-4 flex gap-2">
                  <Link
                    to={`/admin/orders/${order._id}`}
                    className="flex-1 rounded-xl bg-[#061b0e] py-2 text-center text-white"
                  >
                    View
                  </Link>
                  <button
                    onClick={() => deleteOrder(order._id)}
                    className="flex-1 rounded-xl bg-red-600 py-2 text-white"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop Table - WITHOUT Payment Method Column */}
          <div className="hidden lg:block overflow-x-auto">
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
                  <th className="pb-4">Delete</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td className="py-10 text-center" colSpan="8">
                      Loading Orders...
                    </td>
                  </tr>
                ) : orders.length === 0 ? (
                  <tr>
                    <td className="py-10 text-center" colSpan="8">
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
                          className={`rounded-full px-3 py-1 text-xs font-medium ${
                            order.status === "Delivered"
                              ? "bg-green-100 text-green-700"
                              : order.status === "Cancelled"
                                ? "bg-red-100 text-red-700"
                                : "bg-yellow-100 text-yellow-700"
                          }`}
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
                          className="rounded-xl bg-[#061b0e] px-3 py-2 text-xs sm:text-sm text-white hover:bg-black"
                        >
                          View
                        </Link>
                      </td>
                      <td>
                        <button
                          onClick={() => deleteOrder(order._id)}
                          className="rounded-xl bg-red-600 px-3 py-2 text-xs sm:text-sm text-white hover:bg-red-700"
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

export default Orders;
