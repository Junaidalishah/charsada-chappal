import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/product/${product.id}`);
  };

  return (
    <div onClick={handleClick} className="group cursor-pointer">
      {/* Image */}
      <div className="relative aspect-[3/4] overflow-hidden bg-surface-container-low mb-6">
        <img
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          src={product.img}
          alt={product.title}
        />

        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300" />
      </div>

      {/* Info */}
      <div className="flex justify-between items-start">
        <div>
          <h4 className="text-sm font-medium tracking-tight text-primary">
            {product.title}
          </h4>
          <p className="text-[10px] uppercase tracking-[0.15em] text-on-surface-variant mt-1">
            {product.subtitle}
          </p>
        </div>

        <span className="text-sm font-headline italic">{product.price}</span>
      </div>
    </div>
  );
};

export default ProductCard;
