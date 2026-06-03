import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const stored = localStorage.getItem("cart");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item) => {
    setCart((prev) => {
      const existing = prev.find(
        (p) =>
          p.id === item.id && p.size === item.size && p.color === item.color,
      );

      if (existing) {
        return prev.map((p) =>
          p.id === item.id && p.size === item.size && p.color === item.color
            ? { ...p, quantity: (p.quantity || 1) + 1 }
            : p,
        );
      }

      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const updateQuantity = (item, newQty) => {
    setCart((prev) =>
      prev.map((p) =>
        p.id === item.id && p.size === item.size && p.color === item.color
          ? {
              ...p,
              quantity: Math.max(1, Number(newQty) || 1),
            }
          : p,
      ),
    );
  };

  const removeFromCart = (itemToRemove) => {
    setCart((prev) =>
      prev.filter(
        (p) =>
          !(
            p.id === itemToRemove.id &&
            p.size === itemToRemove.size &&
            p.color === itemToRemove.color
          ),
      ),
    );
  };

  // ADD THIS
  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart, // ADD THIS
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
