import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const srcSet = (name, widths) =>
  widths.map(([file, w]) => `/images/${name}-${file}.webp ${w}w`).join(", ");

const heroSlides = [
  {
    name: "hero1",
    srcSet: srcSet("hero1", [["640", 640], ["1280", 1280], ["1920", 1537]]),
    title: "GOL-T",
    alt: "Handmade brown Gol T Charsadda chappal",
    subtitle: "Traditional round toe elegance reimagined.",
  },
  {
    name: "hero2",
    srcSet: srcSet("hero2", [["640", 640], ["1280", 1280], ["1920", 1537]]),
    title: "ZARDARI",
    alt: "Handmade leather Zardari chappal from Charsadda",
    subtitle: "Luxury handmade Charsadda craftsmanship.",
  },
  {
    name: "hero4",
    srcSet: srcSet("hero4", [["640", 640], ["1280", 1024]]),
    title: "KAPTAAN",
    alt: "Black leather Kaptaan chappal",
    subtitle: "Bold heritage crafted for modern leaders.",
  },
];

const Hero = () => {
  const [current, setCurrent] = useState(0);

  // AUTO SLIDE
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % heroSlides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const slide = heroSlides[current];

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Featured Charsadda chappal styles"
      className="relative min-h-screen overflow-hidden pt-28 sm:pt-32 lg:pt-40"
    >
      {/* BACKGROUND IMAGE */}
      <div className="absolute inset-0">
        <img
          key={slide.name}
          src={`/images/${slide.name}-1280.webp`}
          srcSet={slide.srcSet}
          sizes="100vw"
          alt={slide.alt}
          width="1280"
          height="852"
          fetchPriority={current === 0 ? "high" : "auto"}
          decoding={current === 0 ? "sync" : "async"}
          className="h-full w-full object-cover transition-all duration-1000"
        />

        {/* DARK OVERLAY */}
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* CONTENT */}
      <div className="relative z-10 flex min-h-[80vh] items-center justify-center px-6 text-center">
        <div className="max-w-5xl">
          <h1 className="mb-4 text-sm uppercase tracking-[0.4em] text-white/90">
            Handmade Charsadda Chappals
          </h1>

          <p
            aria-live="polite"
            className="font-serif text-5xl font-bold tracking-tight text-white md:text-8xl"
          >
            {slide.title}
          </p>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-white/90 md:text-xl">
            {slide.subtitle}
          </p>

          {/* BUTTONS */}
          <div className="mt-10 flex flex-col items-center justify-center gap-4 md:flex-row">
            <Link
              to="/shop"
              className="w-full sm:w-auto rounded-2xl bg-white px-10 py-4 text-sm font-semibold uppercase tracking-[0.25em] text-black transition hover:scale-105"
            >
              Shop Now
            </Link>
          </div>

          {/* SLIDER DOTS */}
          <div className="mt-10 flex justify-center gap-1" role="group" aria-label="Choose slide">
            {heroSlides.map((s, index) => (
              <button
                key={s.name}
                type="button"
                onClick={() => setCurrent(index)}
                aria-label={`Show ${s.title} slide`}
                aria-pressed={current === index}
                className="flex h-6 w-6 items-center justify-center"
              >
                <span
                  className={`h-3 w-3 rounded-full transition ${
                    current === index ? "bg-white" : "bg-white/40"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* WATERMARK */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 right-4 select-none font-serif text-[6rem] sm:text-[8rem] md:text-[12rem] font-bold text-white/5"
      >
        P
      </div>
    </section>
  );
};

export default Hero;
