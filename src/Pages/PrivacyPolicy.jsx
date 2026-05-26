import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const PrivacyPolicy = () => {
  return (
    <>
      <Navbar />

      <main className="pt-36 pb-24 px-6 md:px-12 max-w-5xl mx-auto">
        {/* TITLE */}
        <div className="mb-16">
          <p className="text-xs uppercase tracking-[0.3em] text-gray-500 mb-4">
            Legal Information
          </p>

          <h1 className="font-serif text-5xl text-[#061b0e]">Privacy Policy</h1>
        </div>

        {/* CONTENT */}
        <div className="space-y-10 text-[#061b0e]/80 leading-8 text-[15px]">
          <div>
            <p>
              At Charsadda Chappal, your privacy is important to us. This
              Privacy Policy explains how we collect, use, and protect your
              information when you use our website.
            </p>
          </div>

          {/* INFORMATION WE COLLECT */}
          <div>
            <h2 className="font-semibold text-xl mb-4 text-[#061b0e]">
              Information We Collect
            </h2>

            <p>When you place an order or contact us, we may collect:</p>

            <ul className="list-disc pl-6 mt-4 space-y-3">
              <li>Your name</li>
              <li>Phone number</li>
              <li>Email address</li>
              <li>Shipping address</li>
              <li>Payment-related information</li>
            </ul>
          </div>

          {/* HOW WE USE */}
          <div>
            <h2 className="font-semibold text-xl mb-4 text-[#061b0e]">
              How We Use Your Information
            </h2>

            <p>Your information is used to:</p>

            <ul className="list-disc pl-6 mt-4 space-y-3">
              <li>Process and deliver your orders</li>
              <li>Provide customer support</li>
              <li>Send order updates</li>
              <li>Improve our website and services</li>
              <li>Notify you about new arrivals and offers</li>
            </ul>
          </div>

          {/* PAYMENT SECURITY */}
          <div>
            <h2 className="font-semibold text-xl mb-4 text-[#061b0e]">
              Payment Security
            </h2>

            <p>
              All payments are processed securely through trusted payment
              gateways. We do not store your card or sensitive banking details
              on our servers.
            </p>
          </div>

          {/* DATA PROTECTION */}
          <div>
            <h2 className="font-semibold text-xl mb-4 text-[#061b0e]">
              Data Protection
            </h2>

            <p>
              We take reasonable security measures to protect your personal
              information against unauthorized access, misuse, or disclosure.
            </p>
          </div>

          {/* COOKIES */}
          <div>
            <h2 className="font-semibold text-xl mb-4 text-[#061b0e]">
              Cookies
            </h2>

            <p>
              Our website may use cookies to improve user experience, remember
              preferences, and analyze website traffic.
            </p>
          </div>

          {/* THIRD PARTY */}
          <div>
            <h2 className="font-semibold text-xl mb-4 text-[#061b0e]">
              Third-Party Services
            </h2>

            <p>
              We may use trusted third-party services such as payment providers,
              delivery partners, and analytics tools to operate our business.
            </p>
          </div>

          {/* RIGHTS */}
          <div>
            <h2 className="font-semibold text-xl mb-4 text-[#061b0e]">
              Your Rights
            </h2>

            <p>
              You may request access, correction, or deletion of your personal
              data by contacting us directly.
            </p>
          </div>

          {/* CONTACT */}
          <div>
            <h2 className="font-semibold text-xl mb-4 text-[#061b0e]">
              Contact Us
            </h2>

            <p>
              If you have any questions regarding this Privacy Policy, please
              contact us:
            </p>

            <div className="mt-4 space-y-2">
              <p className="font-semibold text-[#061b0e]">
                WhatsApp: +92 333 574 2086
              </p>

              <p className="font-semibold text-[#061b0e]">
                WhatsApp: +92 305 510 2308
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default PrivacyPolicy;
