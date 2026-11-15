import { useCart } from "../context/CartContext";
import { cld } from "../utils/image";
import { useNavigate } from "react-router-dom";
import useHydrated from "../hooks/useHydrated";
import { formatCurrency } from "../utils/formatCurrency";

const CartDrawer = ({ isOpen, onClose }) => {
  const { cart: storedCart, removeFromCart } = useCart();
  const hydrated = useHydrated();
  const cart = hydrated ? storedCart : [];
  const navigate = useNavigate();

  const subtotal = cart.reduce((sum, item) => {
    const price = Number(item.price) || 0;
    const qty = Number(item.quantity) || 1;
    return sum + price * qty;
  }, 0);

  return (
    <>
      {/* OVERLAY */}
      <div
        aria-hidden="true"
        onClick={onClose}
        className={`fixed inset-0 bg-black/40 z-40 transition-opacity ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      />

      {/* DRAWER */}
      <div
        role="dialog"
        aria-label="Shopping bag"
        aria-hidden={!isOpen}
        inert={!isOpen}
        className={`fixed top-0 right-0 h-full w-full max-w-[380px] bg-white z-50 shadow-xl
  transform transition-transform duration-300 ${
    isOpen ? "translate-x-0" : "translate-x-full"
  }`}
      >
        {/* HEADER */}
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-lg font-medium">Your Bag</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close shopping bag"
            className="text-xl cursor-pointer"
          >
            <span aria-hidden="true">✕</span>
          </button>
        </div>

        {/* ITEMS */}
        <div className="p-6 space-y-6 overflow-y-auto h-[70%]">
          {cart.length === 0 ? (
            <p className="text-sm opacity-60">Your cart is empty</p>
          ) : (
            cart.map((item, i) => (
              <div key={i} className="flex gap-4">
                <img
                  src={cld(item.image, 160)}
                  width="80"
                  height="96"
                  loading="lazy"
                  className="w-20 h-24 object-cover"
                  alt={item.title}
                />

                <div className="flex-1">
                  <h3 className="text-sm">{item.title}</h3>

                  <p className="text-xs opacity-60">
                    {item.color} • {item.size}
                  </p>

                  <div className="flex justify-between mt-2">
                    <span className="text-sm">
                      {formatCurrency(
                        (Number(item.price) || 0) *
                          (Number(item.quantity) || 1),
                      )}
                    </span>

                    <button
                      type="button"
                      onClick={() => removeFromCart(item)}
                      aria-label={`Remove ${item.title} from bag`}
                      className="text-xs text-red-500 cursor-pointer"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* FOOTER */}
        <div className="absolute bottom-0 w-full p-6 border-t bg-white">
          <div className="flex justify-between mb-4 text-sm">
            <span>Subtotal</span>
            <span>{formatCurrency(subtotal)}</span>
          </div>

          <button
            onClick={() => {
              navigate("/cart");
              onClose();
            }}
            className="w-full bg-black text-white py-3 mb-2 cursor-pointer"
          >
            View Cart
          </button>

          <button
            onClick={() => {
              navigate("/checkout");
              onClose();
            }}
            className="w-full border py-3 cursor-pointer"
          >
            Checkout
          </button>
        </div>
      </div>
    </>
  );
};

export default CartDrawer;
