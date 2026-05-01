import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const CollectionPage = () => {
  return (
    <div className="bg-surface text-on-surface min-h-screen px-4 sm:px-8">
      <Navbar />

      <main className="pt-32 pb-24 relative overflow-hidden">
        {/* Heritage Background Accent */}
        <div className="absolute inset-0 jali-pattern pointer-events-none opacity-40"></div>
        <div className="absolute top-40 -left-20 text-[20rem] font-headline text-outline-variant/5 select-none pointer-events-none">
          P
        </div>

        {/* Page Header */}
        <header className="relative px-8 max-w-screen-xl mx-auto mb-20">
          <div className="max-w-3xl">
            <h1 className="text-6xl md:text-8xl font-headline text-primary leading-tight tracking-tighter">
              Our Collections
            </h1>
            <p className="mt-8 text-lg text-on-surface-variant font-light max-w-xl leading-relaxed">
              A dialogue between ancestral wisdom and contemporary form. Explore
              our meticulously curated selections of heritage craft and modern
              artistry.
            </p>
          </div>
        </header>

        {/* Collection Grid */}
        <section className="px-8 max-w-screen-xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
            {/* Large Feature Card */}
            <div className="md:col-span-8 group relative aspect-[16/10] overflow-hidden rounded-none bg-surface-container-low">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuD0IMUjDf0aA7i-aXX2iFtgwvFI9b5FXrF8dkMMvUC5dfX_FadFsRbgUoBr7MoQ6VdWexcgzkO8CEzoRtR-vJtyJ3Erz9mWEdcYNW2UGv75mowTSygKF4R-VoFb9diT4PahcMPS_qB4EiSrXltu9ZnxSsCiii0rz1KNM7O0OOxeD4aQdIIQd1Fxxt13UiMdwWwPz_CZSlT0yPTOZm7HaHdLbiSawqNKMV9fHdFNw2QBMBnoEJO1e9WrSOK-FqVGmNaSOhmu3Fx-b4Y"
                alt="Luxurious folded silk fabrics in deep emerald and saffron colors with intricate hand-woven metallic threads in a high-end atelier setting"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent"></div>
              <div className="absolute bottom-12 left-12 right-12 flex justify-between items-end">
                <div>
                  <h3 className="text-4xl font-headline text-on-primary mb-2">
                    The Silk Route
                  </h3>
                  <p className="text-on-primary/80 font-light max-w-xs">
                    Hand-loomed textiles inspired by the ancient trade corridors
                    of Central Asia.
                  </p>
                </div>
                <a
                  className="flex items-center space-x-3 text-on-primary group-hover:text-secondary-fixed transition-colors"
                  href="#"
                >
                  <span className="font-label tracking-widest text-sm uppercase">
                    Explore
                  </span>
                  <span className="material-symbols-outlined text-sm">
                    north_east
                  </span>
                </a>
              </div>
            </div>

            {/* Heritage Archive Card */}
            <div className="md:col-span-4 group relative aspect-[4/5] md:aspect-auto overflow-hidden rounded-none bg-surface-container">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuACEwSm6tbEkqnhI19Bi80jIerlJ0iMrC_sBCA1co8aPN5_UN2IyBUVMOPk3BcAmTlMCz2h9W15XKbdW1_AnbmC2iqWwekpNLQq_rUTzuiy-RMV9wV2gzKKckofgFSIBihhoOH9Qv91X4usJBXWHnRWJbKatnRGuSkdMYsA7qrx7weO7pXZ049CPNYAf6ngor3CzfHPuOE2nxaPyakNN9T6dtJRNQ_I-RAxhvCIAaTz0LrxqCxdjdzCpfestHHynHupR2v_PGMTnUI"
                alt="Close-up of a vintage hand-carved dark wood chest with ornate brass inlay patterns and soft atmospheric museum lighting"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-primary/20 group-hover:bg-primary/10 transition-colors"></div>
              <div className="absolute inset-0 flex flex-col justify-end p-10">
                <h3 className="text-3xl font-headline text-on-primary mb-2">
                  Heritage Archive
                </h3>
                <a
                  className="text-secondary-fixed font-label tracking-widest text-sm uppercase flex items-center"
                  href="#"
                >
                  Explore{" "}
                  <span className="material-symbols-outlined ml-2 text-sm">
                    arrow_forward
                  </span>
                </a>
              </div>
            </div>

            {/* Artisan Apparel Card */}
            <div className="md:col-span-5 group relative aspect-[4/5] overflow-hidden rounded-none bg-surface-container-highest">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAfowFf2-R5UXpW-9RkHopzZtMaFzeTEDPCGYTHXsxZU-NjjGQ1sMqJy5axYM8G1ucDBGNnZLKJZ9Unq5yxKXTiFkSRv88vA8Xl62d51-qoVSe1XdXCSQdv9bgj3hRfNpbwvL5PdXKcQP7TTl0UPcu2yi8tBvMfFidPyXTSvWAzq-pC5_PIDAKXJXp6GAH6nabB8ZRVHFfJ8MVMfVVGDdmlcCQmOlocpuer0UR42gJaPm9ARa7SErAFyM-jnEmA0ttsiHM-GF9sLCs"
                alt="Minimalist luxury fashion portrait of a man in a structured ivory linen tunic against a neutral architectural background"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 p-10 flex flex-col justify-between">
                <div className="text-on-primary-fixed-variant font-label tracking-tighter text-xs">
                  VOLUME IV
                </div>
                <div>
                  <h3 className="text-3xl font-headline text-primary mb-2">
                    Artisan Apparel
                  </h3>
                  <a
                    className="text-secondary font-label tracking-widest text-sm uppercase inline-block border-b border-secondary/0 hover:border-secondary transition-all"
                    href="#"
                  >
                    Explore Collection
                  </a>
                </div>
              </div>
            </div>

            {/* Modern Stoneware Card */}
            <div className="md:col-span-7 group relative aspect-video md:aspect-auto overflow-hidden rounded-none bg-surface-container-low">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAGq8CoPsdWNjdS_I71sYRCIfsmP_ukJLbzAhyOpjFusM35JfOOFoauZiGsMNIB9tZKYcfLVh2NgeRJ2clKUuUuvW5DtllhTpocuemESfSTAH7DLNwfRtOC3MVA9XyENDpWEfAvluFTMBMBvKZ976jTYr8-2Trttf20cve3bXMQCix1x8H98cX69BVrRzv-qXKBYV03KM-QHB5cgTK0bz6BWQSlj-PazR-g8s39SQOCHMxmtYkRiPD1dS8_p571zMxaboqoYUA0w2o"
                alt="Collection of minimalist handmade ceramic vases in matte earth tones arranged asymmetrically on a raw stone ledge"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/5"></div>
              <div className="absolute bottom-10 right-10 text-right">
                <h3 className="text-3xl font-headline text-primary mb-2">
                  Modern Stoneware
                </h3>
                <p className="text-on-surface-variant font-light mb-6">
                  Sculptural objects for the curated home.
                </p>
                <a
                  className="bg-primary text-on-primary px-8 py-4 font-label text-xs tracking-widest inline-block transition-opacity hover:opacity-90"
                  href="#"
                >
                  Explore
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default CollectionPage;
