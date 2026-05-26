import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/product/${product._id}`);
  };

  return (
    <div onClick={handleClick} className="group cursor-pointer">
      {/* IMAGE */}
      <div className="relative mb-3 aspect-[3/4] overflow-hidden rounded-3xl bg-gray-100">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-black/0 transition-all duration-300 group-hover:bg-black/10" />
      </div>

      {/* INFO */}
      <div className="text-center">
        <h4 className="line-clamp-2 text-lg font-semibold text-[#061b0e]">
          {product.name}
        </h4>

        <p className="mt-1 text-lg font-bold text-[#061b0e]">
          PKR {Number(product.price).toLocaleString()}
        </p>
      </div>
    </div>
  );
};

export default ProductCard;
