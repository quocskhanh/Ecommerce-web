import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
<<<<<<< HEAD
=======
import AccountPage from "./pages/auth/AccountPage";
=======
import { lazy, Suspense, useEffect, useState } from "react";
>>>>>>> 361b2a012c3c43d33ec9ebc2fdb563222f5a4a43
import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
>>>>>>> 78183594a64d056bd4b191437ed12568d40c8f78
import CategoriesPage from "./pages/category/CategoriesPage";
import LogoutPage from "./pages/LogoutPage";
import AddProductPage from "./pages/product/AddProductPage";

import AddCategoryPage from "./pages/category/AddCategoryPage";
import AccountsPage from "./pages/account/AccountsPage";
<<<<<<< HEAD
=======
import AccountPage from "./pages/auth/AccountPage";
import ShippingPage from "./pages/shipping/ShippingPage";
<<<<<<< HEAD
import UpdateShippingPage from "./pages/shipping/UpdateShippingPage";
=======
import AddOrderPage from "./pages/order/AddOrderPage";
import EditCategoryPage from "./pages/category/EditCategoryPage";
>>>>>>> 78183594a64d056bd4b191437ed12568d40c8f78
import AccountPage from "./pages/auth/AccountPage";
import ShippingPage from "./pages/shipping/ShippingPage";

// Lazy load components
const ProductPage = lazy(() => import("./pages/product/ProductPage"));
const DashboardPage = lazy(() => import("./pages/DashboardPage"));
const OrderPage = lazy(() =>import( "./pages/order/OrderPage"))

function App() {
  return (
        <Suspense>
          <Routes>
<<<<<<< HEAD
            {/* Các route dành cho quản trị viên */}
            <Route path="/admin/*" element={<DashboardPage />} />
=======
            {/* Các route chính */}
           <Route path="/admin/*" element={<DashboardPage />} />
>>>>>>> 78183594a64d056bd4b191437ed12568d40c8f78
            <Route path="/admin/shipping" element={<ShippingPage />} />
            <Route path="/auth/*" element={<AccountPage />} />
            <Route path="/admin/product/*" element={<ProductPage />} />
            <Route path="/admin/order/*" element={<OrderPage />} />
            <Route path="/admin/categories/*" element={<CategoriesPage />} />
            <Route path="/admin/accounts/*" element={<AccountsPage />} />
            <Route path="/admin/logout" element={<LogoutPage />} />
            <Route path="/admin/product/add-product" element={<AddProductPage />} />
            <Route path="/admin/categories/add-category" element={<AddCategoryPage/>} />



          </Routes>
        </Suspense>
  );
}

export default App;
