const Footer = () => {
  return (
    <footer className="w-full pt-20 pb-10 px-8 bg-[#efeeea] text-[#061b0e]">
      {/* TOP GRID */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 max-w-7xl mx-auto text-center justify-items-center">
        {/* Paklet */}
        <div>
          <div className="font-serif text-3xl opacity-10 mb-8">Paklet</div>
          <p className="font-sans text-xs tracking-tighter opacity-80 leading-relaxed">
            A destination for those who value the story as much as the object.
            Celebrating the cultural soul of Pakistan through sustainable
            luxury.
          </p>
        </div>

        {/* Collections */}
        <div>
          <h6 className="font-label text-xs uppercase tracking-widest font-bold mb-6">
            Collections
          </h6>
          <ul className="space-y-4">
            <li>
              <a className="footer-link" href="#">
                Autumn Silk '24
              </a>
            </li>
            <li>
              <a className="footer-link" href="#">
                The Indigo Room
              </a>
            </li>
            <li>
              <a className="footer-link" href="#">
                Signature Gold
              </a>
            </li>
          </ul>
        </div>

        {/* Atelier */}
        <div>
          <h6 className="font-label text-xs uppercase tracking-widest font-bold mb-6">
            The Atelier
          </h6>
          <ul className="space-y-4">
            <li>
              <a className="footer-link" href="#">
                Our Artisans
              </a>
            </li>
            <li>
              <a className="footer-link" href="#">
                Heritage Mission
              </a>
            </li>
            <li>
              <a className="footer-link" href="#">
                Sustainability
              </a>
            </li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h6 className="font-label text-xs uppercase tracking-widest font-bold mb-6">
            Support
          </h6>
          <ul className="space-y-4">
            <li>
              <a className="footer-link" href="#">
                Shipping
              </a>
            </li>
            <li>
              <a className="footer-link" href="#">
                Privacy
              </a>
            </li>
            <li>
              <a className="footer-link" href="#">
                Contact
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* BOTTOM SECTION (SEPARATE) */}
      <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-outline-variant/20 flex flex-col items-center gap-4 text-center">
        <p className="font-sans text-xs tracking-tighter opacity-80">
          © 2024 Paklet. Designed for the Digital Atelier.
        </p>

        <div className="flex gap-6 justify-center">
          <a
            className="material-symbols-outlined text-xl opacity-60 hover:opacity-100 transition-opacity"
            href="#"
          >
            facebook
          </a>
          <a
            className="material-symbols-outlined text-xl opacity-60 hover:opacity-100 transition-opacity"
            href="#"
          >
            camera_enhance
          </a>
          <a
            className="material-symbols-outlined text-xl opacity-60 hover:opacity-100 transition-opacity"
            href="#"
          >
            share
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
