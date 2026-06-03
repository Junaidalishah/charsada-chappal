import { useEffect, useState } from "react";
import axios from "axios";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import API_URL from "../config/api";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const navigate = useNavigate();
  const { userInfo } = useAuth();

  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }
  }, [userInfo, navigate]);

  useEffect(() => {
    if (!userInfo) return;
    const fetchProfile = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/auth/profile`, {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        });

        setFormData({
          name: data.name || "",
          email: data.email || "",
          phone: data.phone || "",
          address: data.address || "",
        });
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [userInfo]);

  const handleUpdate = async () => {
    try {
      await axios.put(`${API_URL}/auth/profile`, formData, {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      });

      alert("Profile Updated");
    } catch (error) {
      alert("Update Failed");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading Profile...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8f6f1]">
      <Navbar />

      <main className="max-w-4xl mx-auto px-6 pt-32 pb-20">
        <h1 className="text-4xl font-bold mb-10">My Profile</h1>

        <div className="bg-white rounded-3xl p-8 shadow-sm border">
          <div className="space-y-6">
            <div>
              <label className="block mb-2 font-medium">Full Name</label>

              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    name: e.target.value,
                  })
                }
                className="w-full border rounded-xl px-4 py-3"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">Email</label>

              <input
                type="email"
                value={formData.email}
                disabled
                className="w-full border rounded-xl px-4 py-3 bg-gray-100"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">Phone</label>

              <input
                type="text"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    phone: e.target.value,
                  })
                }
                className="w-full border rounded-xl px-4 py-3"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">Address</label>

              <textarea
                rows="4"
                value={formData.address}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    address: e.target.value,
                  })
                }
                className="w-full border rounded-xl px-4 py-3"
              />
            </div>

            <button
              onClick={handleUpdate}
              className="bg-[#061b0e] text-white px-8 py-3 rounded-xl"
            >
              Update Profile
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProfilePage;
