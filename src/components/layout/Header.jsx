import { Bell, Menu } from "lucide-react";

const Header = ({
  notifications,
  unreadCount,
  showNotifications,
  setShowNotifications,
  markAsRead,
  setSidebarOpen,
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
        {/* LEFT TITLE */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSidebarOpen(true)}
            className="
      lg:hidden
      flex h-10 w-10 items-center justify-center
      rounded-xl border bg-white
    "
          >
            <Menu size={22} />
          </button>

          <div>
            <h1 className="font-serif text-lg sm:text-2xl font-bold">
              Charsadda Chappal Admin
            </h1>

            <p className="hidden sm:block text-sm text-gray-500">
              Manage your store
            </p>
          </div>
        </div>

        {/* NOTIFICATIONS ONLY */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="
              relative flex h-11 w-11
              items-center justify-center
              rounded-2xl
              border border-black/5
              bg-white/70
              hover:bg-white
              transition
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
                border bg-white shadow-xl z-50
              "
            >
              <div className="border-b p-4 font-semibold">Notifications</div>

              <div className="max-h-96 overflow-y-auto">
                {notifications.map((n) => (
                  <div
                    key={n._id}
                    onClick={() => !n.isRead && markAsRead(n._id)}
                    className={`
                      border-b p-4 cursor-pointer transition
                      hover:bg-gray-50
                      ${!n.isRead ? "bg-blue-50" : ""}
                    `}
                  >
                    <p className="font-medium">{n.title}</p>
                    <p className="text-sm text-gray-500">{n.message}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
