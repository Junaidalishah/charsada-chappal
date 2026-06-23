import { useState } from "react";

const FilterSidebar = ({
  categories,
  selectedCategory,
  setSelectedCategory,
  priceRange,
  setPriceRange,
}) => {
  const [showFilters, setShowFilters] = useState(false);

  return (
    <>
      {/* MOBILE FILTER BUTTON */}
      <button
        onClick={() => setShowFilters(!showFilters)}
        className="lg:hidden w-full mb-6 rounded-2xl border border-black/10 bg-white px-5 py-4 font-medium text-[#061b0e] flex items-center justify-between"
      >
        <span>Filters</span>
        <span className="text-xl">{showFilters ? "−" : "+"}</span>
      </button>

      {/* FILTER PANEL */}
      <aside
        className={`
          ${showFilters ? "block" : "hidden"}
          lg:block
          w-full
          lg:w-72
        `}
      >
        <div className="lg:sticky lg:top-32 space-y-10 rounded-3xl border border-black/5 bg-white p-8">
          {/* CATEGORY */}
          <div>
            <h3 className="mb-5 text-sm font-semibold uppercase tracking-[0.2em] text-[#061b0e]">
              Categories
            </h3>

            <div className="space-y-3">
              <button
                onClick={() => setSelectedCategory("")}
                className={`block text-sm transition ${
                  selectedCategory === ""
                    ? "font-semibold text-[#061b0e]"
                    : "text-gray-500"
                }`}
              >
                All Products
              </button>

              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`block text-sm transition ${
                    selectedCategory === category
                      ? "font-semibold text-[#061b0e]"
                      : "text-gray-500"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* PRICE */}
          <div>
            <h3 className="mb-5 text-sm font-semibold uppercase tracking-[0.2em] text-[#061b0e]">
              Price Range
            </h3>

            <div className="space-y-4">
              <input
                type="range"
                min="0"
                max="10000"
                step="500"
                value={priceRange.max}
                onChange={(e) =>
                  setPriceRange({
                    ...priceRange,
                    max: Number(e.target.value),
                  })
                }
                className="w-full"
              />

              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>PKR 0</span>
                <span>PKR {priceRange.max}</span>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default FilterSidebar;
