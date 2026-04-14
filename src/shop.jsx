import React from "react";

const Shop: React.FC = () => {
  return (
    <div className="font-body bg-background text-on-surface selection:bg-secondary-container">
      {/* Top NavBar – already exists globally, but we keep the markup for a self‑contained demo */}
      <nav className="fixed top-0 w-full z-50 bg-[#fbf9f5]/80 dark:bg-[#061b0e]/80 backdrop-blur-xl flex justify-between items-center px-6 py-4 max-w-none">
        <div className="flex items-center gap-8">
          <span className="text-2xl font-serif font-bold tracking-tighter text-[#061b0e] dark:text-[#fbf9f5]">
            Paklet
          </span>
          <div className="hidden md:flex gap-6">
            <a
              className="text-[#775a19] border-b border-[#775a19] pb-1 font-serif italic text-sm"
              href="#"
            >
              Shop
            </a>
            <a
              className="text-[#061b0e] dark:text-[#fbf9f5] opacity-70 hover:opacity-100 hover:text-[#775a19] transition-all duration-300 font-serif italic text-sm"
              href="#"
            >
              Collections
            </a>
            <a
              className="text-[#061b0e] dark:text-[#fbf9f5] opacity-70 hover:opacity-100 hover:text-[#775a19] transition-all duration-300 font-serif italic text-sm"
              href="#"
            >
              Heritage
            </a>
            <a
              className="text-[#061b0e] dark:text-[#fbf9f5] opacity-70 hover:opacity-100 hover:text-[#775a19] transition-all duration-300 font-serif italic text-sm"
              href="#"
            >
              About
            </a>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button className="material-symbols-outlined text-[#061b0e] dark:text-[#fbf9f5]">
            person
          </button>
          <button className="material-symbols-outlined text-[#061b0e] dark:text-[#fbf9f5]">
            shopping_bag
          </button>
        </div>
      </nav>

      {/* Main content */}
      <main className="pt-24 min-h-screen">
        {/* Header Section */}
        <header className="px-6 md:px-12 py-12 max-w-7xl mx-auto">
          <nav className="mb-4">
            <ol className="flex text-[10px] uppercase tracking-[0.2em] text-on-surface-variant/60">
              <li>
                <a className="hover:text-secondary" href="#">
                  Home
                </a>
              </li>
              <li className="mx-2">/</li>
              <li>
                <a className="hover:text-secondary" href="#">
                  Collections
                </a>
              </li>
              <li className="mx-2">/</li>
              <li className="text-on-surface">The Silk Route</li>
            </ol>
          </nav>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h1 className="text-5xl md:text-7xl font-headline italic text-primary leading-tight">
                The Silk Route
              </h1>
              <p className="text-on-surface-variant max-w-lg mt-4 font-light leading-relaxed">
                Hand-loomed heritage meets modern silhouettes. A curation of
                pieces defined by centuries‑old craft and contemporary utility.
              </p>
            </div>

            <div className="relative inline-block text-left group">
              <button className="flex items-center gap-4 py-2 border-b border-outline-variant/30 text-xs uppercase tracking-widest font-medium">
                Sort By: Recommended
                <span className="material-symbols-outlined text-sm">
                  expand_more
                </span>
              </button>
              {/* Dropdown placeholder – add your dropdown component here */}
            </div>
          </div>
        </header>

        <section className="max-w-7xl mx-auto px-6 md:px-12 pb-32 flex gap-12">
          {/* Sidebar Filters */}
          <aside className="hidden lg:block w-64 flex-shrink-0 sticky top-32 h-fit">
            <div className="space-y-10">
              {/* Categories */}
              <div>
                <h3 className="font-sans uppercase tracking-[0.1em] text-xs font-bold text-primary mb-6">
                  Categories
                </h3>
                <ul className="space-y-3">
                  <li>
                    <a
                      className="text-xs uppercase tracking-widest text-secondary font-bold flex items-center gap-2"
                      href="#"
                    >
                      <span className="w-1 h-1 bg-secondary rounded-full" />
                      Apparel
                    </a>
                  </li>
                  <li>
                    <a
                      className="text-xs uppercase tracking-widest text-on-surface/60 hover:text-primary transition-colors"
                      href="#"
                    >
                      Home &amp; Living
                    </a>
                  </li>
                  <li>
                    <a
                      className="text-xs uppercase tracking-widest text-on-surface/60 hover:text-primary transition-colors"
                      href="#"
                    >
                      Jewelry
                    </a>
                  </li>
                  <li>
                    <a
                      className="text-xs uppercase tracking-widest text-on-surface/60 hover:text-primary transition-colors"
                      href="#"
                    >
                      Heritage Archive
                    </a>
                  </li>
                </ul>
              </div>

              {/* Price Range */}
              <div className="pt-8 border-t border-outline-variant/20">
                <h3 className="font-sans uppercase tracking-[0.1em] text-xs font-bold text-primary mb-6">
                  Price Range
                </h3>
                <div className="space-y-3">
                  <label className="flex items-center gap-3 text-xs uppercase tracking-widest text-on-surface/60 cursor-pointer">
                    <input
                      className="rounded-none border-outline-variant text-primary focus:ring-0"
                      type="checkbox"
                    />{" "}
                    $100 - $500
                  </label>
                  <label className="flex items-center gap-3 text-xs uppercase tracking-widest text-on-surface/60 cursor-pointer">
                    <input
                      className="rounded-none border-outline-variant text-primary focus:ring-0"
                      type="checkbox"
                    />{" "}
                    $500 - $1500
                  </label>
                  <label className="flex items-center gap-3 text-xs uppercase tracking-widest text-on-surface/60 cursor-pointer">
                    <input
                      className="rounded-none border-outline-variant text-primary focus:ring-0"
                      type="checkbox"
                    />{" "}
                    $1500+
                  </label>
                </div>
              </div>

              {/* Craft Type */}
              <div className="pt-8 border-t border-outline-variant/20">
                <h3 className="font-sans uppercase tracking-[0.1em] text-xs font-bold text-primary mb-6">
                  Craft Type
                </h3>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Zardozi",
                    "Hand-Loomed",
                    "Block Print",
                    "Indigo Dye",
                  ].map((type) => (
                    <button
                      key={type}
                      className="px-3 py-1 bg-surface-container text-[10px] uppercase tracking-tighter border border-outline-variant/30 hover:bg-surface-container-highest transition-colors"
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Product Grid */}
          <div className="flex-grow">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-16">
              {/* Card – repeat for each product */}
              {[
                {
                  id: 1,
                  img:
                    "https://lh3.googleusercontent.com/aida-public/AB6AXuAyC27IjtaBG3WPf6itBkrV4ps8iLpVG_L7cgdLOWmwXDzOayhrIrFs3NW4jQSz7LxbG14CeSREzN59ZRh6W614ZYDl8kmrt5flopmbeUB3u9a5Y8QXObnjp_haQkLOvH-xy8bRgfLOZAqSOD2_lPqstz-WaUChLmHSP7jyyW014nL_QbSuZTB_pgDRtkWoQ_RnMxnBJ4hfoTpHD9lLP7hYkVHl3BmVsCiZkr1incqYaa0G-dPnCP9vOqvu1Xi1OxRi8JF2n0Ff0J0",
                  title: "Kashmiri Wool Kaftan",
                  subtitle: "Hand-Embroidered",
                  price: "$850",
                },
                {
                  id: 2,
                  img:
                    "https://lh3.googleusercontent.com/aida-public/AB6AXuBTrtWE7Nqjw_Z5s-8Tg3q20KzBGByXXNgfNNpD2Kb_hBcHhp1VL6Md6puSLJIMkT1O23iJ58fT-6VoALJk7Eij61iv4No2OJj7I9SXtCHeJyX41ba2JOMh0U2Jp_cUIV1CjiWRG5fuZyyp7kzcIXmfTSlOGHxaXfF5LSkx1CH3lrk3dz4EQwJeTIIX9Q1MDCyZF9ezvEDCBJnJAqWwk1wvOORbF93dAlbxKmIiqJb6KYuxWrNH9PvrOzdXH5b2JTamkOvp3xmSSak",
                  title: "Emerald Jali Wrap",
                  subtitle: "Limited Edition",
                  price: "$420",
                },
                {
                  id: 3,
                  img:
                    "https://lh3.googleusercontent.com/aida-public/AB6AXuA8wI76r10VDXPglUDEBSG1Qf6MU6i5oz1O9q0YksiDtR2ACNdxq0qnVsHvMuRyWkKekxHgT-ihZYfyxQI2rncV4zZysWP5GHKerz2u87aYHQt49_eGDtBBt6Q0H_1yVUCa0KtAsPy7K_FYsYj3x_qWxYhe7b0SzeUysHqIkf-Fw4D5fgyYWI7JtCAgBcgAG7BZr-XRJ6k_pdSaN0947tUFj5NFg49VqV9dh0nb4aAx9pdemSeNfHmyAj0VZK1MJi7jm-xs0Tc68i0",
                  title: "Indus Vessel No. 04",
                  subtitle: "Artisan Pottery",
                  price: "$310",
                },
                {
                  id: 4,
                  img:
                    "https://lh3.googleusercontent.com/aida-public/AB6AXuArL2_vzRkTDOcF73nBTZrMyYAmXprkszY0f-xYLSAEJC_nf9Y0BRed5Wz3N2P_RZI3W-rmSIy-oysECLcBC042kCP1RHyAcmuGBXT2nXsg6y2Iufoi-FKdpTX-Io-Mm8mNGx85F6zQudSKP--i8XAtuxHzEWfU3k6RLPeL-98-A2ve4plzuaM4dvsBm9OiQi9g6rrauF4lZpFf8_5iyiYxBwLHsNqqAQPlGfLKSilQHf31Y6yBUMD4C8FqaSqdNGm2O31sUSgnIfg",
                  title: "Gilded Loom Tunic",
                  subtitle: "Signature Craft",
                  price: "$1,200",
                },
                {
                  id: 5,
                  img:
                    "https://lh3.googleusercontent.com/aida-public/AB6AXuA_4x7xzMPE0oPZEYn_xe0bL1TE8jTgUJvzvYdn6fEcPcCCX5OtXppKO7GxkAg0Wd_I7331DSiYszpCgbHfp2q-03WbdQZT7R4ALcBWZb_FQzYYQOEf11ujuHLV3pkfgxAGwqMP5OAxquNgq_OpAA2-XFPq-ZU-WrOJRGqq7VKSifisz6eYYkSK7k8dzxZAAdc_uyc4QvvcK8l55slXVrLkZlk18WLOApcAFagrl3hht4gKTiOlxUEwLL1TfmakOaYB-TuMbu7OlYo",
                  title: "Lahore Linen Trouser",
                  subtitle: "Summer Capsule",
                  price: "$285",
                },
                {
                  id: 6,
                  img:
                    "https://lh3.googleusercontent.com/aida-public/AB6AXuBrCGexabCPxgA_Ke3iP8LMF_OJ5XSiMjs3PdgnCyGQ461zgdmksoDHR7P8uZ8mh1HmgwSH5pmFtPWTC5qWwjtiuEm6Ner7a3ogDoYKhZL3aEHk0Mniof_HUsHEEK_3nliDh2HpZVhjpiKLGlv1lhbZJOfVyNgmnMlH_5P_gg_Hq2569wnvODhSDGGanxKeikyPUZcZnExRxYcoJy1hqAEJ88-URQuAMx_vwI5IkKJmIrlgz8gMvp2-vdIU-mxrcyXCFrhEd4gNqQI",
                  title: "Sun‑Drop Filigree",
                  subtitle: "22k Gold Plated",
                  price: "$550",
                },
              ].map((product) => (
                <div key={product.id} className="group cursor-pointer">
                  <div className="relative aspect-[3/4] overflow-hidden bg-surface-container-low mb-6">
                    <button className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-white/90 backdrop-blur shadow-sm flex items-center justify-center text-[#1B3022] hover:bg-[#1B3022] hover:text-white transition-all duration-300">
                      <span className="material-symbols-outlined text-lg font-light">
                        add
                      </span>
                    </button>
                    <img
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      src={product.img}
                      alt={product.title}
                    />
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-surface-container-highest/20 backdrop-blur-[2px] flex items-end justify-center pb-8">
                      <button className="bg-primary text-on-primary px-8 py-3 text-xs uppercase tracking-widest font-medium rounded-xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 bg-[#1B3022]">
                        Add to Cart
                      </button>
                    </div>
                  </div>
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-sm font-medium tracking-tight text-primary">
                        {product.title}
                      </h4>
                      <p className="text-[10px] uppercase tracking-[0.15em] text-on-surface-variant mt-1">
                        {product.subtitle}
                      </p>
                    </div>
                    <span className="text-sm font-headline italic">
                      {product.price}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Load More */}
            <div className="mt-32 text-center">
              <button className="group relative px-12 py-4 bg-surface-container hover:bg-surface-container-highest transition-colors duration-500">
                <span className="text-xs uppercase tracking-[0.3em] font-semibold text-primary">
                  Load More Artisanal Pieces
                </span>
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-8 h-[1px] bg-secondary group-hover:w-full transition-all duration-500" />
              </button>
              <p className="text-[10px] uppercase tracking-widest text-on-surface/40 mt-8">
                Showing 6 of 48 Designs
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer – already present globally, keeping markup for completeness */}
      <footer className="bg-[#efeeea] dark:bg-[#061b0e] w-full pt-20 pb-10 px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 max-w-7xl mx-auto">
          <div className="col-span-1 md:col-span-1">
            <div className="font-serif text-3xl opacity-10 mb-8">Paklet</div>
            <p className="font-sans text-xs tracking-tighter opacity-80 text-[#061b0e] dark:text-[#fbf9f5] leading-relaxed">
              A digital atelier celebrating the convergence of ancestral
              Pakistani craft and contemporary global aesthetics.
            </p>
          </div>

          <div>
            <h5 className="text-[10px] uppercase tracking-widest font-bold mb-6">
              Collections
            </h5>
            <ul className="space-y-3 font-sans text-xs tracking-tighter opacity-80">
              <li>
                <a
                  className="text-[#061b0e] dark:text-[#fbf9f5] hover:opacity-100 hover:text-[#775a19] transition-opacity"
                  href="#"
                >
                  The Silk Route
                </a>
              </li>
              <li>
                <a
                  className="text-[#061b0e] dark:text-[#fbf9f5] hover:opacity-100 hover:text-[#775a19] transition-opacity"
                  href="#"
                >
                  Indus Vessels
                </a>
              </li>
              <li>
                <a
                  className="text-[#061b0e] dark:text-[#fbf9f5] hover:opacity-100 hover:text-[#775a19] transition-opacity"
                  href="#"
                >
                  Archive Pieces
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="text-[10px] uppercase tracking-widest font-bold mb-6">
              The Atelier
            </h5>
            <ul className="space-y-3 font-sans text-xs tracking-tighter opacity-80">
              <li>
                <a
                  className="text-[#061b0e] dark:text-[#fbf9f5] hover:opacity-100 hover:text-[#775a19] transition-opacity"
                  href="#"
                >
                  Artisans
                </a>
              </li>
              <li>
                <a
                  className="underline text-[#775a19] hover:opacity-100 hover:text-[#775a19] transition-opacity"
                  href="#"
                >
                  Shipping
                </a>
              </li>
              <li>
                <a
                  className="text-[#061b0e] dark:text-[#fbf9f5] hover:opacity-100 hover:text-[#775a19] transition-opacity"
                  href="#"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="text-[10px] uppercase tracking-widest font-bold mb-6">
              Legal
            </h5>
            <ul className="space-y-3 font-sans text-xs tracking-tighter opacity-80">
              <li>
                <a
                  className="text-[#061b0e] dark:text-[#fbf9f5] hover:opacity-100 hover:text-[#775a19] transition-opacity"
                  href="#"
                >
                  Privacy
                </a>
              </li>
              <li>
                <a
                  className="text-[#061b0e] dark:text-[#fbf9f5] hover:opacity-100 hover:text-[#775a19] transition-opacity"
                  href="#"
                >
                  Terms
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto border-t border-outline-variant/10 mt-20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <span className="font-sans text-xs tracking-tighter opacity-80 text-[#061b0e] dark:text-[#fbf9f5]">
            © 2024 Paklet. Designed for the Digital Atelier.
          </span>
          <div className="flex gap-6">
            <span className="material-symbols-outlined text-lg opacity-40">
              language
            </span>
            <span className="material-symbols-outlined text-lg opacity-40">
              potted_plant
            </span>
          </div>
        </div>
      </footer>

      {/* Mobile Bottom NavBar – optional inclusion */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full flex justify-around items-center px-4 pt-3 pb-6 bg-[#fbf9f5]/90 dark:bg-[#061b0e]/90 backdrop-blur-md shadow-[0_-4px_24px_rgba(0,0,0,0.04)] z-50 rounded-t-3xl">
        <a
          className="flex flex-col items-center text-[#061b0e]/40 dark:text-[#fbf9f5]/40 hover:text-[#061b0e] dark:hover:text-white tap-highlight-transparent active:scale-90 transition-transform"
          href="#"
        >
          <span className="material-symbols-outlined">home</span>
          <span className="font-sans text-[10px] uppercase tracking-widest mt-1">
            Home
          </span>
        </a>
        <a
          className="flex flex-col items-center text-[#775a19] scale-110 tap-highlight-transparent active:scale-90 transition-transform"
          href="#"
        >
          <span className="material-symbols-outlined">storefront</span>
          <span className="font-sans text-[10px] uppercase tracking-widest mt-1">
            Shop
          </span>
        </a>
        <a
          className="flex flex-col items-center text-[#061b0e]/40 dark:text-[#fbf9f5]/40 hover:text-[#061b0e] dark:hover:text-white tap-highlight-transparent active:scale-90 transition-transform"
          href="#"
        >
          <span className="material-symbols-outlined">search</span>
          <span className="font-sans text-[10px] uppercase tracking-widest mt-1">
            Search
          </span>
        </a>
        <a
          className="flex flex-col items-center text-[#061b0e]/40 dark:text-[#fbf9f5]/40 hover:text-[#061b0e] dark:hover:text-white tap-highlight-transparent active:scale-90 transition-transform"
          href="#"
        >
          <span className="material-symbols-outlined">shopping_cart</span>
          <span className="font-sans text-[10px] uppercase tracking-widest mt-1">
            Cart
          </span>
        </a>
      </nav>
    </div>
  );
};

export default Shop;