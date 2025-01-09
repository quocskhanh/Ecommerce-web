import "./Footer.css"
import left_img from "./l_f.png"
import right_img from "./r_f.png"


const Footer = () => {
    return (
        <div className="footer">
            <div className="top">
                <div className="left">
                    <img src={left_img} />
                </div>

                <div className="m">
                    <h1>Subscribe To Our Newsletter</h1>
                    <p> Lorem ipsum dolor sit amet, consectetur elit. Scelerisque duis ultrices sollicitudin aliquam sem. Scelerisque duis ultrices sollicitudin</p>
                </div>
                <div className="m1">

                </div>
                <div className="right">
                    <img src={right_img} />
                </div>
            </div>
            <hr></hr>
            <div className="bot">

            </div>
        </div>
    )
}

export default Footer




















