//Will generate a menu for updating an employee's register
import "../../Page.css"
import Response from "../../../templates/response"
import { useState, useRef } from "react"
import { useNavigate } from "react-router-dom"
import axios from "../../../api/axios"

//Will be used to prevent the user from entering numbers into the register entry
const LETTER_REGEX = /^[a-zA-Z]+$/;

const UpdateRegister = () => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [register, setRegister] = useState('')

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
            const response = await axios.put('/employees/updateRegister',
                JSON.stringify({ firstName, lastName, register }),
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
            else if (err.response?.status === 409) {
                setErrMsg('There is no employee with that name');
            }
            else if (err.response?.status === 410) {
                setErrMsg('That employee is not a cashier');
            }
            else {
                setErrMsg('Registration Failed')
            }
            errRef.current.focus();
        }
    }

    //Will prevent the user from entering any invalid data into the register entry
    const handleChange = (e) => {
        const input = e.target.value

        if(input === "" || LETTER_REGEX.test(input)){
            setRegister(input)
        }
    }

    return(
        <div>
            <header className="header">
                Type in the name of the employee whose cash register you want to update, as 
                well as their new register
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
                <label>
                    Register: <input
                        type="text"
                        name="register"
                        required
                        maxLength={1}
                        value={register}
                        onChange={handleChange}
                    />
                </label>
                <hr/>
                <button type="submit">Submit</button>
            </form>
            <br/>
            <button onClick={() => navigate("/UpdateEmployees")}>Back</button>
        </div>
    )
}

export default UpdateRegister