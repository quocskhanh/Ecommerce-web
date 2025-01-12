import "./Header.css"


const Header = () => {
    return (
        <div className="header">
            <div className="container">
                <div className="wrap">
                    <div className="logo">
                        Fasco
                    </div>
                    <div className="inner-list">
                        <ul>
                            <li><a href="#">Home</a></li>
                            <li><a href="#">Shop</a></li>
                            <li><a href="#">New Arrivals</a></li>
                            <li><a href="#">Packages</a></li>
                            <li><a href="#">Sign In</a></li>
                            <li><a href="#"><button className="signup-button">Sign Up</button></a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header