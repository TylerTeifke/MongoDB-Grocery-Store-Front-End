//Will create a template for deleting a person, whether they be an employee or customer
import "../pages/Page.css"
import Response from "./response"
import { useState, useRef } from "react"
import { useNavigate } from "react-router-dom"
import axios from "../api/axios"

const DeletePerson = ({ message, personType }) => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')

    //Will be used to display error messages to the screen
    const errRef = useRef();
    const [errMsg, setErrMsg] = useState('');

    //Will be used to display the success message to the screen
    const successRef = useRef();
    const [successMsg, setSuccessMsg] = useState('');

    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await axios.delete(`/${personType}/deleteEntry`,
                {
                    data: { firstName: firstName, lastName: lastName },
                    headers: { 'Content-Type': 'application/json' }
                }
            );
            setErrMsg('')
            setSuccessMsg('Deletion Successful')
            successRef.current.focus()
        } catch (err) {
            setSuccessMsg('')
            if (!err?.response) {
                setErrMsg('No Server Response');
            }
            else if (err.response?.status === 409){
                setErrMsg('That person is not in the database');
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
                {message}
            </header>
            <Response errMsg={errMsg} errRef={errRef} successMsg={successMsg} successRef={successRef}/>
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
            <button onClick={() => navigate("/Delete")}>Back</button>
        </div>
    )
}

export default DeletePerson