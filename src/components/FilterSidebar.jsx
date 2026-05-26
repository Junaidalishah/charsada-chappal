const FilterSidebar = ({
  categories,
  selectedCategory,
  setSelectedCategory,
  priceRange,
  setPriceRange,
}) => {
  return (
    <aside className="hidden w-72 xl:block">
      <div className="sticky top-32 space-y-10 rounded-3xl border border-black/5 bg-white p-8">
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
              max="50000"
              value={priceRange.max}
              onChange={(e) =>
                setPriceRange({
                  ...priceRange,
                  max: e.target.value,
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
  );
};

export default FilterSidebar;
