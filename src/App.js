import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import { CartProvider } from "./modules/Cart/CartContext";
import AccountPage from "./components/auth/AccountPage";
import CategoriesPage from "./pages/CategoriesPage";
import CustomerPage from "./pages/CustomerPage";
import ReportPage from "./pages/ReportPage";
import KnowledgeBasePage from "./pages/KnowledgeBasePage";
import InboxPage from "./pages/InboxPage";
import ProductUpdate from "./pages/ProductUpdate";
import PersonalSettingPage from "./pages/PersonalSettingPage";
import GlobalSettingPage from "./pages/GlobalSettingPage";
import LogoutPage from "./pages/LogoutPage";
import CouponsPage from "./pages/CouponsPage";

// Lazy load components
const ProductPage = lazy(() => import("./pages/ProductPage"));
const DashboardPage = lazy(() => import("./pages/DashboardPage"));
const OrderPage = lazy(() =>import( "./pages/OrderPage"))

function App() {
  return (
      <CartProvider>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            {/* Các route chính */}
            <Route path="/" element={<DashboardPage />} />
            <Route path="/auth/*" element={<AccountPage />} />
            <Route path="/product" element={<ProductPage />} />
            <Route path="/order/*" element={<OrderPage />} />
            <Route path="/categories" element={<CategoriesPage />} />
            <Route path="/customer" element={<CustomerPage />} />
            <Route path="/inbox" element={<InboxPage />} />
            <Route path="/knowledge" element={<KnowledgeBasePage />} />
            <Route path="/productupdate" element={<ProductUpdate/>} />
            <Route path="/personal" element={<PersonalSettingPage />} />
            <Route path="/global" element={<GlobalSettingPage />} />
            <Route path="/logout" element={<LogoutPage />} />
            <Route path="/coupons" element={<CouponsPage />} />
            <Route path="/reports" element={<ReportPage />} />
          </Routes>
        </Suspense>
      </CartProvider>
  );
}

export default App;
