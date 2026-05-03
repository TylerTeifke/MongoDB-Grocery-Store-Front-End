//will generate a menu for creating a new employee
import "../../Page.css"
import { useState, useRef } from "react"
import { useNavigate } from "react-router-dom"
import axios from "../../../api/axios"

//Will be used to prevent the user from entering numbers into the name and register
//entries
const LETTER_REGEX = /^[a-zA-Z]+$/;

const UpdatePosition = () => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [register, setRegister] = useState('')
    const [position, setPosition] = useState('Cashier')

    //Will be used to display error messages to the screen
    const errRef = useRef();
    const [errMsg, setErrMsg] = useState('');

    //Will be used to display the success message to the screen
    const successRef = useRef();
    const [successMsg, setSuccessMsg] = useState('');

    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        //get the input for this menu to work.
        e.preventDefault();

        if(position !== "Cashier" && register !== ''){
            setErrMsg('Non-cashiers do not get registers. Clear the register field.')
            return
        }
        if(position === "Cashier" && register === ''){
            setErrMsg('Invalid register. Type a letter in the register field')
            return
        }
            
        try {
            const response = await axios.put('/employees/updatePosition',
                JSON.stringify({ firstName, lastName, position, register }),
                {
                    headers: { 'Content-Type': 'application/json' }
                }
            );
            setErrMsg('')
            setSuccessMsg('Update Successful')
            successRef.current.focus();
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } 
            else if (err.response?.status === 409) {
                setErrMsg('There is no employee with that name');
            }
            else {
                setErrMsg('Registration Failed')
            }
            errRef.current.focus();
        }
    }

    const handleChange = (e) => {
        const input = e.target.value

        if(input === "" || LETTER_REGEX.test(input)){
            setRegister(input)
        }
    }

    return(
        <div>
            <header className="header">
                Type in the name of the employee whose position you want to update. 
                If their position is being changed to cashier, then also enter a register 
                for them to use
            </header>
            <p 
                ref={errRef} 
                className={errMsg ? "errmsg" : "offscreen"} 
                aria-live="assertive"
            >
                {errMsg}
            </p>
            <p 
                ref={successRef} 
                className={successMsg ? "successmsg" : "offscreen"} 
                aria-live="assertive"
            >
                {successMsg}
            </p>
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
                    Position: <select value={position} onChange={(e) => setPosition(e.target.value)}>
                        <option value="Cashier">Cashier</option>
                        <option value="Clerk">Clerk</option>
                        <option value="Manager">Manager</option>
                        </select>
                </label>
                <hr/>
                <label>
                    Register: <input
                        type="text"
                        name="register"
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

export default UpdatePosition