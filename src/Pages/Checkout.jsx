import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Loader from "../components/Loader";
import ButtonLoader from "../components/ButtonLoader";

import { useToast } from "../context/ToastContext";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { formatCurrency } from "../utils/formatCurrency";
import API_URL from "../config/api";

const Checkout = () => {
  const { cart, clearCart } = useCart();

  const { userInfo, loading: authLoading } = useAuth();

  const { showToast } = useToast();

  const navigate = useNavigate();

  // ================= PROTECT CHECKOUT =================
  useEffect(() => {
    if (cart.length === 0) {
      navigate("/cart");
    }
  }, [cart, navigate]);

  useEffect(() => {
    if (userInfo) {
      setFormData((prev) => ({
        ...prev,
        customerName: userInfo.name || "",
        email: userInfo.email || "",
      }));
    }
  }, [userInfo]);

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    customerName: "",
    phone: "",
    city: "",
    province: "",
    address: "",
    email: "",
  });

  // ================= HANDLE INPUT =================
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ================= TOTALS =================
  const subtotal = cart.reduce((sum, item) => {
    const price = Number(item.price) || 0;

    const qty = Number(item.quantity) || 1;

    return sum + price * qty;
  }, 0);

  const shipping = 0;

  const total = subtotal + shipping;

  // ================= PLACE ORDER =================
  const handlePlaceOrder = async () => {
    // EMPTY CART PROTECTION
    if (cart.length === 0) {
      showToast("Your cart is empty", "error");
      navigate("/cart");
      return;
    }

    // REQUIRED FIELDS
    if (
      !formData.customerName ||
      !formData.phone ||
      !formData.city ||
      !formData.province ||
      !formData.address ||
      !formData.email
    ) {
      showToast("Please fill all fields", "error");
      return;
    }

    // PHONE VALIDATION
    if (!/^03\d{9}$/.test(formData.phone)) {
      showToast(
        "Please enter a valid Pakistani phone number (03XXXXXXXXX)",
        "error",
      );
      return;
    }

    // EMAIL VALIDATION
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      showToast("Please enter a valid email address", "error");
      return;
    }

    try {
      setLoading(true);

      const orderData = {
        customerName: formData.customerName,

        phone: formData.phone,

        email: formData.email,

        city: formData.city,

        province: formData.province,

        address: formData.address,

        items: cart.map((item) => ({
          product: item.id,

          title: item.title,

          price: item.price,

          quantity: item.quantity,

          size: item.size,

          color: item.color,

          image: item.image,
        })),

        totalAmount: total,

        user: userInfo?._id,
      };

      const headers = {
        "Content-Type": "application/json",
      };

      if (userInfo?.token) {
        headers.Authorization = `Bearer ${userInfo.token}`;
      }

      const response = await fetch(`${API_URL}/orders`, {
        method: "POST",
        headers,
        body: JSON.stringify(orderData),
      });

      const data = await response.json();

      if (response.ok) {
        showToast("Order placed successfully");
        clearCart();

        navigate("/");
      } else {
        showToast(data.message || "Something went wrong", "error");
      }
    } catch (error) {
      console.log(error);

      showToast("Something went wrong", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <Loader />}

      <Navbar />

      <main className="mx-auto grid max-w-7xl gap-16 px-6 pb-24 pt-24 md:pt-32 lg:grid-cols-12 md:px-12">
        {/* LEFT */}
        <div className="lg:col-span-7">
          <h1 className="mb-12 font-serif text-4xl tracking-tight">Checkout</h1>

          <div className="mb-12 space-y-6">
            <h2 className="text-sm uppercase tracking-widest opacity-60">
              Shipping Details
            </h2>

            <input
              name="customerName"
              value={formData.customerName}
              onChange={handleChange}
              className="w-full rounded-xl border p-4 outline-none focus:border-black"
              placeholder="Full Name"
              required
            />

            <input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full rounded-xl border p-4 outline-none focus:border-black"
              placeholder="Phone Number"
              required
            />

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <input
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="w-full rounded-xl border p-4 outline-none focus:border-black"
                placeholder="City"
                required
              />

              <input
                name="province"
                value={formData.province}
                onChange={handleChange}
                className="w-full rounded-xl border p-4 outline-none focus:border-black"
                placeholder="Province"
                required
              />
            </div>

            {/* ADDRESS */}
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              rows="4"
              className="w-full rounded-xl border p-4 outline-none focus:border-black"
              placeholder="Full Address"
              required
            />
            {/* EMAIL */}
            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full rounded-xl border p-4 outline-none focus:border-black"
              placeholder="Email Address"
              required
            />
          </div>

          {/* PAYMENT */}
          <div className="rounded-2xl border bg-gray-50 p-5 md:p-6">
            <h3 className="font-semibold text-lg mb-4">
              EasyPaisa / JazzCash Payment
            </h3>

            <p className="text-gray-600 mb-4">Send the payment to:</p>

            <div className="bg-white rounded-xl p-4 border">
              <p>
                <strong>Account Title:</strong> Junaid Ali Shah
              </p>

              <p>
                <strong>EasyPaisa / JazzCash Number:</strong>
                03102991726
              </p>
            </div>

            <div className="mt-4 rounded-xl bg-yellow-50 border border-yellow-200 p-4 text-sm">
              After sending payment, please share your payment screenshot on
              WhatsApp.
            </div>

            <div className="mt-3">
              <a
                href="https://wa.me/923102991726"
                target="_blank"
                rel="noreferrer"
                className="
                 w-full
                  sm:w-auto
                inline-flex
               justify-center
             items-center
            rounded-xl
         bg-green-600
      px-5 py-3
       text-white
"
              >
                Send Screenshot on WhatsApp
              </a>
            </div>

            <p className="mt-4 text-sm text-gray-500">
              Your order will be processed after payment verification.
            </p>
          </div>
        </div>

        {/* RIGHT */}
        <div className="lg:col-span-5">
          <div className="sticky top-28 rounded-3xl bg-[#f7f5f1] p-5 md:p-10 shadow-sm">
            <h2 className="mb-8 font-serif text-2xl">Order Summary</h2>

            {/* ITEMS */}
            <div className="mb-6 max-h-48 space-y-4 overflow-y-auto">
              {cart.map((item, i) => (
                <div key={i} className="flex justify-between text-sm">
                  <span className="pr-3 break-words">
                    {item.title} × {item.quantity}
                  </span>

                  <span>
                    {formatCurrency(
                      (Number(item.price) || 0) * (Number(item.quantity) || 1),
                    )}
                  </span>
                </div>
              ))}
            </div>

            {/* TOTALS */}
            <div className="mb-6 space-y-4 text-sm">
              <div className="flex justify-between">
                <span className="opacity-60">Subtotal</span>

                <span>{formatCurrency(subtotal)}</span>
              </div>

              <div className="flex justify-between">
                <span className="opacity-60">Shipping</span>

                <span className="text-xs uppercase tracking-widest">Free</span>
              </div>
            </div>

            {/* TOTAL */}
            <div className="mb-8 flex items-center justify-between border-t pt-6">
              <span className="font-serif text-lg">Total</span>

              <span className="text-2xl font-bold">
                {formatCurrency(total)}
              </span>
            </div>

            {/* PLACE ORDER */}
            <button
              onClick={handlePlaceOrder}
              disabled={loading || cart.length === 0}
              className={`
    flex w-full items-center justify-center rounded-xl py-4 text-white transition
    ${
      cart.length === 0
        ? "bg-gray-400 cursor-not-allowed"
        : "bg-black hover:opacity-90"
    }
  `}
            >
              {loading ? <ButtonLoader /> : "Place Order"}
            </button>

            {/* TERMS */}
            <p className="mt-4 text-center text-xs text-gray-500">
              By placing your order, you agree to our Terms, Shipping Policy,
              and Return Policy.
            </p>

            {/* SECURITY */}
            <div className="mt-5 rounded-xl border border-black/5 bg-white p-4 text-xs text-gray-500">
              Your payment information is processed securely. We do not store
              card or wallet credentials.
            </div>

            {/* FOOTER */}
            <div className="mt-6 text-center text-[10px] uppercase tracking-widest opacity-50">
              Secure Payment • Pakistan Supported
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default Checkout;
