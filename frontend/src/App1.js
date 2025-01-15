import React from 'react'; 
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ShopPage from "./pages/ShopPage";
import HomePage from "./pages/HomePage";
import CheckOutPage from './pages/CheckOutPage';
import ProductPage from './pages/ProductPage';
import { CartProvider } from "./components/ShopPage/ListProducts/CartContext";
import SignInPage from './pages/auth/SignInPage';
import SignUpPage from './pages/auth/SignUpPage';

function App1() {


  return (
    <CartProvider>
      <Router> 
        <Routes> 
          <Route path="/" element={<HomePage />} /> 
          <Route path="/shop" element={<ShopPage />} /> 
          <Route path="/product/:id" element={<ProductPage />} /> 
          <Route path="/checkout" element={<CheckOutPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/login" element={<SignInPage />} />
        </Routes> 
      </Router> 
    </CartProvider>
  )
}

export default App1;