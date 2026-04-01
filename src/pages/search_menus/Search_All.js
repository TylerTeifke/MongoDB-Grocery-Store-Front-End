//Will generate a menu for displaying an entire data table
import "../Page.css"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

const SearchAll = () => {
    //Will be used to navigate to other pages
    let navigate = useNavigate();

    //Will be used to track the text the user wants displayed
    const [text, setText] = useState("")

    return(
        <div>
            <header className="header">
                Click on one of the buttons below to see every entry
            </header>
            <button onClick={() => setText("Employees")}>Employees</button>
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