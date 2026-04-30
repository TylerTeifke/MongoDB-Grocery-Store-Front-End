//will generate a menu for adding a customer to the employee's customer list
import "../../Page.css"
import { useState, useRef } from "react"
import { useNavigate } from "react-router-dom"
import axios from "../../../api/axios"

const UpdateCustomerList = () => {
    const [custFirstName, setCustFirstName] = useState('')
    const [custLastName, setCustLastName] = useState('')
    const [empFirstName, setEmpFirstName] = useState('')
    const [empLastName, setEmpLastName] = useState('')

    //Will be used to display error messages to the screen
    const errRef = useRef();
    const [errMsg, setErrMsg] = useState('');

    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await axios.put('employees/updateCustomerList',
                JSON.stringify({ empFirstName, empLastName, custFirstName, custLastName }),
                {
                    headers: { 'Content-Type': 'application/json' }
                }
            );
            setErrMsg('')
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } 
            else if (err.response?.status === 409) {
                setErrMsg('That employee is not in the database');
            } 
            else if (err.response?.status === 410){
                setErrMsg('That customer is not in the database');
            }
            else if (err.response?.status === 411){
                setErrMsg("That employee is not a cashier");
            }
            else if (err.response?.status === 412){
                setErrMsg("That customer is already in the employee's customer list");
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
                Type in the name of the cashier who's customer list you want to add to, 
                as well as the name of the customer you want to add
            </header>
            <p 
                ref={errRef} 
                className={errMsg ? "errmsg" : "offscreen"} 
                aria-live="assertive"
            >
                {errMsg}
            </p>
            <form onSubmit={handleSubmit}>
                <label>
                    Employee First Name: <input 
                        type="text" 
                        name="empFirstName" 
                        placeholder="First Name" 
                        required
                        value={empFirstName}
                        onChange={(e) => setEmpFirstName(e.target.value)}
                    />
                </label>
                <hr/>
                <label>
                    Employee Last Name: <input 
                        type="text" 
                        name="empLastName" 
                        placeholder="Last Name" 
                        required 
                        value={empLastName} 
                        onChange={(e) => setEmpLastName(e.target.value)}
                    />
                </label>
                <hr/>
                <label>
                    Customer First Name: <input 
                        type="text" 
                        name="custFirstName" 
                        placeholder="First Name" 
                        required
                        value={custFirstName}
                        onChange={(e) => setCustFirstName(e.target.value)}
                    />
                </label>
                <hr/>
                <label>
                    Customer Last Name: <input 
                        type="text" 
                        name="custLastName" 
                        placeholder="Last Name" 
                        required 
                        value={custLastName} 
                        onChange={(e) => setCustLastName(e.target.value)}
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

export default UpdateCustomerList