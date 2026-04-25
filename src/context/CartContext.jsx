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

  // ✅ ADD TO CART (MERGE LOGIC)
  const addToCart = (item) => {
    setCart((prev) => {
      const existing = prev.find(
        (p) =>
          p.id === item.id &&
          p.size === item.size &&
          p.color === item.color
      );

      if (existing) {
        return prev.map((p) =>
          p === existing
            ? { ...p, quantity: p.quantity + 1 }
            : p
        );
      }

      return [...prev, { ...item, quantity: 1 }];
    });
  };

  // ✅ UPDATE QUANTITY
  const updateQuantity = (item, newQty) => {
    if (newQty < 1) return;

    setCart((prev) =>
      prev.map((p) =>
        p.id === item.id &&
        p.size === item.size &&
        p.color === item.color
          ? { ...p, quantity: newQty }
          : p
      )
    );
  };

  // ✅ REMOVE (CORRECT)
  const removeFromCart = (itemToRemove) => {
    setCart((prev) =>
      prev.filter(
        (p) =>
          !(
            p.id === itemToRemove.id &&
            p.size === itemToRemove.size &&
            p.color === itemToRemove.color
          )
      )
    );
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQuantity }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);