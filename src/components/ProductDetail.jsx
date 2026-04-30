import { useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import products from "../Data/productsDetail";
import { useCart } from "../context/CartContext";

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [cartOpen, setCartOpen] = useState(false);

  const product = products.find((p) => p.id === Number(id));

  if (!product) {
    return <div className="pt-32 text-center">Product not found</div>;
  }

  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [openSection, setOpenSection] = useState("details");

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-black font-body">
      <Navbar />

      {/* MAIN */}
      <main className="flex-grow pt-24 pb-16 px-6 md:px-12 max-w-7xl mx-auto w-full">
        <div className="grid lg:grid-cols-12 gap-12">
          {/* LEFT: IMAGES */}
          <div className="lg:col-span-7 space-y-4">
            {selectedColor.images.map((img, i) => (
              <div
                key={i}
                className="w-full overflow-hidden relative group"
                onMouseMove={(e) => {
                  const { left, top, width, height } =
                    e.currentTarget.getBoundingClientRect();
                  const x = ((e.clientX - left) / width) * 100;
                  const y = ((e.clientY - top) / height) * 100;

                  e.currentTarget.style.setProperty("--x", `${x}%`);
                  e.currentTarget.style.setProperty("--y", `${y}%`);
                }}
              >
                <img
                  src={img}
                  alt="product"
                  className="w-full h-full object-cover transition-transform duration-300 ease-out group-hover:scale-150"
                  style={{
                    transformOrigin: "var(--x, 50%) var(--y, 50%)",
                  }}
                />
              </div>
            ))}
          </div>

          {/* RIGHT */}
          <div className="lg:col-span-5 space-y-8 sticky top-24 h-fit">
            {/* TITLE + PRICE */}
            <div className="space-y-2">
              <h1 className="text-2xl font-headline tracking-tight">
                {product.title}
              </h1>
              <p className="text-lg">{product.price}</p>
            </div>

            {/* COLOR */}
            <div className="space-y-3">
              <p className="text-xs uppercase tracking-widest text-gray-500">
                Color: {selectedColor.name}
              </p>

              <div className="flex gap-3">
                {product.colors.map((color, i) => (
                  <img
                    key={i}
                    src={color.images[0]}
                    onClick={() => setSelectedColor(color)}
                    className={`w-12 h-14 object-cover cursor-pointer border transition ${
                      selectedColor.name === color.name
                        ? "border-black"
                        : "border-gray-300"
                    }`}
                    alt={color.name}
                  />
                ))}
              </div>
            </div>

            {/* SIZE */}
            <div className="space-y-3">
              <p className="text-xs uppercase tracking-widest text-gray-500">
                Size
              </p>

              <div className="grid grid-cols-4 gap-2 ">
                {product.sizes.map((size) => {
                  const disabled = product.disabledSizes.includes(size);

                  return (
                    <button
                      key={size}
                      disabled={disabled}
                      onClick={() => setSelectedSize(size)}
                      className={`py-3 border text-xs transition 
  ${selectedSize === size ? "bg-black text-white" : "hover:border-black"} 
  ${disabled ? "opacity-30 cursor-not-allowed" : "cursor-pointer"}`}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* BUTTON */}
            <button
              onClick={() => {
                addToCart({
                  id: product.id,
                  title: product.title,
                  price: parseFloat(
                    product.price.toString().replace(/[^0-9.]/g, ""),
                  ),
                  quantity: 1,
                  image: selectedColor.images[0],
                  color: selectedColor.name,
                  size: selectedSize,
                });

                // ✅ OPEN DRAWER AFTER ADD
                window.dispatchEvent(new Event("openCart"));
              }}
              className="w-full py-4 bg-black text-white text-xs uppercase cursor-pointer 
  transition duration-200 ease-in-out
  hover:bg-gray-800 
  active:scale-95"
            >
              Add to Bag
            </button>
            {/* ACCORDION */}
            <div className="border-t pt-6 space-y-4">
              {/* DESCRIPTION */}
              <div>
                <button
                  onClick={() => toggleSection("details")}
                  className="flex justify-between w-full text-xs uppercase tracking-widest"
                >
                  Description
                  <span>{openSection === "details" ? "−" : "+"}</span>
                </button>

                {openSection === "details" && (
                  <div className="mt-3 text-sm space-y-2 text-gray-600">
                    <p>{product.description}</p>
                    <ul className="list-disc ml-4">
                      {product.details.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* MATERIAL */}
              <div>
                <button
                  onClick={() => toggleSection("materials")}
                  className="flex justify-between w-full text-xs uppercase tracking-widest"
                >
                  Materials
                  <span>{openSection === "materials" ? "−" : "+"}</span>
                </button>

                {openSection === "materials" && (
                  <p className="mt-3 text-sm text-gray-600">
                    Premium quality fabric crafted for comfort and durability.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <Footer />
    </div>
  );
};

export default ProductDetail;
