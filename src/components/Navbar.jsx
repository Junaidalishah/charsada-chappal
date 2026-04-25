import PersonIcon from "@mui/icons-material/Person";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import MenuIcon from "@mui/icons-material/Menu";
import CartDrawer from "../components/CartDrawer";
import { NavLink } from "react-router-dom";
 
import { useCart } from "../context/CartContext";
import { useState, useEffect } from "react";

const Links = [
  { to: "/", label: "Home" },
  { to: "/shop", label: "Shop" },
  { to: "/collections", label: "Collection" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const { cart } = useCart();

  const totalItems = cart.reduce(
    (acc, item) => acc + item.quantity,
    0
  );
  useEffect(() => {
  const handleOpen = () => setCartOpen(true);

  window.addEventListener("openCart", handleOpen);

  return () => window.removeEventListener("openCart", handleOpen);
}, []);

  return (
    
    <>

    
      <nav className="fixed top-0 w-full z-[9999] bg-[#fbf9f5]/80 backdrop-blur-xl border-b shadow-md">
        <div className="container mx-auto flex justify-between items-center px-6 py-4">
          
          <NavLink to="/" className="text-2xl font-serif font-bold">
            Paklet
          </NavLink>

          <div className="hidden md:flex space-x-10">
            {Links.map((link) => (
              <NavLink key={link.to} to={link.to}>
                {link.label}
              </NavLink>
            ))}
          </div>

          <div className="flex items-center space-x-6">
            <PersonIcon />

            {/* CART */}
            <div
              className="relative cursor-pointer"
              onClick={() => setCartOpen(true)}
            >
              <ShoppingBagIcon />

              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-black text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {totalItems}
                </span>
              )}
            </div>

            <button onClick={() => setOpen(!open)} className="md:hidden">
              <MenuIcon />
            </button>
          </div>
        </div>
      </nav>

      {/* ✅ DRAWER (THIS WAS MISSING) */}
      <CartDrawer 
        isOpen={cartOpen} 
        onClose={() => setCartOpen(false)} 
      />
    </>
  );
};

export default Navbar;