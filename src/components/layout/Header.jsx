import { Bell, Search, Plus, ChevronDown } from "lucide-react";

const Header = ({
  notifications,
  unreadCount,
  showNotifications,
  setShowNotifications,
  markAsRead,
}) => {
  return (
    <header
      className="
        sticky top-0 z-30
        border-b border-black/5
        bg-[#f8f6f1]/80
        backdrop-blur-2xl
      "
    >
      <div className="flex h-20 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* LEFT */}
        <div className="min-w-0">
          <p className="text-xs uppercase tracking-[0.25em] text-[#8a8f87]">
            Digital Atelier
          </p>

          <h1 className="truncate font-serif text-2xl font-bold text-[#061b0e]">
            Dashboard Overview
          </h1>
        </div>

        {/* CENTER SEARCH */}
        <div className="hidden xl:flex flex-1 justify-center px-10">
          <div
            className="
              flex items-center gap-3
              w-full max-w-xl
              rounded-2xl
              border border-black/5
              bg-white/70
              px-4 py-3
              shadow-sm
            "
          >
            <Search size={18} className="text-[#6b7280]" />

            <input
              type="text"
              placeholder="Search orders, products, customers..."
              className="
                w-full bg-transparent
                text-sm outline-none
                placeholder:text-[#9ca3af]
              "
            />
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* ADD PRODUCT */}
          <button
            className="
              hidden sm:flex
              items-center gap-2
              rounded-2xl
              bg-[#061b0e]
              px-5 py-3
              text-sm font-medium text-white
              transition hover:opacity-90
              shadow-lg shadow-black/5
            "
          >
            <Plus size={18} />
            Add Product
          </button>

          {/* NOTIFICATIONS */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="
      relative flex h-11 w-11
      items-center justify-center
      rounded-2xl
      border border-black/5
      bg-white/70
    "
            >
              <Bell size={20} />

              {unreadCount > 0 && (
                <span
                  className="
          absolute -top-1 -right-1
          flex h-5 w-5 items-center justify-center
          rounded-full bg-red-500
          text-[10px] text-white
        "
                >
                  {unreadCount}
                </span>
              )}
            </button>

            {showNotifications && (
              <div
                className="
        absolute right-0 mt-3
        w-80 rounded-2xl
        border bg-white
        shadow-xl z-50
      "
              >
                <div className="border-b p-4 font-semibold">Notifications</div>

                <div className="max-h-96 overflow-y-auto">
                  {notifications.map((n) => (
                    <div
                      key={n._id}
                      onClick={() => !n.isRead && markAsRead(n._id)}
                      className={`border-b p-4 cursor-pointer transition hover:bg-gray-50 ${
                        !n.isRead ? "bg-blue-50" : ""
                      }`}
                    >
                      <p className="font-medium">{n.title}</p>
                      <p className="text-sm text-gray-500">{n.message}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* PROFILE */}
          <button
            className="
              flex items-center gap-3
              rounded-2xl
              border border-black/5
              bg-white/70
              px-2 py-2
              transition hover:bg-white
            "
          >
            <img
              src="https://i.pravatar.cc/100"
              alt="Admin"
              className="h-10 w-10 rounded-xl object-cover"
            />

            <div className="hidden md:block text-left">
              <p className="text-sm font-semibold text-[#061b0e]">
                Junaid ali Shah
              </p>

              <p className="text-xs text-[#6b7280]">Super Admin</p>
            </div>

            <ChevronDown size={16} className="hidden md:block text-[#6b7280]" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
