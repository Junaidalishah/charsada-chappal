import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import API_URL from "../config/api";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await fetch(`${API_URL}/auth/forgot-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      setMessage(data.message);
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
            Forgot Password
          </h1>

          <p className="text-sm text-gray-500 text-center mb-6">
            Enter your email and we’ll send you a reset link
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              placeholder="Enter Email"
              className="w-full border rounded-lg p-3 sm:p-4 outline-none focus:ring-2 focus:ring-black"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-black text-white py-3 rounded-lg hover:opacity-90 transition"
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </button>
          </form>

          {message && (
            <p className="mt-4 text-center text-sm text-green-600">{message}</p>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
};

export default ForgotPassword;
