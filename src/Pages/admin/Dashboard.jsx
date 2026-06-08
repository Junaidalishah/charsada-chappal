import { useEffect, useState } from "react";
import api from "../../config/axios";

import DashboardLayout from "../../components/layout/DashboardLayout";

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  // ================= FETCH DASHBOARD =================
  const fetchDashboard = async () => {
    try {
      const { data } = await api.get("/admin/dashboard");

      setStats(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <DashboardLayout>
        <div>Loading dashboard...</div>
      </DashboardLayout>
    );
  }

  if (!stats) {
    return (
      <DashboardLayout>
        <div className="rounded-2xl bg-red-50 p-4 text-red-600">
          Failed to load dashboard data.
        </div>
      </DashboardLayout>
    );
  }

  const cards = [
    {
      title: "Total Revenue",
      value: `PKR ${stats.totalRevenue.toLocaleString()}`,
      icon: "payments",
    },
    {
      title: "Orders",
      value: stats.totalOrders,
      icon: "shopping_bag",
    },
    {
      title: "Customers",
      value: stats.totalCustomers,
      icon: "groups",
    },
    {
      title: "Products",
      value: stats.totalProducts,
      icon: "inventory_2",
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* HEADING */}
        <div>
          <h1 className="text-3xl font-bold text-[#061b0e]">Dashboard</h1>

          <p className="mt-2 text-sm text-gray-500">
            Welcome back to your admin panel.
          </p>
        </div>

        {/* STATS */}
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {cards.map((item) => (
            <div
              key={item.title}
              className="rounded-3xl border border-black/5 bg-white p-6 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">{item.title}</p>

                  <h2 className="mt-2 text-3xl font-bold text-[#061b0e]">
                    {item.value}
                  </h2>
                </div>

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#f4f1e8]">
                  <span className="material-symbols-outlined text-[#061b0e]">
                    {item.icon}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* TOP CITIES */}
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="rounded-3xl bg-[#061b0e] p-6 text-white">
            <h2 className="text-xl font-semibold">Top Cities</h2>

            <div className="mt-8 space-y-5">
              {stats.cityStats?.map((city) => (
                <div
                  key={city._id}
                  className="flex items-center justify-between"
                >
                  <span>{city._id}</span>

                  <span>{city.count} Orders</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RECENT ORDERS */}
        <div className="rounded-3xl border border-black/5 bg-white p-6">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-[#061b0e]">
              Recent Orders
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px]">
              <thead>
                <tr className="border-b border-black/5 text-left text-sm text-gray-500">
                  <th className="pb-4">Customer</th>
                  <th className="pb-4">Products</th>
                  <th className="pb-4">Status</th>
                  <th className="pb-4">Amount</th>
                </tr>
              </thead>

              <tbody>
                {stats.recentOrders?.map((order) => (
                  <tr key={order._id} className="border-b border-black/5">
                    <td className="py-5">{order.customerName}</td>

                    <td>{order.items.length} Products</td>

                    <td>
                      <span className="rounded-full bg-green-100 px-3 py-1 text-xs text-green-700">
                        {order.status}
                      </span>
                    </td>

                    <td>PKR {order.totalAmount.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
