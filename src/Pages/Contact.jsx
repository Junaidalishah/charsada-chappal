import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useState } from "react";
import API_URL from "../config/api";
import { useToast } from "../context/ToastContext";
import Seo from "../seo/Seo";
import { graph, organizationSchema } from "../seo/schema.js";
import { SITE_URL } from "../seo/site.js";
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
      <Seo
        path="/contact"
        jsonLd={graph(organizationSchema(), {
          "@type": "ContactPage",
          url: `${SITE_URL}/contact`,
          name: "Contact Charsadda Chappal",
          about: { "@id": `${SITE_URL}/#organization` },
        })}
      />
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
              <span aria-hidden="true" className="material-symbols-outlined">call</span>
            </div>

            <h2 className="font-semibold text-xl mb-3">Call Us</h2>

            <p className="text-gray-600"><a href="tel:+923102991736" className="underline-offset-4 hover:underline">+92 310 2991736</a></p>

            <p className="text-gray-600 mt-2">Call or WhatsApp</p>
          </div>

          <div className="bg-[#f8f6f1] rounded-3xl p-8 text-center">
            <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-[#061b0e] text-white flex items-center justify-center">
              <span aria-hidden="true" className="material-symbols-outlined">mail</span>
            </div>

            <h2 className="font-semibold text-xl mb-3">Email Us</h2>

            <p className="text-gray-600"><a href="mailto:infocharsaddachappal@gmail.com" className="underline-offset-4 hover:underline">infocharsaddachappal@gmail.com</a></p>

            <p className="text-gray-600 mt-2">Replies within one working day</p>
          </div>

          <div className="bg-[#f8f6f1] rounded-3xl p-8 text-center">
            <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-[#061b0e] text-white flex items-center justify-center">
              <span aria-hidden="true" className="material-symbols-outlined">location_on</span>
            </div>

            <h2 className="font-semibold text-xl mb-3">Visit Us</h2>

            <p className="text-gray-600">Charsadda, Khyber Pakhtunkhwa,</p>

            <p className="text-gray-600">Pakistan</p>
          </div>
        </div>

        {/* CONTACT FORM */}
        <div className="max-w-4xl mx-auto bg-[#f8f6f1] rounded-3xl p-8 md:p-12">
          <h2 className="font-serif text-3xl mb-8 text-[#061b0e]">
            Send Us A Message
          </h2>

          <form
            onSubmit={handleSubmit}
            className="space-y-6"
            aria-label="Contact form"
            toolname="contact_store"
            tooldescription="Send a message to the Charsadda Chappal team about orders, sizing, delivery or returns."
          >
            <div className="grid md:grid-cols-2 gap-6">
              <input
                type="text"
                name="name"
                autoComplete="name"
                aria-label="Full name"
                toolparamdescription="Customer's full name"
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
                name="email"
                autoComplete="email"
                aria-label="Email address"
                toolparamdescription="Customer's email address for the reply"
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
              name="subject"
              aria-label="Subject"
              toolparamdescription="Short subject of the message"
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
              name="message"
              aria-label="Your message"
              toolparamdescription="The message or question for the store"
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
