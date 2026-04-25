function ShopHeader() {
  return (
    <header className="px-6 md:px-12 py-12 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-5xl md:text-7xl font-headline italic text-primary leading-tight">
            The Silk Route
          </h1>
          <p className="text-on-surface-variant max-w-lg mt-4 font-light leading-relaxed">
            Hand-loomed heritage meets modern silhouettes. A curation of pieces
            defined by centuries-old craft and contemporary utility.
          </p>
        </div>

        {/* Sort Dropdown */}
        <div className="relative inline-block text-left group">
          <button className="flex items-center gap-4 py-2 border-b border-outline-variant/30 text-xs uppercase tracking-widest font-medium">
            Sort By: Recommended
            <span className="material-symbols-outlined text-sm">
              expand_more
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}

export default ShopHeader;
