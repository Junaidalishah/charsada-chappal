import { lazy } from "react";

// Route-level code splitting. A page whose chunk is already loaded renders
// synchronously (no Suspense fallback), so main.jsx preloads the current
// route's chunk before the first render and the prerendered HTML hydrates
// without falling back to a blank Suspense boundary.
function lazyPage(factory) {
  let Loaded = null;
  const load = () =>
    factory().then((m) => {
      Loaded = m.default;
      return m;
    });
  const Lazy = lazy(load);
  const Page = (props) => (Loaded ? <Loaded {...props} /> : <Lazy {...props} />);
  Page.preload = load;
  return Page;
}

export const AIChat = lazyPage(() => import("./components/AIChat"));
export const Shop = lazyPage(() => import("./Pages/Shop"));
export const Collection = lazyPage(() => import("./Pages/Collection"));
export const ProductDetail = lazyPage(() => import("./components/ProductDetail"));
export const Cart = lazyPage(() => import("./Pages/cart"));
export const Checkout = lazyPage(() => import("./Pages/Checkout"));
export const ReturnsRefunds = lazyPage(() => import("./Pages/ReturnsRefunds"));
export const PrivacyPolicy = lazyPage(() => import("./Pages/PrivacyPolicy"));
export const Contact = lazyPage(() => import("./Pages/Contact"));
export const ProfilePage = lazyPage(() => import("./Pages/ProfilePage"));
export const OrdersPage = lazyPage(() => import("./Pages/OrdersPage"));
export const OrderDetailsPage = lazyPage(() => import("./Pages/admin/OrderDetailsPage"));
export const Login = lazyPage(() => import("./Pages/Login"));
export const SignUp = lazyPage(() => import("./Pages/SignUp"));
export const ForgotPassword = lazyPage(() => import("./Pages/ForgotPassword"));
export const ResetPassword = lazyPage(() => import("./Pages/ResetPassword"));
export const Dashboard = lazyPage(() => import("./Pages/admin/Dashboard"));
export const Products = lazyPage(() => import("./Pages/admin/Products"));
export const Orders = lazyPage(() => import("./Pages/admin/Orders"));
export const Customers = lazyPage(() => import("./Pages/admin/Customers"));
export const Analytics = lazyPage(() => import("./Pages/admin/Analytics"));
export const Reviews = lazyPage(() => import("./Pages/admin/Reviews"));
export const Messages = lazyPage(() => import("./Pages/admin/Messages"));
export const AdminOrderDetailsPage = lazyPage(() => import("./Pages/admin/AdminOrderDetailsPage"));
export const AdminProfilePage = lazyPage(() => import("./Pages/admin/ProfilePage"));
export const AdminManagement = lazyPage(() => import("./Pages/admin/AdminManagement"));
export const Guide = lazyPage(() => import("./Pages/Guide"));

