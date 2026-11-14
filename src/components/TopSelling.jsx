import ProductCard from "./ProductCard";
import useProducts, { ratingInfo } from "../hooks/useProducts";

const TopSelling = () => {
  const all = useProducts();
  const featured = all.filter((p) => p.featured);
  const products = featured.length ? featured : all;

  return (
    <section aria-labelledby="top-selling-heading" className="bg-[#f8f6f1] py-16 md:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-14">
          <p className="mb-3 text-xs uppercase tracking-[0.3em] text-[#5f5a52]">
            Charsadda Heritage
          </p>

          <h2 id="top-selling-heading" className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#061b0e]">
            <span aria-hidden="true">🔥 </span>Top Selling Charsadda Chappals
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-x-8 gap-y-14 md:grid-cols-2 xl:grid-cols-3">
          {products.map((product) => {
            const rating = ratingInfo(product.reviews);

            return (
              <div key={product._id} className="relative">
                <div className="absolute top-2 left-2 z-10 bg-white px-2 py-1 rounded-full text-xs shadow">
                  <span aria-hidden="true">⭐</span> {rating.avg} ({rating.count}
                  <span className="sr-only"> reviews</span>)
                </div>

                <ProductCard product={product} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TopSelling;
