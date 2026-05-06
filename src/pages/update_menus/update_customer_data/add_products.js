//will create a page for adding a product to a customer's kart
import "../../Page.css"
import Response from "../../../templates/response"
import { useState, useRef, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import axios from "../../../api/axios"

//TODO: Make this code a template that can be used to both add a product and remove
//a product

const AddProduct = () => {

    const [custFirstName, setCustFirstName] = useState('')
    const [custLastName, setCustLastName] = useState('')
    const [products, setProducts] = useState([])
    const [product, setProduct] = useState('')

    //Will be used to display error messages to the screen
    const errRef = useRef();
    const [errMsg, setErrMsg] = useState('');

    //Will be used to display the success message to the screen
    const successRef = useRef();
    const [successMsg, setSuccessMsg] = useState('');

    let navigate = useNavigate();

    let optionItems = products.map((item) =>
        <option key={item._id} value={item.details.name}>{item.details.name}</option>
    )

    //will fill up the products array with products that have not been taken
    async function findProducts() {
        try {
            const response = await axios.get('/products/available');
            setProducts(response.data)
        } 
        catch (err) {
            if (!err?.response) {
                console.log("No server response")
            } 
            else {
                console.log('Request Failed')
            }
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
            
        try {
            const response = await axios.put('customers/updateCashier',
                JSON.stringify({ custFirstName, custLastName, empFirstName, empLastName }),
                {
                    headers: { 'Content-Type': 'application/json' }
                }
            );
            setErrMsg('')
            setSuccessMsg('Update Successful')
            successRef.current.focus()
        } catch (err) {
            setSuccessMsg('')
            if (!err?.response) {
                setErrMsg('No Server Response');
            } 
            else if (err.response?.status === 409) {
                setErrMsg('That customer is not in the database');
            } 
            else if (err.response?.status === 410){
                setErrMsg('That employee is not in the database');
            }
            else if (err.response?.status === 411){
                setErrMsg("That employee is not a cashier");
            }
            else if (err.response?.status === 412){
                setErrMsg("That employee is already the customer's cashier");
            }
            else {
                setErrMsg('Registration Failed')
            }
            errRef.current.focus();
        }
    }

    useEffect(() => {
        findProducts()
    }, [product])

    return(
        <div>
            <header className="header">
                Type in the name of the customer and select the product you want them
                to buy
            </header>
            <Response errMsg={errMsg} errRef={errRef} successMsg={successMsg} successRef={successRef}/>
            <form onSubmit={handleSubmit}>
                <label>
                    Customer First Name: <input 
                        type="text" 
                        name="custFirstName" 
                        placeholder="First Name" 
                        required
                        value={custFirstName}
                        onChange={(e) => setCustFirstName(e.target.value)}
                    />
                </label>
                <hr/>
                <label>
                    Customer Last Name: <input 
                        type="text" 
                        name="custLastName" 
                        placeholder="Last Name" 
                        required 
                        value={custLastName} 
                        onChange={(e) => setCustLastName(e.target.value)}
                    />
                </label>
                <hr/>
                <label>
                    Product: <select value={product} onChange={(e) => setProduct(e.target.value)}>
                        {optionItems}
                    </select>
                </label>
                <hr/>
                <button type="submit">Submit</button>
            </form>
            <br/>
            <button onClick={() => navigate("/UpdateCustomers")}>Back</button>
        </div>
    )
}

export default AddProduct