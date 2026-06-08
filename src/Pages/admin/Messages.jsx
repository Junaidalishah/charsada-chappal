import { useEffect, useState } from "react";

import api from "../../config/axios";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { useToast } from "../../context/ToastContext";

const Messages = () => {
  const { showToast } = useToast();
  const [messages, setMessages] = useState([]);

  // ================= FETCH MESSAGES =================
  const fetchMessages = async () => {
    try {
      const { data } = await api.get("/contact");

      setMessages(data);
    } catch (error) {
      console.log(error);
      showToast("Failed to load messages", "error");
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  // ================= DELETE MESSAGE =================
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this message?",
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/contact/${id}`);

      setMessages((prev) => prev.filter((msg) => msg._id !== id));

      showToast("Message deleted successfully");
    } catch (error) {
      console.log(error);
      showToast("Failed to delete message", "error");
    }
  };

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-8">Contact Messages</h1>

      {messages.length === 0 ? (
        <div className="bg-white p-6 rounded-2xl shadow-sm border">
          <p className="text-gray-500">No messages found.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {messages.map((msg) => (
            <div
              key={msg._id}
              className="bg-white p-6 rounded-2xl shadow-sm border"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-semibold text-lg">{msg.name}</h3>

                  <p className="text-sm text-gray-500">{msg.email}</p>

                  <p className="mt-3 font-medium">{msg.subject}</p>

                  <p className="mt-2 text-gray-600">{msg.message}</p>
                </div>

                <button
                  onClick={() => handleDelete(msg._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
};

export default Messages;
