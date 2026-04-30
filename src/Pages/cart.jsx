import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { formatCurrency } from "../utils/formatCurrency";

const Cart = () => {
  const { cart, removeFromCart, updateQuantity } = useCart();
  const navigate = useNavigate();

  // ✅ SUBTOTAL
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

      <main className="pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="mb-12">
          <button
            onClick={() => navigate("/shop")}
            className="text-xs uppercase tracking-widest opacity-60 hover:opacity-100 cursor-pointer"
          >
            ← Continue Shopping
          </button>
        </div>

        <div className="grid lg:grid-cols-12 gap-16">
          {/* ================= LEFT SIDE ================= */}
          <div className="lg:col-span-7">
            <h1 className="text-4xl font-serif mb-12 tracking-tight">BAG</h1>

            {cart.length === 0 ? (
              <p className="text-gray-500">Your cart is empty</p>
            ) : (
              cart.map((item) => (
                <div
                  key={`${item.id}-${item.size}-${item.color}`}
                  className="flex gap-8 mb-12"
                >
                  {/* IMAGE */}
                  <img
                    src={item.image}
                    className="w-32 h-40 object-cover rounded-lg"
                  />

                  {/* INFO */}
                  <div className="flex-1 flex flex-col justify-between">
                    {/* TITLE + PRICE */}
                    <div className="flex justify-between">
                      <div>
                        <h3 className="text-xl font-serif mb-1">
                          {item.title}
                        </h3>

                        <p className="text-xs uppercase tracking-wider opacity-60">
                          Color: {item.color}
                        </p>

                        <p className="text-xs uppercase tracking-wider opacity-60">
                          Size: {item.size}
                        </p>
                      </div>

                      <span className="text-lg font-medium">
                        {formatCurrency(
                          (Number(item.price) || 0) *
                            (Number(item.quantity) || 1),
                        )}
                      </span>
                    </div>

                    {/* CONTROLS */}
                    <div className="flex justify-between items-center mt-6">
                      {/* QUANTITY */}
                      <div className="flex items-center gap-4 border px-4 py-2 rounded-full">
                        <button
                          className="cursor-pointer"
                          onClick={() =>
                            updateQuantity(item, item.quantity - 1)
                          }
                        >
                          -
                        </button>

                        <span className="w-4 text-center">{item.quantity}</span>

                        <button
                          className="cursor-pointer"
                          onClick={() =>
                            updateQuantity(item, item.quantity + 1)
                          }
                        >
                          +
                        </button>
                      </div>

                      {/* REMOVE */}
                      <button
                        onClick={() => removeFromCart(item)}
                        className="text-xs uppercase tracking-widest opacity-50 hover:text-red-500 cursor-pointer"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* ================= RIGHT SIDE ================= */}
          <div className="lg:col-span-5">
            <div className="sticky top-28 bg-[#f7f5f1] p-10 rounded-2xl shadow-sm">
              <h2 className="text-2xl font-serif mb-8">Order Summary</h2>

              {/* DETAILS */}
              <div className="space-y-4 mb-8 text-sm">
                <div className="flex justify-between">
                  <span className="opacity-60">Subtotal</span>
                  <span>{formatCurrency(subtotal)}</span>
                </div>

                <div className="flex justify-between">
                  <span className="opacity-60">Shipping</span>
                  <span className="text-xs uppercase tracking-widest">
                    Free
                  </span>
                </div>

                {/* 🚫 TAX REMOVED FOR NOW */}
              </div>

              {/* TOTAL */}

              <div className="flex justify-between items-center border-t pt-6 mb-8">
                <span className="text-lg font-serif">Total</span>

                <span className="text-2xl font-bold">
                  {formatCurrency(total)}
                </span>
              </div>

              {/* BUTTON */}
              <button
                onClick={() => navigate("/checkout")}
                disabled={cart.length === 0}
                className={`w-full py-4 rounded-xl text-xs uppercase tracking-widest transition cursor-pointer
    ${
      cart.length === 0
        ? "bg-gray-400 cursor-not-allowed"
        : "bg-black text-white hover:bg-gray-800"
    }`}
              >
                Proceed to Checkout
              </button>

              {/* EXTRA TEXT */}
              <div className="mt-6 text-center text-[10px] uppercase tracking-widest opacity-50">
                Secure Payment • Worldwide Shipping
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default Cart;
