import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const CartDrawer = ({ isOpen, onClose }) => {
  const { cart, removeFromCart } = useCart();
  const navigate = useNavigate();

  const subtotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <>
      {/* OVERLAY */}
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-black/40 z-40 transition-opacity ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      />

      {/* DRAWER */}
      <div
        className={`fixed top-0 right-0 h-full w-[380px] bg-white z-50 shadow-xl 
        transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* HEADER */}
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-lg font-medium">Your Bag</h2>
          <button onClick={onClose} className="text-xl cursor-pointer">✕</button>
        </div>

        {/* ITEMS */}
        <div className="p-6 space-y-6 overflow-y-auto h-[70%]">
          {cart.length === 0 ? (
            <p className="text-sm opacity-60">Your cart is empty</p>
          ) : (
            cart.map((item, i) => (
              <div key={i} className="flex gap-4">
                <img
                  src={item.image}
                  className="w-20 h-24 object-cover"
                />

                <div className="flex-1">
                  <h3 className="text-sm">{item.title}</h3>
                  <p className="text-xs opacity-60">
                    {item.color} • {item.size}
                  </p>

                  <div className="flex justify-between mt-2">
                    <span className="text-sm">
                      ${item.price * item.quantity}
                    </span>

                    <button
                      onClick={() => removeFromCart(item)}
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
            <span>${subtotal}</span>
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