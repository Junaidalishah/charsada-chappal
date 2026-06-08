import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { MessageSquare, Shield } from "lucide-react";

import {
  LayoutDashboard,
  ShoppingBag,
  Users,
  ReceiptText,
  BarChart3,
  Star,
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
  {
    title: "Messages",
    icon: MessageSquare,
    path: "/admin/messages",
  },
];

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const { logout, userInfo } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const sidebarItems = [
    ...navItems,

    ...(userInfo?.role === "superadmin"
      ? [
          {
            title: "Admin Management",
            path: "/admin/admins",
            icon: Shield,
          },
        ]
      : []),
  ];

  return (
    <>
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

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
        {/* HEADER */}
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-7">
          <div>
            <h1 className="font-serif text-2xl font-bold text-white">
              Charsadda
            </h1>

            <p className="mt-1 text-sm tracking-wide text-slate-400">
              Ecommerce Admin
            </p>
          </div>

          <button
            onClick={() => setSidebarOpen(false)}
            className="text-slate-400 lg:hidden"
          >
            <X size={22} />
          </button>
        </div>

        {/* NAVIGATION */}
        <nav className="flex-1 space-y-2 overflow-y-auto p-4">
          {sidebarItems.map((item) => {
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
        <div className="mt-auto border-t border-white/10 p-4">
          <div className="flex items-center gap-3 rounded-2xl bg-white/5 p-3">
            <img
              src="https://i.pravatar.cc/100"
              alt="Admin"
              className="h-11 w-11 rounded-full object-cover"
            />

            <div className="min-w-0">
              <h3 className="truncate text-sm font-semibold text-white">
                {userInfo?.name}
              </h3>

              <p className="truncate text-xs text-slate-400">
                {userInfo?.email}
              </p>

              <p className="text-[10px] text-green-400 capitalize">
                {userInfo?.role}
              </p>
            </div>
          </div>

          <div className="mt-3 flex gap-2">
            <NavLink
              to="/admin/profile"
              className="
                flex-1 rounded-xl bg-white/10
                px-3 py-2 text-center text-sm text-white
                hover:bg-white/20 transition
              "
            >
              Profile
            </NavLink>

            <button
              onClick={handleLogout}
              className="
                flex-1 rounded-xl bg-red-500
                px-3 py-2 text-sm text-white
                hover:bg-red-600 transition
              "
            >
              Logout
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
