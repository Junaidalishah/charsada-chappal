import { useState } from "react";
import axios from "axios";
import API_URL from "../../config/api";

import { useAuth } from "../../context/AuthContext";
import DashboardLayout from "../../components/layout/DashboardLayout";

const ProfilePage = () => {
  const { userInfo } = useAuth();

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [name, setName] = useState(userInfo?.name || "");
  const [email, setEmail] = useState(userInfo?.email || "");

  const [resetPassword, setResetPassword] = useState("");

  const handlePasswordChange = async () => {
    try {
      await axios.put(
        `${API_URL}/auth/change-password`,
        {
          currentPassword: currentPassword || "",
          newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        },
      );

      alert("Password updated successfully");

      setCurrentPassword("");
      setNewPassword("");
    } catch (error) {
      alert(error.response?.data?.message || "Failed to update password");
    }
  };

  const handleProfileUpdate = async () => {
    try {
      await axios.put(
        `${API_URL}/auth/profile`,
        {
          name,
          email,
        },
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        },
      );

      alert("Profile updated successfully");
    } catch (error) {
      alert(error.response?.data?.message || "Update failed");
    }
  };

  const handleResetPassword = async () => {
    try {
      await axios.put(
        `${API_URL}/auth/reset-password`,
        {
          newPassword: resetPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        },
      );

      alert("Password reset successfully");

      setResetPassword("");
    } catch (error) {
      alert(error.response?.data?.message || "Reset failed");
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-3xl">
        <h1 className="mb-6 text-3xl font-bold text-[#061b0e]">My Profile</h1>

        <div className="rounded-3xl border bg-white p-8 shadow-sm">
          <div className="mb-8 flex items-center gap-4">
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-[#061b0e] text-3xl font-bold text-white">
              {userInfo?.name?.charAt(0).toUpperCase()}
            </div>

            <div>
              <h2 className="text-xl font-semibold">{userInfo?.name}</h2>

              <p className="text-gray-500">{userInfo?.email}</p>
            </div>
          </div>

          <div className="space-y-5">
            <div>
              <label className="mb-2 block text-sm font-medium">
                Full Name
              </label>

              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-xl border px-4 py-3"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">Email</label>

              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border px-4 py-3"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">Role</label>

              <input
                value="Super Admin"
                disabled
                className="w-full rounded-xl border bg-gray-50 px-4 py-3"
              />
            </div>

            <button
              onClick={handleProfileUpdate}
              className="rounded-xl bg-[#061b0e] px-5 py-3 text-white"
            >
              Update Profile
            </button>
          </div>

          {/*   Password Section */}
          <div className="mt-8 border-t pt-8">
            <h3 className="mb-4 text-xl font-semibold">Change Password</h3>

            <div className="space-y-4">
              <input
                type="password"
                placeholder="Current Password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full rounded-xl border px-4 py-3"
              />

              <input
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full rounded-xl border px-4 py-3"
              />

              <button
                onClick={handlePasswordChange}
                className="rounded-xl bg-[#061b0e] px-5 py-3 text-white"
              >
                Update Password
              </button>
            </div>
          </div>
          <div className="mt-8 border-t pt-8">
            <h3 className="mb-4 text-xl font-semibold text-red-600">
              Reset Password (Super Admin)
            </h3>

            <input
              type="password"
              placeholder="New Password"
              value={resetPassword}
              onChange={(e) => setResetPassword(e.target.value)}
              className="w-full rounded-xl border px-4 py-3"
            />

            <button
              onClick={handleResetPassword}
              className="mt-4 rounded-xl bg-red-600 px-5 py-3 text-white"
            >
              Reset Password
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ProfilePage;
