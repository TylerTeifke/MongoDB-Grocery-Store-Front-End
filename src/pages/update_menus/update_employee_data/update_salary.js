//Will generate a menu for updating an employee's salary
import "../../Page.css"
import { useState, useRef } from "react"
import { useNavigate } from "react-router-dom"
import axios from "../../../api/axios"

const UpdateSalary = () => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [salary, setSalary] = useState('')

    //Will be used to display error messages to the screen
    const errRef = useRef();
    const [errMsg, setErrMsg] = useState('');

    //Will be used to display the success message to the screen
    const successRef = useRef();
    const [successMsg, setSuccessMsg] = useState('');
    
    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(salary < 1){
            setErrMsg("An employee's salary must be greater than $0 per hour. Try again.")
            return
        }
    
        try {
            const response = await axios.put('/employees/updateSalary',
                JSON.stringify({ firstName, lastName, salary }),
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

    return(
        <div>
            <header className="header">
                Type in the name of the employee whose salary you want to update, as 
                well as their new salary
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
            <button onClick={() => navigate("/UpdateEmployees")}>Back</button>
        </div>
    )
}

export default UpdateSalary