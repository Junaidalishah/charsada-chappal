import { useEffect, useState } from "react";
import axios from "axios";

import { useAuth } from "../../context/AuthContext";

import DashboardLayout from "../../components/layout/DashboardLayout";

import API_URL from "../../config/api";

const Customers = () => {
  const [customers, setCustomers] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const { userInfo } = useAuth();

  // ================= FETCH CUSTOMERS =================
  const fetchCustomers = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/orders`, {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      });

      const groupedCustomers = {};

      data.forEach((order) => {
        const customerKey = `${order.customerName}-${order.phone}` || order._id;

        if (!groupedCustomers[customerKey]) {
          groupedCustomers[customerKey] = {
            id: order._id,
            name: order.customerName || "Customer",
            phone: order.phone || "Not Provided",
            city: order.city || "Not Provided",
            address: order.address || "Not Provided",
            totalOrders: 0,
            totalSpent: 0,
          };
        }

        groupedCustomers[customerKey].totalOrders += 1;

        groupedCustomers[customerKey].totalSpent +=
          Number(order.totalAmount) || 0;
      });

      setCustomers(Object.values(groupedCustomers));
    } catch (error) {
      console.log(error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userInfo?.token) {
      fetchCustomers();
    }
  }, [userInfo]);

  // ================= FILTER CUSTOMERS =================
  const filteredCustomers = customers.filter((customer) =>
    customer.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* HEADER */}
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-[#061b0e]">Customers</h1>

            <p className="mt-1 text-sm text-gray-500">
              Manage and track your store customers
            </p>
          </div>

          {/* SEARCH */}
          <div className="w-full lg:w-[400px]">
            <input
              type="text"
              placeholder="Search customer..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-2xl border border-black/10 bg-white px-5 py-4 outline-none focus:border-[#061b0e]"
            />
          </div>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          <div className="rounded-3xl border border-black/5 bg-white p-6">
            <p className="text-sm text-gray-500">Total Customers</p>

            <h2 className="mt-2 text-3xl font-bold text-[#061b0e]">
              {customers.length}
            </h2>
          </div>

          <div className="rounded-3xl border border-black/5 bg-white p-6">
            <p className="text-sm text-gray-500">Total Orders</p>

            <h2 className="mt-2 text-3xl font-bold text-[#061b0e]">
              {customers.reduce(
                (acc, customer) => acc + customer.totalOrders,
                0,
              )}
            </h2>
          </div>

          <div className="rounded-3xl border border-black/5 bg-white p-6">
            <p className="text-sm text-gray-500">Revenue From Customers</p>

            <h2 className="mt-2 text-2xl sm:text-3xl font-bold">
              PKR{" "}
              {customers
                .reduce((acc, customer) => acc + customer.totalSpent, 0)
                .toLocaleString()}
            </h2>
          </div>
        </div>

        {/* CUSTOMERS GRID */}
        {loading ? (
          <div className="rounded-3xl bg-white p-10 text-center">
            Loading customers...
          </div>
        ) : filteredCustomers.length === 0 ? (
          <div className="rounded-3xl bg-white p-10 text-center">
            No Customers Found
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {filteredCustomers.map((customer) => (
              <div
                key={customer.id}
                className="group rounded-3xl border border-black/5 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                {/* TOP */}
                <div className="flex items-center justify-between">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#061b0e] text-2xl font-bold text-white">
                    {customer.name?.charAt(0)?.toUpperCase() || "C"}
                  </div>

                  <div className="rounded-full bg-[#f4f1ea] px-4 py-2 text-xs font-medium text-[#061b0e]">
                    {customer.totalOrders} Orders
                  </div>
                </div>

                {/* INFO */}
                <div className="mt-5">
                  <h3 className="truncate text-lg sm:text-xl font-semibold text-[#061b0e]">
                    {customer.name}
                  </h3>

                  <p className="mt-2 text-sm text-gray-500">{customer.phone}</p>

                  <p className="mt-1 text-sm text-gray-500">{customer.city}</p>

                  <p className="mt-1 break-words text-sm text-gray-500">
                    {customer.address}
                  </p>
                </div>

                {/* STATS */}
                <div className="mt-6 rounded-2xl bg-[#f8f6f1] p-5">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Total Spent</span>

                    <span className="text-lg font-bold text-[#061b0e]">
                      PKR {customer.totalSpent.toLocaleString()}
                    </span>
                  </div>

                  <div className="mt-4 h-2 overflow-hidden rounded-full bg-black/5">
                    <div
                      className="h-full rounded-full bg-[#061b0e]"
                      style={{
                        width: `${Math.min(customer.totalOrders * 10, 100)}%`,
                      }}
                    />
                  </div>
                </div>

                {/* BUTTONS */}
                {/* <div className="mt-6 flex gap-3">
                  <button className="flex-1 rounded-2xl bg-[#061b0e] px-4 py-3 text-sm font-medium text-white transition hover:opacity-90">
                    View Orders
                  </button>

                  <button className="rounded-2xl border border-[#061b0e] px-4 py-3 text-sm font-medium text-[#061b0e] transition hover:bg-[#061b0e] hover:text-white">
                    Message
                  </button>
                </div> */}
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Customers;
