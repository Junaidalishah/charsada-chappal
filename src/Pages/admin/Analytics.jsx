import { useEffect, useState } from "react";
import axios from "axios";

import DashboardLayout from "../../components/layout/DashboardLayout";
import { useAuth } from "../../context/AuthContext";
import API_URL from "../../config/api";

const Analytics = () => {
  const [loading, setLoading] = useState(true);
  const { userInfo } = useAuth();

  const [analytics, setAnalytics] = useState({
    totalRevenue: 0,
    totalOrders: 0,
    totalCustomers: 0,
    returningCustomers: 0,
    monthlySales: [],
    recentOrders: [],
    topProducts: [],
  });

  // ================= FETCH ANALYTICS =================
  const fetchAnalytics = async () => {
    try {
      const [ordersRes, productsRes] = await Promise.all([
        axios.get(`${API_URL}/orders`, {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }),

        axios.get(`${API_URL}/products`),
      ]);

      const orders = ordersRes.data || [];
      const products = productsRes.data || [];

      // ================= TOTAL REVENUE =================
      const totalRevenue = orders.reduce(
        (acc, order) => acc + Number(order.totalAmount || 0),
        0,
      );

      // ================= CUSTOMERS =================
      const customerMap = {};

      orders.forEach((order) => {
        const customerKey = `${order.customerName}-${order.phone}` || order._id;

        if (!customerMap[customerKey]) {
          customerMap[customerKey] = 0;
        }

        customerMap[customerKey] += 1;
      });

      const totalCustomers = Object.keys(customerMap).length;

      // ================= RETURNING CUSTOMERS =================
      const returningCount = Object.values(customerMap).filter(
        (count) => count > 1,
      ).length;

      const returningCustomers =
        totalCustomers > 0
          ? Math.round((returningCount / totalCustomers) * 100)
          : 0;

      // ================= MONTHLY SALES =================
      const monthNames = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];

      const monthlyData = Array(12).fill(0);

      orders.forEach((order) => {
        const date = new Date(order.createdAt);
        const month = date.getMonth();

        monthlyData[month] += Number(order.totalAmount || 0);
      });

      const monthlySales = monthlyData.map((amount, index) => ({
        month: monthNames[index],
        amount,
      }));

      // ================= TOP PRODUCTS =================
      const productSales = {};

      orders.forEach((order) => {
        order.items?.forEach((item) => {
          const title = item.title;

          if (!title) return;

          productSales[title] = (productSales[title] || 0) + item.quantity;
        });
      });

      const topProducts = Object.entries(productSales)
        .map(([name, sold]) => ({
          name,
          sold,
        }))
        .sort((a, b) => b.sold - a.sold)
        .slice(0, 5);

      // ================= RECENT ORDERS =================
      const recentOrders = [...orders]
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 5);

      setAnalytics({
        totalRevenue,
        totalOrders: orders.length,
        totalCustomers,
        returningCustomers,
        monthlySales,
        recentOrders,
        topProducts,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // ================= USE EFFECT =================
  useEffect(() => {
    if (userInfo?.token) {
      fetchAnalytics();
    }
  }, [userInfo]);

  // ================= MAX GRAPH VALUE =================
  const maxSale =
    Math.max(...analytics.monthlySales.map((item) => item.amount), 1) || 1;

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* TOP */}
        <div>
          <h1 className="text-3xl font-bold text-[#061b0e]">Analytics</h1>

          <p className="mt-1 text-sm text-gray-500">
            Sales and performance overview
          </p>
        </div>

        {/* CARDS */}
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-3xl border border-black/5 bg-white p-6 shadow-sm">
            <p className="text-sm text-gray-500">Total Revenue</p>

            <h2 className="mt-3 text-4xl font-bold text-[#061b0e]">
              PKR {analytics.totalRevenue.toLocaleString()}
            </h2>
          </div>

          <div className="rounded-3xl border border-black/5 bg-white p-6 shadow-sm">
            <p className="text-sm text-gray-500">Total Orders</p>

            <h2 className="mt-3 text-4xl font-bold text-[#061b0e]">
              {analytics.totalOrders}
            </h2>
          </div>

          <div className="rounded-3xl border border-black/5 bg-white p-6 shadow-sm">
            <p className="text-sm text-gray-500">Customers</p>

            <h2 className="mt-3 text-4xl font-bold text-[#061b0e]">
              {analytics.totalCustomers}
            </h2>
          </div>

          <div className="rounded-3xl border border-black/5 bg-white p-6 shadow-sm">
            <p className="text-sm text-gray-500">Returning Customers</p>

            <h2 className="mt-3 text-4xl font-bold text-[#061b0e]">
              {analytics.returningCustomers}%
            </h2>
          </div>
        </div>

        {/* SALES CHART */}
        <div className="rounded-3xl border border-black/5 bg-white p-4 sm:p-8 shadow-sm">
          <div className="mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl font-bold text-[#061b0e]">
              Monthly Sales
            </h2>

            <p className="mt-1 text-xs sm:text-sm text-gray-500">
              Revenue generated each month
            </p>
          </div>

          {loading ? (
            <div className="py-20 text-center text-gray-500">
              Loading analytics...
            </div>
          ) : (
            <div className="overflow-x-auto">
              <div className="flex h-[260px] sm:h-[320px] min-w-[600px] items-end gap-2 sm:gap-4">
                {analytics.monthlySales.map((item, index) => {
                  const height = (item.amount / maxSale) * 240;

                  return (
                    <div
                      key={index}
                      className="flex flex-col items-center flex-1 min-w-[40px]"
                    >
                      {/* BAR */}
                      <div
                        className="w-full rounded-t-2xl bg-[#061b0e]"
                        style={{
                          height: `${height}px`,
                          minHeight: "10px",
                        }}
                      />

                      {/* LABEL */}
                      <span className="mt-2 text-[10px] sm:text-sm text-gray-500">
                        {item.month}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* BOTTOM */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* RECENT ORDERS */}
          <div className="rounded-3xl border border-black/5 bg-white p-6 shadow-sm">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-[#061b0e]">
                Recent Orders
              </h2>
            </div>

            <div className="space-y-4">
              {analytics.recentOrders.length === 0 ? (
                <p className="text-sm text-gray-500">No orders found</p>
              ) : (
                analytics.recentOrders.map((order) => (
                  <div
                    key={order._id}
                    className="flex items-center justify-between rounded-2xl border border-black/5 p-4"
                  >
                    <div>
                      <h4 className="font-semibold text-[#061b0e]">
                        {order.customerName || "Customer"}
                      </h4>

                      <p className="mt-1 text-sm text-gray-500">
                        {order.phone}
                      </p>
                    </div>

                    <div className="text-right">
                      <h4 className="font-bold text-[#061b0e]">
                        PKR {Number(order.totalAmount || 0).toLocaleString()}
                      </h4>

                      <p className="mt-1 text-xs text-gray-500">
                        {order.status}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* TOP PRODUCTS */}
          <div className="rounded-3xl border border-black/5 bg-white p-6 shadow-sm">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-[#061b0e]">
                Top Products
              </h2>
            </div>

            <div className="space-y-4">
              {analytics.topProducts.length === 0 ? (
                <p className="text-sm text-gray-500">No sales data found</p>
              ) : (
                analytics.topProducts.map((product, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between rounded-2xl border border-black/5 p-4"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#061b0e] text-sm font-bold text-white">
                        #{index + 1}
                      </div>

                      <div>
                        <h4 className="font-semibold text-[#061b0e]">
                          {product.name}
                        </h4>

                        <p className="mt-1 text-sm text-gray-500">
                          Best Seller
                        </p>
                      </div>
                    </div>

                    <div className="text-right">
                      <h4 className="text-xl font-bold text-[#061b0e]">
                        {product.sold}
                      </h4>

                      <p className="text-xs text-gray-500">Sold</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Analytics;
