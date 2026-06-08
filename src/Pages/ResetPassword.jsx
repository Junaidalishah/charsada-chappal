import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import API_URL from "../config/api";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(`${API_URL}/auth/reset-password/${token}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Password updated successfully");

        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      setMessage("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <main className="min-h-screen flex items-center justify-center px-4 sm:px-6 pt-24 bg-background">
        <div className="w-full max-w-md bg-white p-6 sm:p-10 rounded-2xl shadow-sm border">
          <h1 className="text-2xl sm:text-3xl font-bold mb-3 text-center">
            Reset Password
          </h1>

          <p className="text-sm text-gray-500 text-center mb-6">
            Create a new secure password
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="password"
              placeholder="New Password"
              className="w-full border rounded-lg p-3 sm:p-4 outline-none focus:ring-2 focus:ring-black"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full border rounded-lg p-3 sm:p-4 outline-none focus:ring-2 focus:ring-black"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-black text-white py-3 rounded-lg hover:opacity-90 transition"
            >
              {loading ? "Updating..." : "Update Password"}
            </button>
          </form>

          {message && (
            <p className="mt-4 text-center text-sm text-gray-700">{message}</p>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
};

export default ResetPassword;
