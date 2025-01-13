import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import AccountPage from "./pages/auth/AccountPage";
import CategoriesPage from "./pages/category/CategoriesPage";
import CustomerPage from "./pages/customer/CustomerPage";
import ReportPage from "./pages/report/ReportPage";
import ShippingPage from "./pages/shipping/ShippingPage";
import SettingPage from "./pages/SettingPage";
import LogoutPage from "./pages/LogoutPage";
import AddProductPage from "./pages/product/AddProductPage";
import WomenClothes from "./pages/categoryList/WomenClothes";
import MenClothes from "./pages/categoryList/MenClothes";
import CottonClothes from "./pages/categoryList/CottonClothes";
import Hats from "./pages/categoryList/Hats";
import SummerClothes from "./pages/categoryList/SummerClothes";
import WeddingClothes from "./pages/categoryList/WeddingClothes";
import SpringCollection from "./pages/categoryList/SpringCollection";
import CasualClothes from "./pages/categoryList/CasualClothes";
import Accessories from "./pages/categoryList/Accessories";
import AddCustomerPage from "./pages/customer/AddCustomerPage";
import AddCategoryPage from "./pages/category/AddCategoryPage";
import AccountsPage from "./pages/account/AccountsPage";
import AddAccountPage from "./pages/account/AddAccountPage";
import UpdateShippingPage from "./pages/shipping/UpdateShippingPage";

// Lazy load components
const ProductPage = lazy(() => import("./pages/product/ProductPage"));
const DashboardPage = lazy(() => import("./pages/DashboardPage"));
const OrderPage = lazy(() =>import( "./pages/order/OrderPage"))

function App() {
  return (
        <Suspense>
          <Routes>
            {/* Các route chính */}
            <Route path="/admin/*" element={<DashboardPage />} />
            <Route path="/auth/*" element={<AccountPage />} />
            <Route path="/admin/product/*" element={<ProductPage />} />
            <Route path="/admin/order/*" element={<OrderPage />} />
            <Route path="/admin/categories/*" element={<CategoriesPage />} />
            <Route path="/admin/customer/*" element={<CustomerPage />} />

            <Route path="/admin/shipping/*" element={<ShippingPage />} />
            <Route path="/shipping/update" element={<UpdateShippingPage />} />

            <Route path="/accounts/*" element={<AccountsPage />} />
            <Route path="/accounts/add-account" element={<AddAccountPage />} />





            <Route path="/admin/setting" element={<SettingPage />} />
            <Route path="/admin/logout" element={<LogoutPage />} />
            <Route path="/admin/reports" element={<ReportPage />} />
            <Route path="/admin/product/add-product" element={<AddProductPage />} />
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
            <Route path="/categories/add-category" element={<AddCategoryPage/>} />
            <Route path="/order/add-order" element={<AddCategoryPage/>} />
          </Routes>
        </Suspense>
  );
}

export default App;
