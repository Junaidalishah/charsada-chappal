const Hero = () => {
  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          alt="Artisan at work"
          className="w-full h-full object-cover"
          data-alt="Close up of high quality handcrafted fabric texture"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuBW6kPW6GsCizDeD-Uzs0LWBwHpfn5veW_8_VxRutFA-tqJogAjcb6Bt806HTPHgbPlh_X_c6ZMK2mMno1nlA9nsmR9Gf0K4D0f9W8EKmpwF2F7kdyNsg4qroQUE0eh4bMQ-aPpCCCE65YeZ9SX50slAzv98IwrQU26se27fxphUUZjtIYDWi3tDGHPlm7i76Pbt4TKlLDvnvlmS2WxcuTreiZYVrA-t4WXUI4LtuPGMnyHAjwpvjyzq6LcRIvbVDyoSZoJGEIzb5Y"
        />
        <div className="absolute inset-0 hero-gradient"></div>
      </div>

      <div className="relative z-10 text-center px-6 max-w-5xl">
        <h1 className="font-headline text-5xl md:text-8xl text-white mb-8 tracking-tighter leading-tight">
          HERITAGE <br /> <span className="italic font-light">REIMAGINED</span>
        </h1>
        <p className="text-white/90 font-body text-lg md:text-xl mb-10 max-w-xl mx-auto font-light tracking-wide">
          A curated dialogue between Pakistani craftsmanship and modern luxury.
        </p>
        <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
          <button className="bg-gradient-to-r from-primary to-primary-container text-white px-10 py-4 rounded-xl font-label text-sm uppercase tracking-[0.2em] transition-transform active:scale-95">
            Discover Collection
          </button>
        </div>
      </div>

      {/* Heritage Watermark Decor */}
      <div className="absolute bottom-10 right-10 opacity-5 font-headline text-[15rem] leading-none pointer-events-none select-none">
        P
      </div>
    </section>
  );
};

export default Hero;
