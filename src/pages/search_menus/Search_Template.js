//Will generate the template used for searching one particular table
import "../Page.css"
import { useNavigate } from "react-router-dom";

const SearchTemplate = ({ table }) => {
    let navigate = useNavigate();

    function handleSubmit(e){
        e.preventDefault()

        // Read the form data
        const form = e.target;
        const formData = new FormData(form);

        const formJson = Object.fromEntries(formData.entries());
        console.log(formJson);
    }

    return(
        <div>
            <header className="header">
                Type in the name of the {table} you want to find below
            </header>
            <form onSubmit={handleSubmit}>
                <label>
                    First Name: <input type="text" name="firstName" placeholder="First Name" required/>
                </label>
                <hr/>
                <label>
                    Last Name: <input type="text" name="lastName" placeholder="Last Name" required/>
                </label>
                <hr/>
                <button type="submit">Submit</button>
            </form>
            <br/>
            <button onClick={() => navigate("/SearchOne")}>Back</button>
        </div>
    )
}

export default SearchTemplate