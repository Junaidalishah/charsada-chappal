import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useCart } from "../context/CartContext";
import { useState } from "react";
import { formatCurrency } from "../utils/formatCurrency";

const Checkout = () => {
  const { cart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState("easypaisa");

  // ✅ SAFE TOTAL CALCULATION
  const subtotal = cart.reduce((sum, item) => {
    const price = Number(item.price) || 0;
    const qty = Number(item.quantity) || 1;
    return sum + price * qty;
  }, 0);

  const shipping = 0;
  const total = subtotal + shipping;

  return (
    <>
      <Navbar />

      <main className="pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto grid lg:grid-cols-12 gap-16">
        {/* ================= LEFT SIDE ================= */}
        <div className="lg:col-span-7">
          <h1 className="text-4xl font-serif mb-12 tracking-tight">Checkout</h1>

          {/* SHIPPING */}
          <div className="space-y-6 mb-12">
            <h2 className="text-sm uppercase tracking-widest opacity-60">
              Shipping Details
            </h2>

            <input
              className="w-full border p-4 rounded-lg"
              placeholder="Full Name"
            />
            <input
              className="w-full border p-4 rounded-lg"
              placeholder="Phone Number"
            />
            <input
              className="w-full border p-4 rounded-lg"
              placeholder="City"
            />
            <input
              className="w-full border p-4 rounded-lg"
              placeholder="Full Address"
            />
          </div>

          {/* PAYMENT */}
          <div className="space-y-6">
            <h2 className="text-sm uppercase tracking-widest opacity-60">
              Payment Method
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Easypaisa */}
              <div
                onClick={() => setPaymentMethod("easypaisa")}
                className={`p-5 border rounded-xl cursor-pointer transition ${
                  paymentMethod === "easypaisa"
                    ? "border-black shadow-md"
                    : "hover:border-black"
                }`}
              >
                <div className="flex flex-col items-center gap-2">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/5/5a/Easypaisa_logo.png"
                    alt="Easypaisa"
                    className="h-8 object-contain"
                  />
                  <span className="text-xs uppercase tracking-wider">
                    Easypaisa
                  </span>
                </div>
              </div>

              {/* JazzCash */}
              <div
                onClick={() => setPaymentMethod("jazzcash")}
                className={`p-5 border rounded-xl cursor-pointer transition ${
                  paymentMethod === "jazzcash"
                    ? "border-black shadow-md"
                    : "hover:border-black"
                }`}
              >
                <div className="flex flex-col items-center gap-2">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/7/7d/JazzCash_logo.png"
                    alt="JazzCash"
                    className="h-8 object-contain"
                  />
                  <span className="text-xs uppercase tracking-wider">
                    JazzCash
                  </span>
                </div>
              </div>

              {/* Card */}
              <div
                onClick={() => setPaymentMethod("card")}
                className={`p-5 border rounded-xl cursor-pointer transition ${
                  paymentMethod === "card"
                    ? "border-black shadow-md"
                    : "hover:border-black"
                }`}
              >
                <div className="flex flex-col items-center gap-2">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg"
                    className="h-6"
                  />
                  <span className="text-xs uppercase tracking-wider">Card</span>
                </div>
              </div>
            </div>

            {/* CARD INPUTS */}
            {paymentMethod === "card" && (
              <div className="mt-6 space-y-4">
                <input
                  className="w-full border p-4 rounded-lg"
                  placeholder="Card Number"
                />

                <div className="grid grid-cols-2 gap-4">
                  <input
                    className="border p-4 rounded-lg"
                    placeholder="MM / YY"
                  />
                  <input className="border p-4 rounded-lg" placeholder="CVV" />
                </div>
              </div>
            )}

            {/* MOBILE WALLET INFO */}
            {(paymentMethod === "easypaisa" ||
              paymentMethod === "jazzcash") && (
              <div className="p-4 bg-gray-50 rounded-lg text-sm text-gray-600">
                After placing order, you will receive payment instructions on
                your phone.
              </div>
            )}
          </div>
        </div>

        {/* ================= RIGHT SIDE ================= */}
        <div className="lg:col-span-5">
          <div className="sticky top-28 bg-[#f7f5f1] p-10 rounded-2xl shadow-sm">
            <h2 className="text-2xl font-serif mb-8">Order Summary</h2>

            {/* ITEMS */}
            <div className="space-y-4 mb-6 max-h-48 overflow-y-auto">
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
            <div className="space-y-4 text-sm mb-6">
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
            <div className="flex justify-between items-center border-t pt-6 mb-8">
              <span className="text-lg font-serif">Total</span>
              <span className="text-2xl font-bold">
                {formatCurrency(total)}
              </span>
            </div>

            {/* BUTTON */}
            <button className="w-full bg-black text-white py-4 rounded-xl text-xs uppercase tracking-widest hover:bg-gray-800 transition">
              Place Order
            </button>

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
