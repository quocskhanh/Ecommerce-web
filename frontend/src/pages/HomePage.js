import Header from "../components/HomePage/Header/Header"
import Banner from "../components/HomePage/Banner/Banner"
import Logo from "../components/HomePage/Logo/Logo"
import DealsOfTheMonth from "../components/ShopPage/DealsOfTheMonth/DealsOfTheMonth"
import Slider from "../components/ShopPage/Slider/Slider"
import Feature from "../components/ShopPage/Feature/Feature"
import Gallery from "../components/ShopPage/Gallery/Gallery"
import Subscribe from "../components/ShopPage/Subscribe/Subscribe"
import Footer from "../components/ShopPage/Footer/Footer"
import NewArrival from "../components/HomePage/NewArrival"

function HomePage() {
    return (
        <>
            <Header />
            <Banner />
            <Logo />
            <DealsOfTheMonth />
            <NewArrival />
            <Slider />
            <Feature />
            <Gallery />
            <Subscribe />
            <hr></hr>
            <Footer />
        </>
    )
}

export default HomePage