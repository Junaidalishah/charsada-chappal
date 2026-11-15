function ShopHeader() {
  return (
    <header className="px-6 md:px-12 py-12 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-5xl md:text-7xl font-headline italic text-primary leading-tight">
            Charsadda Chappals
          </h1>
          <p className="text-on-surface-variant max-w-xl mt-4 font-light leading-relaxed">
            Handmade in Charsadda, Khyber Pakhtunkhwa from genuine leather —
            Kaptaan, Zardari and Gol T chappals in sizes PAK 6–13, with free
            delivery across Pakistan.
          </p>
        </div>
      </div>
    </header>
  );
}

export default ShopHeader;
