import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import PakletHome from "./Pages/Home";
import Shop from "./Pages/Shop";
import Collection from "./Pages/Collection";
import ProductDetail from "./components/ProductDetail";
import Cart from "./Pages/cart";
import Checkout from "./Pages/Checkout";

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PakletHome />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/collections" element={<Collection />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
