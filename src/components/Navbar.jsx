import PersonIcon from "@mui/icons-material/Person";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import MenuIcon from "@mui/icons-material/Menu";
import { NavLink } from "react-router-dom";
import { useState } from "react";

const Links = [
  { to: "/", label: "Home" },
  { to: "/shop", label: "Shop" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* NAVBAR */}
      <nav className="fixed top-0 w-full z-50 bg-[#fbf9f5]/80 backdrop-blur-xl border-b shadow-md">
        <div className="container mx-auto flex justify-between items-center px-6 py-4 max-w-none">
          {/* LOGO */}
          <div className="text-2xl font-serif font-bold tracking-tighter text-[#061b0e]">
            Paklet
          </div>

          {/* DESKTOP MENU */}
          <div className="hidden md:flex space-x-10">
            {Links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `font-serif italic tracking-wide text-sm ${
                    isActive
                      ? "text-[#775a19] border-b border-[#775a19] pb-1"
                      : "text-[#061b0e] opacity-70"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          {/* RIGHT ICONS */}
          <div className="flex items-center space-x-6 text-[#061b0e]">
            <PersonIcon />
            <ShoppingBagIcon />

            {/* MOBILE BUTTON */}
            <button onClick={() => setOpen(!open)} className="md:hidden">
              <MenuIcon />
            </button>
          </div>
        </div>
      </nav>

      {/* MOBILE MENU */}
      {open && (
        <div className="md:hidden fixed top-16 left-0 w-full bg-[#fbf9f5] border-t shadow-md z-40">
          <div className="flex flex-col px-6 py-4 space-y-4">
            {Links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `font-serif italic text-base ${
                    isActive ? "text-[#775a19]" : "text-[#061b0e] opacity-70"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
