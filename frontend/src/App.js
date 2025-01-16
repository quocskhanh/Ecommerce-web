import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import CategoriesPage from "./pages/category/CategoriesPage";
import LogoutPage from "./pages/LogoutPage";
import AddProductPage from "./pages/product/AddProductPage";

import AddCategoryPage from "./pages/category/AddCategoryPage";
import AccountsPage from "./pages/account/AccountsPage";
import AccountPage from "./pages/auth/AccountPage";
import ShippingPage from "./pages/shipping/ShippingPage";


// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ShopPage from "./pages/ShopPage";
import HomePage from "./pages/HomePage";
import CheckOutPage from './pages/CheckOutPage';
import ProductPageUser from './pages/ProductPage';
import { CartProvider } from "./components/ShopPage/ListProducts/CartContext";
import SignInPage2 from './pages/auth/SignInPage';
import SignUpPage from './pages/auth/SignUpPage';

import Login from "./pages/auth/Login";

// Lazy load components
const ProductPage = lazy(() => import("./pages/product/ProductPage"));
const DashboardPage = lazy(() => import("./pages/DashboardPage"));
const OrderPage = lazy(() =>import( "./pages/order/OrderPage"))

function App() {
  return (
    <CartProvider>
        <Suspense>
          <Routes>
            <Route path="/shop" element={<ShopPage />} /> 
            {/* Các route dành cho quản trị viên */}
            <Route path="/admin/*" element={<DashboardPage />} />
            <Route path="/admin/shipping" element={<ShippingPage />} />
            <Route path="/auth/*" element={<AccountPage />} />
            <Route path="/admin/product/*" element={<ProductPage />} />
            <Route path="/admin/order/*" element={<OrderPage />} />
            <Route path="/admin/categories/*" element={<CategoriesPage />} />
            <Route path="/admin/accounts/*" element={<AccountsPage />} />
            <Route path="/admin/logout" element={<LogoutPage />} />
            <Route path="/admin/product/add-product" element={<AddProductPage />} />
            <Route path="/admin/categories/add-category" element={<AddCategoryPage/>} />



<<<<<<< HEAD
=======
            {/* Các route cho người dùng */}
            {/*<Route path="/user/*" element={<UserDashboardPage />} />*/}
            {/*<Route path="/user/profile" element={<UserProfilePage />} />*/}


            <Route path="/" element={<HomePage />} /> 
            {/* <Route path="/shop" element={<ShopPage />} />  */}
            <Route path="/product/:id" element={<ProductPageUser />} /> 
            <Route path="/checkout" element={<CheckOutPage />} />
            <Route path="/login" element={<Login />} />

>>>>>>> 3e1c1f7d426765390820f9c659160cc6748459df
          </Routes>
        </Suspense>
      </CartProvider>
  );
}

export default App;
