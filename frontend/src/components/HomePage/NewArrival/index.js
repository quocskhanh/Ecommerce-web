import "./NewArrival.css"
import UseEffect2 from "./list_newar_product"



const NewArrival = () => {

  

    return (
        <div className="newarrival-container">
            <div className="newarrival-wrap">
                <h3>New Arrivals</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Scelerisque duis ultrices sollicitudin aliquam sem. Scelerisque duis ultrices sollicitudin</p>
                <div className="newarr-product">
                  <UseEffect2 />
                </div>
  
                <button>View More</button>
            </div>
        </div>
    )
}

export default NewArrival