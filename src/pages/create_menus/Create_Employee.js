//will generate a menu for creating a new employee
import "../Page.css"
import Response from "../../templates/response";
import { useNavigate } from "react-router-dom";
import axios from "../../api/axios"
import { useState, useRef } from "react";

//Will be used to prevent the user from entering numbers into the name and register
//entries
const LETTER_REGEX = /^[a-zA-Z]+$/;

const CreateEmployee = () => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [register, setRegister] = useState('')
    const [position, setPosition] = useState('Cashier')
    const [salary, setSalary] = useState(0)

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

        const t1 = LETTER_REGEX.test(firstName)
        const t2 = LETTER_REGEX.test(lastName)

        if(!t1 || !t2){
            setSuccessMsg('')
            setErrMsg("One of the name entries is invalid. Try again")
            return
        }
        if(position !== "Cashier" && register !== ''){
            setSuccessMsg('')
            setErrMsg('Non-cashiers do not get registers. Clear the register field.')
            return
        }
        if(position === "Cashier" && register === ''){
            setSuccessMsg('')
            setErrMsg('Invalid register. Type a letter in the register field')
            return
        }
        if(salary < 1){
            setSuccessMsg('')
            setErrMsg("An employee's salary must be greater than $0 per hour. Try again.")
            return
        }
            
        try {
            const response = await axios.post('/employees',
                JSON.stringify({ firstName, lastName, register, position, salary }),
                {
                    headers: { 'Content-Type': 'application/json' }
                }
            );
            setErrMsg('')
            setSuccessMsg('Creation Successful')
            successRef.current.focus()
        } catch (err) {
            setSuccessMsg('')
            if (!err?.response) {
                setErrMsg('No Server Response');
            } 
            else if (err.response?.status === 409) {
                setErrMsg('That employee is already in the database');
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
                Type in the name of the employee you want to create below as well as 
                their position, salary, and if required their cash register
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
                <label>
                    Salary: <input 
                        type="number" 
                        name="salary"
                        required 
                        value={salary} 
                        onChange={(e) => setSalary(e.target.value)}
                    />
                </label>
                <hr/>
                <button type="submit">Submit</button>
            </form>
            <br/>
            <button onClick={() => navigate("/Create")}>Back</button>
        </div>
    )
}

export default CreateEmployee