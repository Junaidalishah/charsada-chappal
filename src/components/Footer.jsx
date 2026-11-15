import { Link } from "react-router-dom";

import { FaInstagram, FaFacebookF } from "react-icons/fa";

const Footer = () => {
  return (
    <footer aria-label="Site footer" className="w-full bg-[#efeeea] px-4 sm:px-6 lg:px-8 pb-10 pt-16 md:pt-20">
      {/* TOP GRID */}
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 md:grid-cols-4">
        {/* BRAND */}
        <div>
          <h2 className="mb-6 font-serif text-xl font-light uppercase tracking-[0.5em] text-[#061b0e]/80">
            Charsadda Chappal
          </h2>

          <p className="text-sm leading-relaxed text-[#3f3b35] max-w-sm">
            Premium handmade Charsadda Chappals crafted in Charsadda, Khyber
            Pakhtunkhwa with traditional Pashtun craftsmanship, timeless
            comfort, and modern elegance. Free delivery across Pakistan.
          </p>
        </div>

        {/* IMPORTANT LINKS */}
        <div>
          <h3 className="mb-6 text-xs font-bold uppercase tracking-widest">
            Important Links
          </h3>

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

            <li>
              <Link
                to="/charsadda-chappal-guide"
                className="transition hover:opacity-60"
              >
                Charsadda Chappal Guide
              </Link>
            </li>

            <li>
              <Link to="/shop" className="transition hover:opacity-60">
                Shop All Chappals
              </Link>
            </li>
          </ul>
        </div>

        {/* CONTACT */}
        <div>
          <h3 className="mb-6 text-xs font-bold uppercase tracking-widest">
            Contact Us
          </h3>

          <div className="space-y-4 text-sm">
            <a
              href="tel:+923102991736"
              className="block transition hover:opacity-60"
            >
              +92 310 2991736
            </a>

            <a
              href="mailto:infocharsaddachappal@gmail.com"
              className="block transition hover:opacity-60"
            >
              infocharsaddachappal@gmail.com
            </a>
          </div>
        </div>

        {/* SOCIAL */}
        <div>
          <h3 className="mb-6 text-xs font-bold uppercase tracking-widest">
            Follow Us
          </h3>

          <div className="flex justify-center md:justify-start items-center gap-5">
            {/* INSTAGRAM */}
            <a
              href="https://www.instagram.com/infocharsaddachappal/"
              target="_blank"
              rel="noreferrer"
              aria-label="Charsadda Chappal on Instagram"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-black/10 bg-white transition hover:-translate-y-1"
            >
              <FaInstagram size={20} aria-hidden="true" />
            </a>

            {/* FACEBOOK */}
            <a
              href="https://www.facebook.com/people/Charsadda-Chappal/61590432431640/"
              target="_blank"
              rel="noreferrer"
              aria-label="Charsadda Chappal on Facebook"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-black/10 bg-white transition hover:-translate-y-1"
            >
              <FaFacebookF size={18} aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>

      {/* BOTTOM */}
      <div className="mx-auto mt-20 flex max-w-7xl flex-col items-center justify-between gap-4 border-t border-black/10 pt-8 text-center md:flex-row">
        <p className="text-xs text-[#3f3b35]">
          © 2026 Charsadda Chappal. All Rights Reserved.
        </p>

        <p className="text-xs uppercase tracking-[0.2em] text-[#5f5a52]">
          Handmade in Pakistan
        </p>
      </div>
    </footer>
  );
};

export default Footer;
