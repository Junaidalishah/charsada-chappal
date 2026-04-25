import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import products from "../Data/products";
import ProductCard from "../components/ProductCard";
import ShopHeader from "../components/ShopHeader";
import FilterSidebar from "../components/FilterSidebar";

function Shop() {
  return (
    <div className="font-body bg-background text-on-surface selection:bg-secondary-container">
      <Navbar />

      <main className="pt-24 min-h-screen">
        <ShopHeader />

        <section className="max-w-7xl mx-auto px-6 md:px-12 pb-32 flex gap-12">
          <FilterSidebar />

          {/* Product Grid */}
          <div className="flex-grow">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-16">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* Load More */}
            <div className="mt-32 text-center">
              <button className="group relative px-12 py-4 bg-surface-container hover:bg-surface-container-highest transition-colors duration-500">
                <span className="text-xs uppercase tracking-[0.3em] font-semibold text-primary">
                  Load More Artisanal Pieces
                </span>
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-8 h-[1px] bg-secondary group-hover:w-full transition-all duration-500" />
              </button>
              <p className="text-[10px] uppercase tracking-widest text-on-surface/40 mt-8">
                Showing 6 of 48 Designs
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default Shop;
