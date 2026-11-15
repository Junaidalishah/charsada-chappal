import { User, ShoppingBag, Menu } from "lucide-react";
import CartDrawer from "../components/CartDrawer";
import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import { useCart } from "../context/CartContext";
import useHydrated from "../hooks/useHydrated";
import { useState, useEffect } from "react";

const Links = [
  { to: "/", label: "Home" },
  { to: "/shop", label: "Shop" },
  { to: "/collections", label: "Collection" },
  { to: "/charsadda-chappal-guide", label: "Guide" },
];

const Navbar = () => {
  const { userInfo, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const { cart: storedCart } = useCart();
  const hydrated = useHydrated();
  const cart = hydrated ? storedCart : [];
  const [profileOpen, setProfileOpen] = useState(false);

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    const handleOpen = () => setCartOpen(true);

    window.addEventListener("openCart", handleOpen);

    return () => window.removeEventListener("openCart", handleOpen);
  }, []);

  useEffect(() => {
    const handleClickOutside = () => {
      setProfileOpen(false);
    };

    if (profileOpen) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [profileOpen]);

  return (
    <>
      <nav className="fixed top-0 z-[9999] w-full border-b bg-[#fbf9f5]/80 shadow-md backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          {/* LOGO */}
          <NavLink to="/" className="flex items-center shrink-0" aria-label="Charsadda Chappal home">
            <img
              src="/images/logo-112.webp"
              alt="Charsadda Chappal"
              width="80"
              height="56"
              className="h-14 w-auto"
            />
          </NavLink>

          {/* DESKTOP LINKS */}
          <div className="hidden md:flex space-x-10 items-center" role="navigation" aria-label="Main">
            {Links.map((link) => (
              <NavLink key={link.to} to={link.to}>
                {link.label}
              </NavLink>
            ))}

            {/* ADMIN LINK */}
            {userInfo?.isAdmin && (
              <NavLink to="/admin/products">Dashboard</NavLink>
            )}
          </div>

          {/* RIGHT SIDE */}
          <div className="flex items-center gap-3 sm:gap-5 md:gap-6">
            {/* USER */}
            <div className="relative">
              {userInfo ? (
                <>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setProfileOpen(!profileOpen);
                    }}
                    aria-label={`Account menu for ${userInfo.name}`}
                    aria-expanded={profileOpen}
                    aria-haspopup="menu"
                    className="flex items-center gap-2"
                  >
                    <User size={24} aria-hidden="true" />

                    <span className="hidden md:block text-sm">
                      {userInfo.name}
                    </span>
                  </button>

                  {profileOpen && (
                    <div className="absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                      <div className="px-4 py-3 border-b">
                        <p className="font-semibold">{userInfo.name}</p>

                        <p className="text-xs text-gray-500">
                          {userInfo.email}
                        </p>
                      </div>

                      <Link
                        to="/profile"
                        onClick={() => setProfileOpen(false)}
                        className="block px-4 py-3 hover:bg-gray-50"
                      >
                        My Profile
                      </Link>

                      <Link
                        to="/orders"
                        onClick={() => setProfileOpen(false)}
                        className="block px-4 py-3 hover:bg-gray-50"
                      >
                        My Orders
                      </Link>

                      <button
                        onClick={() => {
                          logout();
                          setProfileOpen(false);
                        }}
                        className="w-full text-left px-4 py-3 text-red-500 hover:bg-red-50"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <Link to="/login" aria-label="Sign in to your account" className="flex p-1">
                  <User size={24} aria-hidden="true" />
                </Link>
              )}
            </div>

            {/* CART */}
            <button
              type="button"
              data-agent-action="open-cart"
              className="relative cursor-pointer p-2 rounded-full hover:bg-black/5"
              onClick={() => setCartOpen((prev) => !prev)}
              aria-label={`Open shopping bag, ${totalItems} item${totalItems === 1 ? "" : "s"}`}
              aria-expanded={cartOpen}
            >
              <ShoppingBag size={24} aria-hidden="true" />

              {totalItems > 0 && (
                <span aria-hidden="true" className="absolute -top-2 -right-2 bg-black text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {totalItems}
                </span>
              )}
            </button>

            {/* MOBILE MENU */}
            <button
              type="button"
              onClick={() => setOpen(!open)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="rounded-lg p-2 transition hover:bg-black/5 md:hidden"
            >
              <Menu size={24} aria-hidden="true" />
            </button>
          </div>
        </div>
        {/* MOBILE MENU */}
        {open && (
          <div
            id="mobile-menu"
            className={`md:hidden overflow-hidden border-t bg-[#fbf9f5] transition-all duration-300 ${
              open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <div className="flex flex-col px-6 py-4 space-y-4">
              {Links.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  onClick={() => setOpen(false)}
                  className="text-lg"
                >
                  {link.label}
                </NavLink>
              ))}

              {userInfo?.isAdmin && (
                <NavLink
                  to="/admin/products"
                  onClick={() => setOpen(false)}
                  className="text-lg"
                >
                  Dashboard
                </NavLink>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* CART DRAWER */}
      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
};

export default Navbar;
