import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import { CartProvider } from "./modules/Cart/CartContext";
import AccountPage from "./components/auth/AccountPage";
import CategoriesPage from "./pages/CategoriesPage";
import CustomerPage from "./components/customer/CustomerPage";
import ReportPage from "./components/report/ReportPage";
import KnowledgeBasePage from "./pages/KnowledgeBasePage";
import InboxPage from "./pages/InboxPage";
import ProductUpdate from "./pages/ProductUpdate";
import PersonalSettingPage from "./pages/PersonalSettingPage";
import GlobalSettingPage from "./pages/GlobalSettingPage";
import LogoutPage from "./pages/LogoutPage";
import CouponsPage from "./components/coupon/CouponsPage";
import AddProductPage from "./components/product/AddProductPage";
import WomenClother from "./components/categoriList/WomenClothes";
import WomenClothes from "./components/categoriList/WomenClothes";
import MenClothes from "./components/categoriList/MenClothes";
import CottonClothes from "./components/categoriList/CottonClothes";
import Hats from "./components/categoriList/Hats";
import SummerClothes from "./components/categoriList/SummerClothes";
import WeddingClothes from "./components/categoriList/WeddingClothes";
import SpringCollection from "./components/categoriList/SpringCollection";
import CasualClothes from "./components/categoriList/CasualClothes";
import Accessories from "./components/categoriList/Accessories";
import AddCustomerPage from "./components/customer/AddCustomerPage";
import AddCouponPage from "./components/coupon/AddCouponPage";

// Lazy load components
const ProductPage = lazy(() => import("./components/product/ProductPage"));
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
            <Route path="/product/*" element={<ProductPage />} />
            <Route path="/order/*" element={<OrderPage />} />
            <Route path="/categories/*" element={<CategoriesPage />} />
            <Route path="/customer/*" element={<CustomerPage />} />
            <Route path="/inbox" element={<InboxPage />} />
            <Route path="/knowledge" element={<KnowledgeBasePage />} />
            <Route path="/productupdate" element={<ProductUpdate/>} />
            <Route path="/personal" element={<PersonalSettingPage />} />
            <Route path="/global" element={<GlobalSettingPage />} />
            <Route path="/logout" element={<LogoutPage />} />
            <Route path="/coupons/*" element={<CouponsPage />} />
            <Route path="/coupons/add-coupon" element={<AddCouponPage />} />
            <Route path="/reports" element={<ReportPage />} />
            <Route path="/product/add-product" element={<AddProductPage />} />
            <Route path="/categories/womenclothes" element={<WomenClothes />} />
            <Route path="/categories/menclothes" element={<MenClothes />} />
            <Route path="/categories/cottonclothes" element={<CottonClothes />} />
            <Route path="/categories/hats" element={<Hats />} />
            <Route path="/categories/summerclothes" element={<SummerClothes />} />
            <Route path="/categories/weddingclothes" element={<WeddingClothes />} />
            <Route path="/categories/springcollect" element={<SpringCollection />} />
            <Route path="/categories/casualclothes" element={<CasualClothes/>} />
            <Route path="/categories/accessories" element={<Accessories/>} />
            <Route path="/customer/information" element={<AddCustomerPage/>} />
          </Routes>
        </Suspense>
      </CartProvider>
  );
}

export default App;
