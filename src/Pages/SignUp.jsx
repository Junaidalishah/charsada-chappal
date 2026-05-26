import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebase";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import API_URL from "../config/api";
import { useAuth } from "../context/AuthContext";

import Loader from "../components/Loader";
import ButtonLoader from "../components/ButtonLoader";
import { useToast } from "../context/ToastContext";

export default function SignUp() {
  const navigate = useNavigate();

  const { login } = useAuth();

  const { showToast } = useToast();

  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  // HANDLE INPUTS
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // HANDLE SIGNUP
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        login(data);

        showToast("Account created successfully");

        navigate("/");
      } else {
        showToast(data.message || "Signup failed", "error");
      }
    } catch (error) {
      console.error(error);

      showToast("Something went wrong", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);

      // FIREBASE POPUP
      const result = await signInWithPopup(auth, googleProvider);

      const user = result.user;

      // SEND TO BACKEND
      const response = await fetch(`${API_URL}/auth/google`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: user.displayName,
          email: user.email,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        login(data);

        showToast("Google login successful");

        navigate("/");
      } else {
        showToast(data.message || "Google login failed", "error");
      }
    } catch (error) {
      console.log(error);

      showToast("Google login failed", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <Loader />}

      <div className="bg-background text-on-surface min-h-screen flex flex-col">
        <Navbar />

        <main className="flex flex-1 flex-col md:flex-row pt-16">
          {/* LEFT SIDE */}
          <section className="relative hidden md:flex md:w-1/2 lg:w-3/5 bg-primary overflow-hidden">
            <div className="absolute inset-0 bg-black/30 z-10" />

            <img
              src="https://lh3.googleusercontent.com/aida/ADBb0uiEKFwXSu7kxStND9B9V_NlCH3Ox7ElzBOAm0pbK-zOs0Plnm7NdSLypqE88PsSRMHKZtU3z2VWqDp-NDmCZZDXo5t0dM9OM10q0GpHGccEC_xfbHsfAa6X23qdduz4_49uFWVKYXZ7_Jtzm1C1Yjhjy7nCmp1eLLdDzxGCbN1nggeV-EoYRY6A_NWz87PgmwBhtZ0lyqnoYmLFyeDdX3gcTUYU_XdQCwURG3Oct8LLZQClLqY1iwJLEg"
              alt="Workshop"
              className="absolute inset-0 w-full h-full object-cover"
            />

            <div className="relative z-20 mt-auto p-10 lg:p-20 max-w-xl">
              <span className="text-white/70 text-xs uppercase tracking-[0.25em] block mb-4">
                The Cultural Curator
              </span>

              <h1 className="text-white text-4xl lg:text-6xl font-serif italic leading-tight mb-6">
                Join the Atelier
              </h1>

              <p className="text-white/80 text-base lg:text-lg leading-relaxed">
                Step into a world where heritage meets contemporary design.
              </p>
            </div>
          </section>

          {/* RIGHT SIDE */}
          <section className="relative flex flex-1 items-center justify-center px-6 py-16 md:px-12 lg:px-20 bg-surface-container-low">
            {/* BLUR EFFECTS */}
            <div className="absolute -right-20 -top-20 w-56 h-56 bg-primary/10 rounded-full blur-3xl" />

            <div className="absolute -left-20 bottom-20 w-48 h-48 bg-secondary/10 rounded-full blur-3xl" />

            <div className="w-full max-w-md relative z-10">
              {/* LOGO */}
              <div className="mb-10 text-center">
                <Link
                  to="/"
                  className="text-3xl font-serif italic text-primary"
                >
                  Charsadda Chappal
                </Link>
              </div>

              {/* HEADING */}
              <div className="mb-10 text-center">
                <h2 className="text-3xl md:text-4xl font-semibold text-primary mb-3">
                  Create your account
                </h2>

                <p className="text-on-surface-variant">
                  Enter your details to begin your journey with us.
                </p>
              </div>

              {/* GOOGLE BUTTON ONLY */}
              <div className="flex justify-center mb-8">
                <button
                  type="button"
                  onClick={handleGoogleLogin}
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-3 border border-outline rounded-lg py-3 hover:bg-surface-container transition disabled:opacity-50"
                >
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/281/281764.png"
                    alt="Google"
                    className="w-5 h-5"
                  />

                  <span className="text-sm font-medium">
                    Continue with Google
                  </span>
                </button>
              </div>

              {/* FORM */}
              <form onSubmit={handleSubmit} className="space-y-7">
                {/* NAME */}
                <div>
                  <label className="block text-sm mb-2 text-on-surface-variant">
                    Full Name
                  </label>

                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Junaid Ali"
                    required
                    className="w-full border border-outline rounded-lg px-4 py-3 bg-transparent focus:ring-2 focus:ring-primary outline-none"
                  />
                </div>

                {/* EMAIL */}
                <div>
                  <label className="block text-sm mb-2 text-on-surface-variant">
                    Email Address
                  </label>

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="junaid@gmail.com"
                    required
                    className="w-full border border-outline rounded-lg px-4 py-3 bg-transparent focus:ring-2 focus:ring-primary outline-none"
                  />
                </div>

                {/* PASSWORD */}
                <div>
                  <label className="block text-sm mb-2 text-on-surface-variant">
                    Password
                  </label>

                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="••••••••"
                      required
                      className="w-full border border-outline rounded-lg px-4 py-3 pr-12 bg-transparent focus:ring-2 focus:ring-primary outline-none"
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>

                {/* BUTTON */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-primary text-white py-3 rounded-lg font-medium hover:opacity-90 transition disabled:opacity-50 flex items-center justify-center"
                >
                  {loading ? <ButtonLoader /> : "Create Account"}
                </button>
              </form>

              {/* LOGIN */}
              <p className="mt-10 text-center text-sm text-on-surface-variant">
                Already a member?
                <Link
                  to="/login"
                  className="ml-1 text-primary font-medium hover:underline"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}
