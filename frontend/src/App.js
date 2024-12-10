import {Routes,Route} from "react-router-dom"
import {lazy} from "react";

// import HomePage from "./pages/HomePage";
// import MoviesPage from "./pages/MoviesPage";

const SignUpPage = lazy(() => import("./pages/SignUpPage"))
const SignInPage  = lazy(() => import("./pages/SignInPage"))


function App() {
    return <Routes>
        <Route path="/sign-up" element={<SignUpPage></SignUpPage>}></Route>
        <Route path="/sign-in" element={<SignInPage></SignInPage>}></Route>
        </Routes>


}


export default App;
