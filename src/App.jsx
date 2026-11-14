import { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import WhatsAppButton from "./components/WhatsAppButton";
import Home from "./Pages/Home";
import AdminRoute from "./components/AdminRoute";
import AnalyticsTracker from "./components/AnalyticsTracker";
import AgentTools from "./agent/AgentTools";
import {
  AIChat,
  Shop,
  Collection,
  ProductDetail,
  Cart,
  Checkout,
  ReturnsRefunds,
  PrivacyPolicy,
  Contact,
  ProfilePage,
  OrdersPage,
  OrderDetailsPage,
  Login,
  SignUp,
  ForgotPassword,
  ResetPassword,
  Dashboard,
  Products,
  Orders,
  Customers,
  Analytics,
  Reviews,
  Messages,
  AdminOrderDetailsPage,
  AdminProfilePage,
  AdminManagement,
  Guide,
} from "./pages";

// Everything inside the router; shared by the browser entry (BrowserRouter)
// and the build-time prerenderer (StaticRouter in entry-server.jsx).
export function AppShell(props) {
  const { Router, routerProps = {}, withWidgets = true } = props;
  return (
    <AuthProvider>
      <CartProvider>
        <Router {...routerProps}>
          <AnalyticsTracker />
          <ScrollToTop />
          <AgentTools />
          <Suspense fallback={<div className="min-h-screen bg-[#f8f6f1]" aria-busy="true" />}>
          <Routes>
            {/* ================= STORE FRONT ================= */}
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/collections" element={<Collection />} />
            <Route path="/charsadda-chappal-guide" element={<Guide />} />
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
          </Suspense>
          {withWidgets && (
            <>
              <WhatsAppButton />
              <Suspense fallback={null}>
                <AIChat />
              </Suspense>
            </>
          )}
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

function App() {
  return <AppShell Router={BrowserRouter} />;
}

export default App;
