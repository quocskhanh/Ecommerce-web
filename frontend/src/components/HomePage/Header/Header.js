import "./Header.css"
import React from 'react'; 
import { Link } from 'react-router-dom';



const Header = () => {
    return (
        <div className="header">
            <div className="container">
                <div className="head-home-wrap">
                    <div className="logo">
                        Fasco
                    </div>
                    <div className="inner-list">
                        <ul>
                            <li><a href="#">Home</a></li>
                            <li><a href="#"><Link to="/shop">Shop</Link></a></li>
                            <li><a href="#">New Arrivals</a></li>
                            <li><a href="#">Packages</a></li>
                            <li><Link to="/login">Sign In</Link></li>
                            {/* Link to signup page */}
                            <li><Link to="/signup"><button className="home-signup-button">Sign Up</button></Link></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header