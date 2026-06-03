import { BrowserRouter, Routes, Route } from "react-router-dom";

import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";

/* STORE FRONT */
import PakletHome from "./Pages/Home";
import Shop from "./Pages/Shop";
import Collection from "./Pages/Collection";
import ProductDetail from "./components/ProductDetail";
import Cart from "./Pages/cart";
import Checkout from "./Pages/Checkout";
import ReturnsRefunds from "./pages/ReturnsRefunds";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Contact from "./Pages/Contact";
import ProfilePage from "./pages/ProfilePage";
import OrdersPage from "./pages/OrdersPage";
import OrderDetailsPage from "./Pages/admin/OrderDetailsPage";

/* AUTH */
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";

/* ADMIN PAGES */
import AdminRoute from "./components/AdminRoute";
import Dashboard from "./pages/admin/Dashboard";
import Products from "./pages/admin/Products";
import Orders from "./pages/admin/Orders";
import Customers from "./pages/admin/Customers";
import Analytics from "./pages/admin/Analytics";
import Reviews from "./pages/admin/Reviews";
import Messages from "./pages/admin/Messages";
import AdminOrderDetailsPage from "./Pages/admin/AdminOrderDetailsPage";

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <Routes>
            {/* ================= STORE FRONT ================= */}
            <Route path="/" element={<PakletHome />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/collections" element={<Collection />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/returns-refunds" element={<ReturnsRefunds />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/orders" element={<OrdersPage />} />
            <Route path="/orders/:id" element={<OrderDetailsPage />} />
            {/* ================= AUTH ================= */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />

            {/* ================= ADMIN ================= */}
            <Route
              path="/admin"
              element={
                <AdminRoute>
                  <Dashboard />
                </AdminRoute>
              }
            />

            <Route
              path="/admin/products"
              element={
                <AdminRoute>
                  <Products />
                </AdminRoute>
              }
            />

            <Route
              path="/admin/orders"
              element={
                <AdminRoute>
                  <Orders />
                </AdminRoute>
              }
            />

            <Route
              path="/admin/customers"
              element={
                <AdminRoute>
                  <Customers />
                </AdminRoute>
              }
            />

            <Route
              path="/admin/analytics"
              element={
                <AdminRoute>
                  <Analytics />
                </AdminRoute>
              }
            />

            <Route
              path="/admin/reviews"
              element={
                <AdminRoute>
                  <Reviews />
                </AdminRoute>
              }
            />

            <Route
              path="/admin/messages"
              element={
                <AdminRoute>
                  <Messages />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/orders/:id"
              element={<AdminOrderDetailsPage />}
            />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
