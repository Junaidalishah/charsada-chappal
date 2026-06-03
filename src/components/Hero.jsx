import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const heroSlides = [
  {
    image: "/images/hero1.png",
    title: "GOL-T",
    subtitle: "Traditional round toe elegance reimagined.",
  },

  {
    image: "/images/hero2.png",
    title: "ZARDHERI",
    subtitle: "Luxury handmade Charsadda craftsmanship.",
  },

  {
    image: "/images/hero4.png",
    title: "KAPTAAN",
    subtitle: "Bold heritage crafted for modern leaders.",
  },
];

const Hero = () => {
  const [current, setCurrent] = useState(0);

  const navigate = useNavigate();

  // AUTO SLIDE
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % heroSlides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-screen overflow-hidden">
      {/* BACKGROUND IMAGE */}
      <div className="absolute inset-0">
        <img
          src={heroSlides[current].image}
          alt={heroSlides[current].title}
          className="h-full w-full object-cover transition-all duration-1000"
        />

        {/* DARK OVERLAY */}
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* CONTENT */}
      <div className="relative z-10 flex h-full items-center justify-center px-6 text-center">
        <div className="max-w-5xl">
          <p className="mb-4 text-sm uppercase tracking-[0.4em] text-white/70">
            Charsadda Heritage
          </p>

          <h1 className="font-serif text-5xl font-bold tracking-tight text-white md:text-8xl">
            {heroSlides[current].title}
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-white/90 md:text-xl">
            {heroSlides[current].subtitle}
          </p>

          {/* BUTTONS */}
          <div className="mt-10 flex flex-col items-center justify-center gap-4 md:flex-row">
            <button
              onClick={() => navigate("/shop")}
              className="
                rounded-2xl
                bg-white
                px-10 py-4
                text-sm font-semibold
                uppercase tracking-[0.25em]
                text-black
                transition
                hover:scale-105
              "
            >
              Shop No
            </button>
          </div>

          {/* SLIDER DOTS */}
          <div className="mt-10 flex justify-center gap-3">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrent(index)}
                className={`h-3 w-3 rounded-full transition ${
                  current === index ? "bg-white" : "bg-white/40"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* WATERMARK */}
      <div className="pointer-events-none absolute bottom-0 right-10 select-none font-serif text-[12rem] font-bold text-white/5">
        P
      </div>
    </section>
  );
};

export default Hero;
