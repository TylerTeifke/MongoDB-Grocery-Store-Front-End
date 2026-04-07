//Will generate a menu for displaying an entire data table
import "../Page.css"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "../../api/axios"

const SearchAll = () => {
    //Will be used to navigate to other pages
    let navigate = useNavigate();

    //Will be used to display information on customers and employees
    const [text, setText] = useState([])
    //Will be used to display information on products
    const [products, setProducts] = useState([])
    //Will be used to change which type of information to display
    const [displayPeople, setDisplayPeople] = useState(true)

    //will search for people
    async function handleFind(route) {
        try {
            const response = await axios.get(route);
            setText(response.data)
            setDisplayPeople(true)
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

    //will search for products
    async function handleFindProducts() {
        try {
            const response = await axios.get('/products');
            setProducts(response.data)
            setDisplayPeople(false)
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

    return(
        <div>
            <header className="header">
                Click on one of the buttons below to see every entry
            </header>
            <button onClick={() => handleFind('/employees')}>Employees</button>
            <br/>
            <br/>
            <button onClick={() => handleFind('/customers')}>Customers</button>
            <br/>
            <br/>
            <button onClick={() => handleFindProducts()}>Products</button>
            <br/>
            <br/>
            <button onClick={() => navigate("/Search")}>Back</button>
            <br/>
            <br/>
            {displayPeople && (
                <p>
                    {text.map(customer => {
                        return <li key={customer._id}>{customer.firstname} {customer.lastname}</li>
                    })}
                </p>
            )}
            {!displayPeople && (
                <p>
                    {products.map(product => {
                        return <li key={product._id}>Name: {product.details.name}, 
                        Price: {product.details.price}, 
                        Expiration Date: {product.expiration_date}
                        </li>
                    })}
                </p>
            )}
        </div>
    )
}

export default SearchAll