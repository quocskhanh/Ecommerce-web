import "./Logo.css"
import chanel from "./chanel.png"
import lv from "./lv.png"
import prada from "./prada.png"
import ck from "./ck.png"
import denim from "./denim.png"

const Logo = () => {
    return (
        <div className="khung"> 
            <div className="chanel">
                <img src= {chanel} className="i"/>
            </div>
            <div className="lv">
                <img src= {lv} className="i" />
            </div>
            <div className="prada">
                <img src={prada} className="i"/>
            </div>
            <div className="ck">
                <img src={ck} className="i"/>
            </div>
            <div className="denim">
                <img src={denim} className="i" />
            </div>
        </div>
    )
}

export default Logo