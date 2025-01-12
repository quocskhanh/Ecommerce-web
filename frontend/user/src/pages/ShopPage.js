import Header from "../components/ShopPage/Header/Header"
import Footer from "../components/ShopPage/Footer/Footer"
import Subscribe from "../components/ShopPage/Subscribe/Subscribe"
import Gallery from "../components/ShopPage/Gallery/Gallery"
import Feature from "../components/ShopPage/Feature/Feature"
import Slider from "../components/ShopPage/Slider/Slider"
import DealsOfTheMonth from "../components/ShopPage/DealsOfTheMonth/DealsOfTheMonth"

function ShopPage() {
    return (
        <>
            <Header />
            <DealsOfTheMonth />
            <Slider />
            <Feature />
            <Gallery />
            <Subscribe />
            <hr></hr>
            <Footer />
        </>
    )
}

export default ShopPage
