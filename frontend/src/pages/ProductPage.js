import Header from "../components/ShopPage/Header/Header"
import Slider from "../components/ShopPage/Slider/Slider"
import Feature from "../components/ShopPage/Feature/Feature"
import DealsOfTheMonth from "../components/ShopPage/DealsOfTheMonth/DealsOfTheMonth"
import Subscribe from "../components/ShopPage/Subscribe/Subscribe"
import Footer from "../components/ShopPage/Footer/Footer"

function ProductPage() {
    return (
        <>
            <Header />
            <Slider />
            <Feature />
            <DealsOfTheMonth />
            <Subscribe />
            <hr></hr>
            <Footer />
        </>
    )
}

export default ProductPage


