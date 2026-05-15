//Will generate a template for updating a customer's products
import "../pages/Page.css"
import Response from "./response"
import { useState, useRef } from "react"
import { useNavigate } from "react-router-dom"
import axios from "../api/axios"

const UpdateProduct = ({ productApiRoute, customerApiRoute }) => {

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [products, setProducts] = useState([])
    const [product, setProduct] = useState('')
    const [displayProducts, setDisplayProducts] = useState(false)

    //Will be used to display error messages to the screen
    const errRef = useRef();
    const [errMsg, setErrMsg] = useState('');

    //Will be used to display the success message to the screen
    const successRef = useRef();
    const [successMsg, setSuccessMsg] = useState('');

    let navigate = useNavigate();

    let optionItems = products.map((item) =>
        <option key={item._id} value={item._id}>{item.details.name}</option>
    )

    //will fill up the products array with products depending on the circumstances
    async function findProducts() {
        try {
            let response
            if(productApiRoute === 'available'){
                response = await axios.get(`/products/${productApiRoute}`);
            }
            else{
                response = await axios.get(`/products/${productApiRoute}/${firstName}/${lastName}`);
            }
            setErrMsg('')
            setProducts(response.data)
            setProduct(response.data[0]._id)
            setDisplayProducts(true)
        } 
        catch (err) {
            setSuccessMsg('')
            if (!err?.response) {
                console.log("No server response")
            } 
            else if (err.response?.status === 409) {
                if(productApiRoute === 'available'){
                    setErrMsg("No products are available to be added to the cart");
                }
                else{
                    setErrMsg("The customer does not have any products to remove")
                }
            }
            else {
                console.log('Request Failed')
            }
        }
    }

    //Will handle the logic for submitting a customer's name
    const handleNameSubmit = async (e) => {
        e.preventDefault();
            
        try {
            const response = await axios.get(`/customers/${firstName}/${lastName}`);
            setErrMsg('')
            findProducts()
        } catch (err) {
            setSuccessMsg('')
            if (!err?.response) {
                setErrMsg('No Server Response');
            } 
            else if (err.response?.status === 401) {
                setErrMsg('That customer is not in the database');
            }
            else {
                setErrMsg('Registration Failed')
            }
            errRef.current.focus();
        }
    }

    //Will handle the logic for submitting a product to either be added or removed
    //from a customer's cart
    const handleProductSubmit = async (e) => {
        e.preventDefault();
            
        try {
            //convert the item ID to a string so that the back end can process it
            const itemID = product.toString()
            console.log(itemID)
            const response = await axios.put(`/customers/${customerApiRoute}`,
                JSON.stringify({ firstName, lastName, itemID }),
                    {
                        headers: { 'Content-Type': 'application/json' }
                    }
            );
            setErrMsg('')
            setSuccessMsg('Customer cart Updated')
            successRef.current.focus()
        } catch (err) {
            setSuccessMsg('')
            if (!err?.response) {
                setErrMsg('No Server Response');
            }
            else if (err.response?.status === 409) {
                setErrMsg('Invalid Action');
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
                Type in the name of the customer whose shopping cart you want to update
            </header>
            <Response errMsg={errMsg} errRef={errRef} successMsg={successMsg} successRef={successRef}/>
            <form onSubmit={handleNameSubmit}>
                <label>
                    Customer First Name: <input 
                        type="text" 
                        name="firstName" 
                        placeholder="First Name" 
                        required
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                </label>
                <hr/>
                <label>
                    Customer Last Name: <input 
                        type="text" 
                        name="lastName" 
                        placeholder="Last Name" 
                        required 
                        value={lastName} 
                        onChange={(e) => setLastName(e.target.value)}
                    />
                </label>
                <hr/>
                <button type="submit">Submit</button>
            </form>
            <br/>
            {displayProducts && (
                <form onSubmit={handleProductSubmit}>
                    <label>
                        Product: <select value={product} onChange={(e) => setProduct(e.target.value)}>
                            {optionItems}
                    </select>
                    </label>
                    <hr/>
                    <button type="submit">Submit</button>
                </form>
            )}
            <br/>
            <button onClick={() => navigate("/UpdateCustomers")}>Back</button>
        </div>
    )
}

export default UpdateProduct