import React from "react";
import './Banner.css'
import l_i from "./l_i.png"
import r_i from "./r-i.png"
import t_i from "./t_i.png"
import u_i from "./u_i.jpg"

const Banner = () => {
    return (
        <section className="banner">
            <div className="left-image">
                <img src={l_i} alt="men" className="l-i"/>
            </div>
            
            <div className="mid">
                <div className="top-mid">
                    <img src= {t_i} alt="girls" className="t_i"/>
                </div>
                
                <h1 className="ultimate">ULTIMATE</h1>
                <h1 className="sale">SALE</h1>
                <p className="new-collection">NEW COLLECTION</p>
                <div className="shop-now">SHOP NOW</div>

                <div className="u-mid">
                <img src= {u_i} alt="girls" className="u_i"/>
                </div>
            </div>

            <div className="right-image">
                <img src = {r_i} atl = "men" className="r-i"/>
            </div>
        </section>
    )
}

export default Banner;
























