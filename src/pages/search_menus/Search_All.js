//Will generate a menu for displaying an entire data table
import "../Page.css"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "../../api/axios"

const SearchAll = () => {
    //Will be used to navigate to other pages
    let navigate = useNavigate();

    //Will be used to track the text the user wants displayed
    const [text, setText] = useState([])

    async function handleFind(route) {
        try {
            const response = await axios.get(route);
            setText(response.data)
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
            <button onClick={() => setText([{id: "1", firstname: "John", lastname: "Smith"}])}>Employees</button>
            <br/>
            <br/>
            <button onClick={() => handleFind('/customers')}>Customers</button>
            <br/>
            <br/>
            <button onClick={() => setText([{id: "1", firstname: "John", lastname: "Smith"}])}>Products</button>
            <br/>
            <br/>
            <button onClick={() => navigate("/Search")}>Back</button>
            <br/>
            <br/>
            <p>
                {text.map(customer => {
                    return <li key={customer._id}>{customer.firstname} {customer.lastname}</li>
                })}
            </p>
        </div>
    )
}

export default SearchAll