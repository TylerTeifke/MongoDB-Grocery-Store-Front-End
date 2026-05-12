//Will generate a menu for updating a product's price
import ProductNameList from "../../../templates/get_all_product_names";
import "../../Page.css"
import Response from "../../../templates/response"
import { useNavigate } from "react-router-dom"
import { useState, useRef } from "react";
import axios from "../../../api/axios";

const UpdatePrice = () => {
    const [product, setProduct] = useState('')
    const [price, setPrice] = useState(0)

    //Will be used to display error messages to the screen
    const errRef = useRef();
    const [errMsg, setErrMsg] = useState('');
    
    //Will be used to display the success message to the screen
    const successRef = useRef();
    const [successMsg, setSuccessMsg] = useState('');

    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(price < 1){
            setSuccessMsg('')
            setErrMsg("The price of a product must be greater than 0. Try again.")
            return
        }
            
        try {
            const response = await axios.put('/products/updatePrice',
                JSON.stringify({ product, price }),
                {
                    headers: { 'Content-Type': 'application/json' }
                }
            );
            setErrMsg('')
            setSuccessMsg('Update Successful')
            successRef.current.focus();
        } catch (err) {
            setSuccessMsg('')
            if (!err?.response) {
                setErrMsg('No Server Response');
            }
            else {
                setErrMsg('Registration Failed')
            }
            errRef.current.focus();
        }
    }

    return(
        <div>
            <header className="header">
                Select the product whose price you want to change, and then type 
                in the product's new price.
            </header>
            <Response errMsg={errMsg} errRef={errRef} successMsg={successMsg} successRef={successRef}/>
            <form onSubmit={handleSubmit}>
                <ProductNameList product={product} setProduct={setProduct}/>
                <hr/>
                <label>
                    Price: <input 
                        type="number" 
                        name="price"
                        required 
                        value={price} 
                        onChange={(e) => setPrice(e.target.value)}
                    />
                </label>
                <hr/>
                <button type="submit">Submit</button>
            </form>
            <hr/>
            <button onClick={() => navigate("/UpdateProducts")}>Back</button>
        </div>
    )
}

export default UpdatePrice