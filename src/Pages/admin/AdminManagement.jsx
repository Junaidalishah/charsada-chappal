import { useEffect, useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";

import API_URL from "../../config/api";
import { useAuth } from "../../context/AuthContext";
import DashboardLayout from "../../components/layout/DashboardLayout";

const AdminManagement = () => {
  const { userInfo } = useAuth();

  const [admins, setAdmins] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // 🚨 PROTECT PAGE
  if (userInfo?.role !== "superadmin") {
    return <Navigate to="/admin" replace />;
  }

  // FETCH ADMINS
  const fetchAdmins = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/auth/admins`, {
        headers: {
          Authorization: `Bearer ${userInfo?.token}`,
        },
      });

      setAdmins(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (userInfo?.token) {
      fetchAdmins();
    }
  }, [userInfo]);

  // CREATE ADMIN
  const createAdmin = async () => {
    try {
      await axios.post(
        `${API_URL}/auth/create-admin`,
        {
          name,
          email,
          password,
        },
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        },
      );

      alert("Admin created successfully");

      setName("");
      setEmail("");
      setPassword("");

      fetchAdmins();
    } catch (error) {
      alert(error.response?.data?.message || "Failed to create admin");
    }
  };

  // DELETE ADMIN
  const deleteAdmin = async (id) => {
    try {
      await axios.delete(`${API_URL}/auth/admins/${id}`, {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      });

      fetchAdmins();
    } catch (error) {
      alert(error.response?.data?.message || "Failed to delete admin");
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl">
        <h1 className="mb-6 text-3xl font-bold text-[#061b0e]">
          Admin Management
        </h1>

        {/* CREATE ADMIN */}
        <div className="mb-6 rounded-2xl border bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold">Create New Admin</h2>

          <div className="space-y-3">
            <input
              type="text"
              placeholder="Admin Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-xl border px-4 py-3"
            />

            <input
              type="email"
              placeholder="Admin Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border px-4 py-3"
            />

            <input
              type="password"
              placeholder="Temporary Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border px-4 py-3"
            />

            <button
              onClick={createAdmin}
              className="rounded-xl bg-[#061b0e] px-5 py-3 text-white transition hover:opacity-90"
            >
              Create Admin
            </button>
          </div>
        </div>

        {/* ADMIN LIST */}
        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold">Admin Users</h2>

          {admins.length === 0 ? (
            <p className="text-gray-500">No admins found.</p>
          ) : (
            admins.map((admin) => (
              <div
                key={admin._id}
                className="flex items-center justify-between border-b py-4 last:border-b-0"
              >
                <div>
                  <p className="font-semibold">{admin.name}</p>

                  <p className="text-sm text-gray-500">{admin.email}</p>

                  <span
                    className={`
                      mt-1 inline-block rounded-full px-2 py-1 text-xs
                      ${
                        admin.role === "superadmin"
                          ? "bg-purple-100 text-purple-700"
                          : "bg-blue-100 text-blue-700"
                      }
                    `}
                  >
                    {admin.role || "admin"}
                  </span>
                </div>

                {admin.role !== "superadmin" && admin._id !== userInfo._id && (
                  <button
                    onClick={() => deleteAdmin(admin._id)}
                    className="rounded-lg bg-red-50 px-3 py-2 text-red-600 transition hover:bg-red-100"
                  >
                    Delete
                  </button>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminManagement;
