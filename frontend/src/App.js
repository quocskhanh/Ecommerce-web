import { Routes, Route } from "react-router-dom";
<<<<<<< HEAD
import { lazy, Suspense } from "react";
import AccountPage from "./pages/auth/AccountPage";
=======
import { lazy, Suspense, useEffect, useState } from "react";
>>>>>>> 361b2a012c3c43d33ec9ebc2fdb563222f5a4a43
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
<<<<<<< HEAD
import UpdateShippingPage from "./pages/shipping/UpdateShippingPage";
=======
import AddOrderPage from "./pages/order/AddOrderPage";
import EditCategoryPage from "./pages/category/EditCategoryPage";
import AccountPage from "./pages/auth/AccountPage";


// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ShopPage from "./pages/ShopPage";
import HomePage from "./pages/HomePage";
import CheckOutPage from './pages/CheckOutPage';
import ProductPageUser from './pages/ProductPage';
import { CartProvider } from "./components/ShopPage/ListProducts/CartContext";


import Login from "./pages/auth/Login";
import AccountPageUser from "./pages/AccountPageUser";
import LogOutUser from "./pages/LogOutUser";

>>>>>>> 361b2a012c3c43d33ec9ebc2fdb563222f5a4a43

// Lazy load components
const ProductPage = lazy(() => import("./pages/product/ProductPage"));
const DashboardPage = lazy(() => import("./pages/DashboardPage"));
const OrderPage = lazy(() =>import( "./pages/order/OrderPage"))

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    setIsLoggedIn(false);
  };

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
<<<<<<< HEAD
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
=======
            <Route path="/admin/categories/add-category" element={<AddCategoryPage/>} />
            <Route path="/admin/order/add-order" element={<AddOrderPage/>} />






            <Route path="/" element={<HomePage />} /> 
            {/* <Route path="/shop" element={<ShopPage />} />  */}
            <Route path="/product/:id" element={<ProductPageUser />} /> 
            <Route path="/checkout" element={<CheckOutPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/account" element={<AccountPageUser />} />
            <Route path="/log-out" element={<LogOutUser />} />
>>>>>>> 361b2a012c3c43d33ec9ebc2fdb563222f5a4a43
          </Routes>
        </Suspense>
  );
}

export default App;
