import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

import {
  LayoutDashboard,
  ShoppingBag,
  Users,
  Package,
  ReceiptText,
  BarChart3,
  Star,
  TicketPercent,
  Settings,
  LogOut,
  X,
} from "lucide-react";

const navItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    path: "/admin",
  },
  {
    title: "Orders",
    icon: ReceiptText,
    path: "/admin/orders",
  },
  {
    title: "Products",
    icon: ShoppingBag,
    path: "/admin/products",
  },
  {
    title: "Customers",
    icon: Users,
    path: "/admin/customers",
  },
  {
    title: "Analytics",
    icon: BarChart3,
    path: "/admin/analytics",
  },
  {
    title: "Reviews",
    icon: Star,
    path: "/admin/reviews",
  },
];

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const { logout } = useAuth();

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();

    navigate("/login");
  };
  return (
    <>
      {/* MOBILE OVERLAY */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`
          fixed top-0 left-0 z-50
          h-screen w-72
          bg-[#061b0e]
          border-r border-white/10
          flex flex-col
          transition-transform duration-300

          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}

          lg:translate-x-0
        `}
      >
        {/* TOP */}
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-7">
          <div>
            <h1 className="font-serif text-2xl font-bold text-white">
              Charsadda
            </h1>

            <p className="mt-1 text-sm tracking-wide text-slate-400">
              Ecommerce Admin
            </p>
          </div>

          {/* MOBILE CLOSE */}
          <button
            onClick={() => setSidebarOpen(false)}
            className="text-slate-400 lg:hidden"
          >
            <X size={22} />
          </button>
        </div>

        {/* NAVIGATION */}
        <nav className="flex-1 space-y-2 overflow-y-auto p-4">
          {navItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.title}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={({ isActive }) =>
                  `
                  flex items-center gap-3
                  rounded-2xl px-4 py-3
                  transition-all duration-200

                  ${
                    isActive
                      ? "bg-white text-[#061b0e] shadow-lg"
                      : "text-slate-300 hover:bg-white/5 hover:text-white"
                  }
                `
                }
              >
                <Icon size={20} />

                <span className="font-medium">{item.title}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* USER SECTION */}
        <div className="border-t border-white/10 p-4">
          <div className="mb-4 flex items-center gap-3 rounded-2xl bg-white/5 p-3">
            <img
              src="https://i.pravatar.cc/100"
              alt="Admin"
              className="h-11 w-11 rounded-full object-cover"
            />

            <div>
              <h3 className="text-sm font-semibold text-white">Admin User</h3>

              <p className="text-xs text-slate-400">Super Admin</p>
            </div>
          </div>

          {/* LOGOUT */}
          <button
            onClick={handleLogout}
            className="
    flex w-full items-center gap-3
    rounded-2xl px-4 py-3
    text-slate-300
    transition
    hover:bg-red-500/10
    hover:text-red-400
  "
          >
            <LogOut size={20} />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
