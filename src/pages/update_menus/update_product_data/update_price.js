//Will generate a menu for updating a product's price
import ProductNameList from "../../../templates/get_all_product_names";
import "../../Page.css"
import Response from "../../../templates/response"
import { useNavigate } from "react-router-dom"
import { useState } from "react";

const UpdatePrice = () => {
    const [product, setProduct] = useState('')

    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
            
        try {
            console.log(product)
        } catch (err) {
            
        }
    }

    return(
        <div>
            <form onSubmit={handleSubmit}>
                <ProductNameList product={product} setProduct={setProduct}/>
                <button type="submit">Submit</button>
            </form>
            <button onClick={() => navigate("/UpdateProducts")}>Back</button>
        </div>
    )
}

export default UpdatePrice