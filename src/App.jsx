import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import WhatsAppButton from "./components/WhatsAppButton";

/* STORE FRONT */
import Home from "./Pages/Home";
import Shop from "./Pages/Shop";
import Collection from "./Pages/Collection";
import ProductDetail from "./components/ProductDetail";
import Cart from "./Pages/cart";
import Checkout from "./Pages/Checkout";
import ReturnsRefunds from "./Pages/ReturnsRefunds";
import PrivacyPolicy from "./Pages/PrivacyPolicy";
import Contact from "./Pages/Contact";
import ProfilePage from "./Pages/ProfilePage";
import OrdersPage from "./Pages/OrdersPage";
import OrderDetailsPage from "./Pages/admin/OrderDetailsPage";

/* AUTH */
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import ForgotPassword from "./Pages/ForgotPassword";
import ResetPassword from "./Pages/ResetPassword";

/* ADMIN PAGES */
import AdminRoute from "./components/AdminRoute";
import Dashboard from "./Pages/admin/Dashboard";
import Products from "./Pages/admin/Products";
import Orders from "./Pages/admin/Orders";
import Customers from "./Pages/admin/Customers";
import Analytics from "./Pages/admin/Analytics";
import Reviews from "./Pages/admin/Reviews";
import Messages from "./Pages/admin/Messages";
import AdminOrderDetailsPage from "./Pages/admin/AdminOrderDetailsPage";
import AdminProfilePage from "./Pages/admin/ProfilePage";
import AdminManagement from "./Pages/admin/AdminManagement";
import AnalyticsTracker from "./components/AnalyticsTracker";

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <AnalyticsTracker />
          <ScrollToTop />
          <Routes>
            {/* ================= STORE FRONT ================= */}
            <Route path="/" element={<Home />} />
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
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />
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
            <Route
              path="/admin/profile"
              element={
                <AdminRoute>
                  <AdminProfilePage />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/admins"
              element={
                <AdminRoute>
                  <AdminManagement />
                </AdminRoute>
              }
            />
          </Routes>
          <WhatsAppButton />
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
