import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import { CartProvider } from "./modules/Cart/CartContext";

// Lazy load các page
const SignUpPage = lazy(() => import("./pages/SignUpPage"));
const SignInPage = lazy(() => import("./pages/SignInPage"));
const DashboardPage = lazy(() => import("./pages/DashboardPage"));
const ProductPage = lazy(() => import("./pages/ProductPage"));
const ResetPasswordPage  = lazy(() => import ("./pages/ResetPasswordPage "))
const SettingPage = lazy(() => import("./pages/SettingPage"))
const HistoryPage = lazy(() => import("./pages/HistoryPage"))
const PaymentPage = lazy(() => import("./pages/PaymentPage"))
const LanguagePage = lazy(() => import("./pages/LanguagePage"))
const LogoutPage = lazy(() => import("./pages/LogoutPage"))
const OrderPage = lazy(() => import("./pages/OrderPage"))
const ShippingPage = lazy(() => import("./pages/ShippingPage"))
const ConfirmCodePage = lazy(() => import("./pages/ConfirmCodePage"))
const CreatePasswordPage = lazy(() => import("./pages/CreatePasswordPage"))
function App() {
  return (
       // Bọc toàn bộ ứng dụng bằng CartProvider
      <CartProvider>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            {/*<Route path="/campaign" element={<CampaignPage />} />*/}
            <Route path="/product" element={<ProductPage />} />
            <Route path="/sign-up" element={<SignUpPage />} />
            <Route path="/sign-in" element={<SignInPage />} />
              <Route path="/reset" element={<ResetPasswordPage  />}></Route>
              <Route path="/setting" element={<SettingPage/>}></Route>
              <Route path="/history" element={<HistoryPage/>}></Route>
              <Route path="/payment" element={<PaymentPage/>}></Route>
              <Route path="/language" element={<LanguagePage/>}></Route>
              <Route path="/logout" element={<LogoutPage />}></Route>
              <Route path="/order" element={<OrderPage />}></Route>
              <Route path="/shipping" element={<ShippingPage/>}></Route>
              <Route path="/confirm" element={<ConfirmCodePage/>}></Route>
              <Route path="/create" element={<CreatePasswordPage/>}></Route>

          </Routes>
        </Suspense>
      </CartProvider>
  );
}

export default App;
