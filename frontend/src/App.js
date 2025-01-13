import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import AccountPage from "./pages/auth/AccountPage";
import CategoriesPage from "./pages/category/CategoriesPage";
import ReportPage from "./pages/report/ReportPage";
import SettingPage from "./pages/SettingPage";
import LogoutPage from "./pages/LogoutPage";
import AddProductPage from "./pages/product/AddProductPage";

import AddCategoryPage from "./pages/category/AddCategoryPage";
import AccountsPage from "./pages/account/AccountsPage";
import AddAccountPage from "./pages/account/AddAccountPage";
import AddOrderPage from "./pages/order/AddOrderPage";
import EditCategoryPage from "./pages/category/EditCategoryPage";

// Lazy load components
const ProductPage = lazy(() => import("./pages/product/ProductPage"));
const DashboardPage = lazy(() => import("./pages/DashboardPage"));
const OrderPage = lazy(() =>import( "./pages/order/OrderPage"))

function App() {
  return (
        <Suspense>
          <Routes>
            {/* Các route dành cho quản trị viên */}
            <Route path="/admin/*" element={<DashboardPage />} />
            <Route path="/auth/*" element={<AccountPage />} />
            <Route path="/admin/product/*" element={<ProductPage />} />
            <Route path="/admin/order/*" element={<OrderPage />} />
            <Route path="/admin/categories/*" element={<CategoriesPage />} />
            <Route path="/admin/categories/:id" element={<EditCategoryPage />} />
            <Route path="/admin/accounts/*" element={<AccountsPage />} />
            <Route path="/admin/accounts/add-account" element={<AddAccountPage />} />
            <Route path="/admin/setting" element={<SettingPage />} />
            <Route path="/admin/logout" element={<LogoutPage />} />
            <Route path="/admin/reports" element={<ReportPage />} />
            <Route path="/admin/product/add-product" element={<AddProductPage />} />







            <Route path="/admin/categories/add-category" element={<AddCategoryPage/>} />
            <Route path="/admin/order/add-order" element={<AddOrderPage/>} />



            {/* Các route cho người dùng */}
            {/*<Route path="/user/*" element={<UserDashboardPage />} />*/}
            {/*<Route path="/user/profile" element={<UserProfilePage />} />*/}


          </Routes>
        </Suspense>
  );
}

export default App;
