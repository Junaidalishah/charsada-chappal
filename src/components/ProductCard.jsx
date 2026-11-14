import { Link } from "react-router-dom";
import { cld, cldSrcSet } from "../utils/image";
import { productName } from "../seo/schema.js";

const ProductCard = ({ product, priority = false }) => {
  const name = productName(product);

  return (
    <Link
      to={`/product/${product._id}`}
      className="group block cursor-pointer"
      aria-label={`${name}, PKR ${Number(product.price).toLocaleString("en-US")}`}
    >
      {/* IMAGE */}
      <div className="relative mb-3 aspect-square overflow-hidden rounded-3xl bg-gray-100">
        <img
          src={cld(product.image, 640)}
          srcSet={cldSrcSet(product.image)}
          sizes="(min-width: 1280px) 340px, (min-width: 768px) 45vw, calc(100vw - 48px)"
          alt={`${name} — handmade leather Charsadda chappal`}
          width="640"
          height="640"
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : "auto"}
          decoding={priority ? "sync" : "async"}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-black/0 transition-all duration-300 group-hover:bg-black/10" />
      </div>

      {/* INFO */}
      <div className="text-center">
        <h3 className="line-clamp-2 text-lg font-semibold text-[#061b0e]">
          {name}
        </h3>

        <p className="mt-1 text-lg font-bold text-[#061b0e]">
          PKR {Number(product.price).toLocaleString("en-US")}
        </p>
      </div>
    </Link>
  );
};

export default ProductCard;
