import PersonIcon from "@mui/icons-material/Person";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import MenuIcon from "@mui/icons-material/Menu";
import CartDrawer from "../components/CartDrawer";
import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import { useCart } from "../context/CartContext";
import { useState, useEffect } from "react";

const Links = [
  { to: "/", label: "Home" },
  { to: "/shop", label: "Shop" },
  { to: "/collections", label: "Collection" },
];

const Navbar = () => {
  const { userInfo, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const { cart } = useCart();
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
          <NavLink to="/" className="flex items-center shrink-0">
            <img
              src="/images/logo.png"
              alt="Charsadda Chappal"
              className="h-14 w-auto"
            />
          </NavLink>

          {/* DESKTOP LINKS */}
          <div className="hidden md:flex space-x-10 items-center">
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
                    onClick={(e) => {
                      e.stopPropagation();
                      setProfileOpen(!profileOpen);
                    }}
                    className="flex items-center gap-2"
                  >
                    <PersonIcon />

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
                <Link to="/login">
                  <PersonIcon />
                </Link>
              )}
            </div>

            {/* CART */}
            <div
              className="relative cursor-pointer p-2 rounded-full hover:bg-black/5"
              onClick={() => setCartOpen((prev) => !prev)}
            >
              <ShoppingBagIcon />

              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-black text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {totalItems}
                </span>
              )}
            </div>

            {/* MOBILE MENU */}
            <button
              onClick={() => setOpen(!open)}
              className="rounded-lg p-2 transition hover:bg-black/5 md:hidden"
            >
              <MenuIcon />
            </button>
          </div>
        </div>
        {/* MOBILE MENU */}
        {open && (
          <div
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
