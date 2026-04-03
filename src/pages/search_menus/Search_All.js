//Will generate a menu for displaying an entire data table
import "../Page.css"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "../../api/axios"

const SearchAll = () => {
    //Will be used to navigate to other pages
    let navigate = useNavigate();

    //Will be used to track the text the user wants displayed
    const [text, setText] = useState("")

    async function handleFind() {
        try {
            const response = await axios.get('/customers');
            // TODO: add a second customer and see if this function still works
            const firstNames = response.data.map(customer => customer.firstname)
            const lastNames = response.data.map(customer => customer.lastname)
            setText(firstNames + " " + lastNames)
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
            <button onClick={() => handleFind()}>Employees</button>
            <br/>
            <br/>
            <button onClick={() => setText("Customers")}>Customers</button>
            <br/>
            <br/>
            <button onClick={() => setText("Products")}>Products</button>
            <br/>
            <br/>
            <button onClick={() => navigate("/Search")}>Back</button>
            <br/>
            <br/>
            <p>{text}</p>
        </div>
    )
}

export default SearchAll