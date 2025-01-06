import React from "react";
import './Header.css'

const Header = () => {
    
    return (
        <header className="header">
            <div className="logo">FASCO</div>
            <div className="navbar">
                <ul className="menu">
                    <li><a href="#">Home</a></li>
                    <li><a href="#">Deals</a></li>
                    <li><a href="#">New Arrivals</a></li>
                    <li><a href="#">Packages</a></li>
                    <li><a href="#">Sign In</a></li>
                    <li><button className="sign-up-button">Sign Up</button></li>
                </ul>
            </div>
            
        </header>
        
    )
}
export default Header