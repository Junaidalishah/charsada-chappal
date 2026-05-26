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
  const { cart } = useCart();

  const { userInfo } = useAuth();

  const { showToast } = useToast();

  const navigate = useNavigate();

  // ================= PROTECT CHECKOUT =================
  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }
  }, [userInfo, navigate]);

  const [paymentMethod, setPaymentMethod] = useState("easypaisa");

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    customerName: "",
    phone: "",
    city: "",
    province: "",
    address: "",
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
    // VALIDATION
    if (
      !formData.customerName ||
      !formData.phone ||
      !formData.city ||
      !formData.province ||
      !formData.address
    ) {
      showToast("Please fill all fields", "error");

      return;
    }

    try {
      setLoading(true);

      const orderData = {
        customerName: formData.customerName,

        phone: formData.phone,

        city: formData.city,

        province: formData.province,

        address: formData.address,

        paymentMethod,

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

      const response = await fetch(`${API_URL}/orders`, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",

          Authorization: `Bearer ${userInfo.token}`,
        },

        body: JSON.stringify(orderData),
      });

      const data = await response.json();

      if (response.ok) {
        showToast("Order placed successfully");

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

      <main className="mx-auto grid max-w-7xl gap-16 px-6 pb-24 pt-32 lg:grid-cols-12 md:px-12">
        {/* LEFT */}
        <div className="lg:col-span-7">
          <h1 className="mb-12 font-serif text-4xl tracking-tight">Checkout</h1>

          {/* SHIPPING */}
          <div className="mb-12 space-y-6">
            <h2 className="text-sm uppercase tracking-widest opacity-60">
              Shipping Details
            </h2>

            {/* NAME */}
            <input
              name="customerName"
              value={formData.customerName}
              onChange={handleChange}
              className="w-full rounded-xl border p-4 outline-none focus:border-black"
              placeholder="Full Name"
              required
            />

            {/* PHONE */}
            <input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full rounded-xl border p-4 outline-none focus:border-black"
              placeholder="Phone Number"
              required
            />

            {/* CITY + PROVINCE */}
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
          </div>

          {/* PAYMENT */}
          <div className="space-y-6">
            <h2 className="text-sm uppercase tracking-widest opacity-60">
              Payment Method
            </h2>

            {/* OPTIONS */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {/* EASYPAISA */}
              <div
                onClick={() => setPaymentMethod("easypaisa")}
                className={`cursor-pointer rounded-2xl border p-5 transition ${
                  paymentMethod === "easypaisa"
                    ? "border-black shadow-md"
                    : "hover:border-black"
                }`}
              >
                <div className="flex flex-col items-center gap-3">
                  <img
                    src="/images/Easypaisa-logo.png"
                    alt="Easypaisa"
                    className="h-10 object-contain"
                  />

                  <span className="text-xs uppercase tracking-wider">
                    Easypaisa
                  </span>
                </div>
              </div>

              {/* JAZZCASH */}
              <div
                onClick={() => setPaymentMethod("jazzcash")}
                className={`cursor-pointer rounded-2xl border p-5 transition ${
                  paymentMethod === "jazzcash"
                    ? "border-black shadow-md"
                    : "hover:border-black"
                }`}
              >
                <div className="flex flex-col items-center gap-3">
                  <img
                    src="/images/jazzcash.png"
                    alt="JazzCash"
                    className="h-10 object-contain"
                  />

                  <span className="text-xs uppercase tracking-wider">
                    JazzCash
                  </span>
                </div>
              </div>

              {/* CARD */}
              <div
                onClick={() => setPaymentMethod("card")}
                className={`cursor-pointer rounded-2xl border p-5 transition ${
                  paymentMethod === "card"
                    ? "border-black shadow-md"
                    : "hover:border-black"
                }`}
              >
                <div className="flex flex-col items-center gap-3">
                  <div className="flex items-center gap-3">
                    <img
                      src="/images/visa-logo-02.png"
                      alt="Visa"
                      className="h-5"
                    />

                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg"
                      alt="Mastercard"
                      className="h-8"
                    />
                  </div>

                  <span className="text-xs uppercase tracking-wider">
                    Credit / Debit Card
                  </span>
                </div>
              </div>
            </div>

            {/* EASYPAISA */}
            {paymentMethod === "easypaisa" && (
              <div className="mt-6 rounded-2xl border bg-gray-50 p-6">
                <div className="space-y-4 text-sm leading-7 text-gray-700">
                  <p className="font-semibold text-black">
                    Experience easy payments with Easypaisa
                  </p>

                  <p>
                    Please ensure your Easypaisa account is Active and has
                    sufficient balance.
                  </p>

                  <div className="space-y-2">
                    <p className="font-medium text-black">
                      ➊ FOR Telenor USERS
                    </p>

                    <p>
                      ↳ Unlock your phone and approve payment using your PIN
                    </p>
                  </div>

                  <div className="space-y-2">
                    <p className="font-medium text-black">
                      ➋ FOR OTHER NETWORKS
                    </p>

                    <p>
                      ↳ Login to your Easypaisa App and approve the transaction
                    </p>
                  </div>

                  <div className="pt-4">
                    <label className="mb-2 block text-sm font-medium text-black">
                      Easypaisa Account Number
                    </label>

                    <input
                      type="text"
                      placeholder="03XX XXXXXXX"
                      className="w-full rounded-xl border bg-white p-4 outline-none focus:border-black"
                    />
                  </div>

                  <p className="text-xs text-gray-500">
                    We will save this account for your convenience. You can
                    remove it later from your account settings.
                  </p>

                  <button className="mt-4 w-full rounded-xl bg-[#00a651] py-4 font-medium text-white transition hover:opacity-90">
                    Pay Now
                  </button>
                </div>
              </div>
            )}

            {/* JAZZCASH */}
            {paymentMethod === "jazzcash" && (
              <div className="mt-6 rounded-2xl border bg-gray-50 p-6">
                <div className="space-y-4 text-sm leading-7 text-gray-700">
                  <div className="space-y-2">
                    <p className="font-medium text-black">➊ FOR JAZZ/WARID</p>

                    <p>
                      ↳ Unlock your phone and you will receive a MPIN Input
                      Prompt
                    </p>
                  </div>

                  <div className="space-y-2">
                    <p className="font-medium text-black">
                      ➋ FOR OTHER NETWORKS
                    </p>

                    <p>↳ Log-in to your JazzCash App and enter your MPIN</p>
                  </div>

                  <p>
                    Note: Ensure your JazzCash account is Active and has
                    sufficient balance.
                  </p>

                  <div className="pt-4">
                    <label className="mb-2 block text-sm font-medium text-black">
                      JazzCash Account Number
                    </label>

                    <input
                      type="text"
                      placeholder="03XX XXXXXXX"
                      className="w-full rounded-xl border bg-white p-4 outline-none focus:border-black"
                    />
                  </div>

                  <p className="text-xs text-gray-500">
                    We will save this account for your convenience. If required,
                    you can remove the account later from account settings.
                  </p>

                  <button className="mt-4 w-full rounded-xl bg-[#f22053] py-4 font-medium text-white transition hover:opacity-90">
                    Pay Now
                  </button>
                </div>
              </div>
            )}

            {/* CARD */}
            {paymentMethod === "card" && (
              <div className="mt-6 rounded-2xl border bg-gray-50 p-6">
                <div className="space-y-5">
                  {/* CARD NUMBER */}
                  <div>
                    <label className="mb-2 block text-sm font-medium text-black">
                      Card Number
                    </label>

                    <input
                      type="text"
                      placeholder="Card Number"
                      className="w-full rounded-xl border bg-white p-4 outline-none focus:border-black"
                    />
                  </div>

                  {/* NAME */}
                  <div>
                    <label className="mb-2 block text-sm font-medium text-black">
                      Name on card
                    </label>

                    <input
                      type="text"
                      placeholder="Name on card"
                      className="w-full rounded-xl border bg-white p-4 outline-none focus:border-black"
                    />
                  </div>

                  {/* EXPIRY + CVV */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="mb-2 block text-sm font-medium text-black">
                        Expiry date
                      </label>

                      <input
                        type="text"
                        placeholder="MM/YY"
                        className="w-full rounded-xl border bg-white p-4 outline-none focus:border-black"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium text-black">
                        CVV
                      </label>

                      <input
                        type="password"
                        placeholder="CVV"
                        className="w-full rounded-xl border bg-white p-4 outline-none focus:border-black"
                      />
                    </div>
                  </div>

                  {/* SAVE CARD */}
                  <div className="flex items-start gap-3 pt-2">
                    <input type="checkbox" className="mt-1 h-4 w-4" />

                    <p className="text-xs leading-6 text-gray-500">
                      We will save this card for your convenience. If required,
                      you can remove the card later from account settings.
                    </p>
                  </div>

                  <button className="mt-4 w-full rounded-xl bg-black py-4 font-medium text-white transition hover:opacity-90">
                    Pay Now
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT */}
        <div className="lg:col-span-5">
          <div className="sticky top-28 rounded-3xl bg-[#f7f5f1] p-10 shadow-sm">
            <h2 className="mb-8 font-serif text-2xl">Order Summary</h2>

            {/* ITEMS */}
            <div className="mb-6 max-h-48 space-y-4 overflow-y-auto">
              {cart.map((item, i) => (
                <div key={i} className="flex justify-between text-sm">
                  <span>
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
              disabled={loading}
              className="flex w-full items-center justify-center rounded-xl bg-black py-4 text-white transition hover:opacity-90"
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
