function FilterSidebar() {
  return (
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
                Home & Living
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
            {["$100 - $500", "$500 - $1500", "$1500+"].map((range) => (
              <label
                key={range}
                className="flex items-center gap-3 text-xs uppercase tracking-widest text-on-surface/60 cursor-pointer"
              >
                <input
                  type="checkbox"
                  className="rounded-none border-outline-variant text-primary focus:ring-0"
                />
                {range}
              </label>
            ))}
          </div>
        </div>

        {/* Craft Type */}
        <div className="pt-8 border-t border-outline-variant/20">
          <h3 className="font-sans uppercase tracking-[0.1em] text-xs font-bold text-primary mb-6">
            Craft Type
          </h3>
          <div className="flex flex-wrap gap-2">
            {["Zardozi", "Hand-Loomed", "Block Print", "Indigo Dye"].map(
              (type) => (
                <button
                  key={type}
                  className="px-3 py-1 bg-surface-container text-[10px] uppercase tracking-tighter border border-outline-variant/30 hover:bg-surface-container-highest transition-colors"
                >
                  {type}
                </button>
              ),
            )}
          </div>
        </div>
      </div>
    </aside>
  );
}

export default FilterSidebar;
