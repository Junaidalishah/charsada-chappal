import Sidebar from "./Sidebar";
import Header from "./Header";
import { useEffect, useState } from "react";
import axios from "axios";
import API_URL from "../../config/api";
import { useAuth } from "../../context/AuthContext";

const DashboardLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const { userInfo } = useAuth();

  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/notifications`, {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        });

        setNotifications(data);
      } catch (error) {
        console.log(error);
      }
    };

    if (userInfo?.token) {
      fetchNotifications();

      const interval = setInterval(fetchNotifications, 10000);

      return () => clearInterval(interval);
    }
  }, [userInfo]);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const markAsRead = async (id) => {
    try {
      await axios.put(
        `${API_URL}/notifications/${id}/read`,
        {},
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        },
      );

      setNotifications((prev) =>
        prev.map((n) => (n._id === id ? { ...n, isRead: true } : n)),
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f6f1]">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Main Content */}
      <div className="lg:ml-72">
        <Header
          notifications={notifications}
          unreadCount={unreadCount}
          showNotifications={showNotifications}
          setShowNotifications={setShowNotifications}
          markAsRead={markAsRead}
        />

        {/* Page Content */}
        <main className="p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
