//Will generate the template used for searching one particular table
import "../Page.css"
import { useNavigate } from "react-router-dom";

const SearchTemplate = ({ table, firstName, setFirstName, lastName, setLastName, handleSubmit }) => {
    let navigate = useNavigate();

    return(
        <div>
            <header className="header">
                Type in the name of the {table} you want to find below
            </header>
            <form onSubmit={handleSubmit}>
                <label>
                    First Name: <input 
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
                    Last Name: <input 
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
            <button onClick={() => navigate("/SearchOne")}>Back</button>
        </div>
    )
}

export default SearchTemplate