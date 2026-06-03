import { Link } from "react-router-dom";

import { FaInstagram, FaFacebookF } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="w-full bg-[#efeeea] px-8 pb-10 pt-20 text-[#061b0e]">
      {/* TOP GRID */}
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 md:grid-cols-4">
        {/* BRAND */}
        <div>
          <h2 className="mb-6 font-serif text-xl font-light uppercase tracking-[0.5em] text-[#061b0e]/60">
            Charsadda Chappal
          </h2>

          <p className="text-sm leading-relaxed opacity-70 max-w-sm">
            Premium handmade Charsadda Chappals crafted with traditional
            Pakistani craftsmanship, timeless comfort, and modern elegance.
          </p>
        </div>

        {/* IMPORTANT LINKS */}
        <div>
          <h6 className="mb-6 text-xs font-bold uppercase tracking-widest">
            Important Links
          </h6>

          <ul className="space-y-4">
            <li>
              <Link
                to="/returns-refunds"
                className="transition hover:opacity-60"
              >
                Return & Refunds
              </Link>
            </li>

            <li>
              <Link
                to="/privacy-policy"
                className="transition hover:opacity-60"
              >
                Privacy Policy
              </Link>
            </li>

            <li>
              <Link to="/contact" className="transition hover:opacity-60">
                Contact Us
              </Link>
            </li>
          </ul>
        </div>

        {/* CONTACT */}
        <div>
          <h6 className="mb-6 text-xs font-bold uppercase tracking-widest">
            Contact Us
          </h6>

          <div className="space-y-4 text-sm">
            <a
              href="tel:+923335742086"
              className="block transition hover:opacity-60"
            >
              +92 310 2991736
            </a>

            <a
              href="tel:+923055102308"
              className="block transition hover:opacity-60"
            >
              +92 316 985 2047
            </a>

            <a
              href="mailto:info@charsaddachappal.com"
              className="block transition hover:opacity-60"
            >
              info@charsaddachappal.com
            </a>
          </div>
        </div>

        {/* SOCIAL */}
        <div>
          <h6 className="mb-6 text-xs font-bold uppercase tracking-widest">
            Follow Us
          </h6>

          <div className="flex items-center gap-5">
            {/* INSTAGRAM */}
            <a
              href="https://instagram.com/"
              target="_blank"
              rel="noreferrer"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-black/10 bg-white transition hover:-translate-y-1"
            >
              <FaInstagram size={20} />
            </a>

            {/* FACEBOOK */}
            <a
              href="https://facebook.com/"
              target="_blank"
              rel="noreferrer"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-black/10 bg-white transition hover:-translate-y-1"
            >
              <FaFacebookF size={18} />
            </a>
          </div>
        </div>
      </div>

      {/* BOTTOM */}
      <div className="mx-auto mt-20 flex max-w-7xl flex-col items-center justify-between gap-4 border-t border-black/10 pt-8 text-center md:flex-row">
        <p className="text-xs opacity-70">
          © 2026 Charsadda Chappal. All Rights Reserved.
        </p>

        <p className="text-xs uppercase tracking-[0.2em] opacity-50">
          Handmade in Pakistan
        </p>
      </div>
    </footer>
  );
};

export default Footer;
