import { useState } from "react";
import axios from "axios";

import API_URL from "../config/api";

const CtaBanner = () => {
  const [email, setEmail] = useState("");

  const [loading, setLoading] = useState(false);

  const [message, setMessage] = useState("");

  const handleSubscribe = async () => {
    try {
      if (!email) {
        setMessage("Please enter your email");
        return;
      }

      setLoading(true);

      const { data } = await axios.post(`${API_URL}/newsletter`, {
        email,
      });

      setMessage(data.message);

      setEmail("");
    } catch (error) {
      setMessage(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="m-6 md:m-12">
      <div className="relative overflow-hidden rounded-3xl bg-[#061b0e] py-24 px-8 md:px-24">
        {/* PATTERN */}
        <div className="absolute inset-0 opacity-10 jali-pattern pointer-events-none"></div>

        <div className="relative z-10 flex flex-col items-center justify-between gap-12 md:flex-row">
          {/* LEFT */}
          <div className="max-w-xl">
            <p className="mb-3 text-xs uppercase tracking-[0.3em] text-white/60">
              Charsadda Chappal
            </p>

            <h2 className="mb-6 font-serif text-4xl md:text-5xl text-white">
              Subscribe to our emails
            </h2>

            <p className="text-white/80 leading-relaxed">
              Be the first to know about new arrivals, handcrafted collections,
              exclusive offers, and artisan stories from Charsadda.
            </p>
          </div>

          {/* RIGHT */}
          <div className="w-full md:w-auto">
            <div className="flex flex-col gap-4 sm:flex-row">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="
                  w-full sm:w-80
                  rounded-full
                  border border-white/20
                  bg-white/10
                  px-6 py-4
                  text-white
                  placeholder:text-white/50
                  outline-none
                  backdrop-blur-md
                "
              />

              <button
                onClick={handleSubscribe}
                disabled={loading}
                className="
                  rounded-full
                  bg-white
                  px-8 py-4
                  text-sm font-medium
                  uppercase tracking-[0.2em]
                  text-[#061b0e]
                  transition hover:opacity-90
                "
              >
                {loading ? "Joining..." : "Subscribe"}
              </button>
            </div>

            {/* MESSAGE */}
            {message && <p className="mt-4 text-sm text-white/70">{message}</p>}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaBanner;
