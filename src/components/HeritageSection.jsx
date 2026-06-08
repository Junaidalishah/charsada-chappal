import { useNavigate } from "react-router-dom";

const HeritageSection = () => {
  const navigate = useNavigate();

  return (
    <section className="bg-[#f5f1ea] py-16 md:py-20 lg:py-28">
      <div className="mx-auto max-w-7xl space-y-16 md:space-y-24 lg:space-y-28 px-4 sm:px-6">
        {/* SECTION 1 */}
        <div className="grid items-center gap-14 lg:grid-cols-2">
          {/* IMAGE */}
          <div className="overflow-hidden rounded-2xl md:rounded-[2rem]">
            <img
              src="/images/heritage1.png"
              alt="Kaptaan Chappal"
              className="h-full w-full object-cover transition duration-700 hover:scale-105"
            />
          </div>

          {/* CONTENT */}
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-[#8b7355]">
              Charsadda Heritage
            </p>

            <h2 className="mb-4 md:mb-6 text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-[#061b0e]">
              Crafted Through <br /> Generations
            </h2>

            <p className="mb-4 text-base md:text-lg leading-7 md:leading-8 text-gray-600">
              Charsadda Chappals represent centuries of Pashtun craftsmanship,
              handmade by skilled artisans using premium leather and timeless
              traditional techniques.
            </p>

            <p className="mb-4 text-base md:text-lg leading-7 md:leading-8 text-gray-600">
              From Kaptaan Chappal to classic Gol-T designs, every pair reflects
              heritage, durability, and luxury made for modern wear.
            </p>

            <button
              onClick={() => navigate("/shop")}
              className="w-full sm:w-auto rounded-2xl bg-[#061b0e] px-8 py-4 text-sm uppercase tracking-[0.2em] text-white transition hover:opacity-90"
            >
              Buy Now
            </button>
          </div>
        </div>

        {/* SECTION 2 */}
        <div className="grid items-center gap-14 lg:grid-cols-2">
          {/* CONTENT */}
          <div className="order-2 lg:order-1">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-[#8b7355]">
              Timeless Tradition
            </p>

            <h2 className="mb-4 md:mb-6 text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-[#061b0e]">
              Luxury In <br /> Every Step
            </h2>

            <p className="mb-4 text-base md:text-lg leading-7 md:leading-8 text-gray-600">
              Known across Pakistan for their elegance and comfort, Charsadda
              Chappals combine traditional handcrafting with contemporary style.
            </p>

            <p className="mb-4 text-base md:text-lg leading-7 md:leading-8 text-gray-600">
              Whether worn casually or formally, these handcrafted leather
              chappals remain a symbol of culture, confidence, and identity.
            </p>

            <button
              onClick={() => navigate("/shop")}
              className="w-full sm:w-auto rounded-2xl bg-[#061b0e] px-8 py-4 text-sm uppercase tracking-[0.2em] text-white transition hover:opacity-90"
            >
              Buy Now
            </button>
          </div>

          {/* IMAGE */}
          <div className="order-1 overflow-hidden rounded-2xl md:rounded-[2rem] lg:order-2">
            <img
              src="/images/heritage2.png"
              alt="Golti Chappal"
              className="h-full w-full object-cover transition duration-700 hover:scale-105"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeritageSection;
