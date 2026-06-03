import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useState } from "react";
import API_URL from "../config/api";
import { useToast } from "../context/ToastContext";
const Contact = () => {
  const { showToast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API_URL}/contact`, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        showToast("Message sent successfully");

        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
      } else {
        showToast(data.message, "error");
      }
    } catch (error) {
      console.log(error);

      showToast("Failed to send message", "error");
    }
  };
  return (
    <>
      <Navbar />

      <main className="pt-36 pb-24 px-6 md:px-12 max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="text-center mb-20">
          <p className="text-xs uppercase tracking-[0.3em] text-gray-500 mb-4">
            Get In Touch
          </p>

          <h1 className="font-serif text-5xl text-[#061b0e] mb-6">
            Contact Us
          </h1>

          <p className="max-w-2xl mx-auto text-gray-600">
            Have a question about our Charsadda Chappals, sizing, delivery, or
            returns? Our team is ready to assist you.
          </p>
        </div>

        {/* CONTACT CARDS */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          <div className="bg-[#f8f6f1] rounded-3xl p-8 text-center">
            <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-[#061b0e] text-white flex items-center justify-center">
              <span className="material-symbols-outlined">call</span>
            </div>

            <h3 className="font-semibold text-xl mb-3">Call Us</h3>

            <p className="text-gray-600">+92 310 2991736</p>

            <p className="text-gray-600 mt-2">+92 316 985 2047</p>
          </div>

          <div className="bg-[#f8f6f1] rounded-3xl p-8 text-center">
            <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-[#061b0e] text-white flex items-center justify-center">
              <span className="material-symbols-outlined">mail</span>
            </div>

            <h3 className="font-semibold text-xl mb-3">Email Us</h3>

            <p className="text-gray-600">info@charsaddachappal.com</p>

            <p className="text-gray-600 mt-2">support@charsaddachappal.com</p>
          </div>

          <div className="bg-[#f8f6f1] rounded-3xl p-8 text-center">
            <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-[#061b0e] text-white flex items-center justify-center">
              <span className="material-symbols-outlined">location_on</span>
            </div>

            <h3 className="font-semibold text-xl mb-3">Visit Us</h3>

            <p className="text-gray-600">Charsadda, Khyber Pakhtunkhwa,</p>

            <p className="text-gray-600">Pakistan</p>
          </div>
        </div>

        {/* CONTACT FORM */}
        <div className="max-w-4xl mx-auto bg-[#f8f6f1] rounded-3xl p-8 md:p-12">
          <h2 className="font-serif text-3xl mb-8 text-[#061b0e]">
            Send Us A Message
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <input
                type="text"
                placeholder="Full Name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    name: e.target.value,
                  })
                }
                className="w-full border border-black/10 rounded-xl p-4 bg-white"
                required
              />

              <input
                type="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    email: e.target.value,
                  })
                }
                className="w-full border border-black/10 rounded-xl p-4 bg-white"
                required
              />
            </div>

            <input
              type="text"
              placeholder="Subject"
              value={formData.subject}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  subject: e.target.value,
                })
              }
              className="w-full border border-black/10 rounded-xl p-4 bg-white"
            />

            <textarea
              rows="6"
              placeholder="Your Message"
              value={formData.message}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  message: e.target.value,
                })
              }
              className="w-full border border-black/10 rounded-xl p-4 bg-white resize-none"
            />

            <button
              type="submit"
              className="bg-[#061b0e] text-white px-8 py-4 rounded-xl hover:opacity-90 transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default Contact;
