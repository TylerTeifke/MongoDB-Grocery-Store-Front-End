//will generate a menu for creating a new customer
import "../Page.css"
import Response from "../../templates/response";
import { useNavigate } from "react-router-dom";
import axios from "../../api/axios"
import { useState, useRef } from "react";

//Will be used to prevent the user from entering numbers into the name entries
const LETTER_REGEX = /^[a-zA-Z]+$/;

const CreateCustomer = () => {
    const [custFirstName, setCustFirstName] = useState('')
    const [custLastName, setCustLastName] = useState('')
    const [empFirstName, setEmpFirstName] = useState('')
    const [empLastName, setEmpLastName] = useState('')

    //Will be used to display error messages to the screen
    const errRef = useRef();
    const [errMsg, setErrMsg] = useState('');

    //Will be used to display the success message to the screen
    const successRef = useRef();
    const [successMsg, setSuccessMsg] = useState('');

    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const t1 = LETTER_REGEX.test(custFirstName)
        const t2 = LETTER_REGEX.test(custLastName)
        const t3 = LETTER_REGEX.test(empFirstName)
        const t4 = LETTER_REGEX.test(empLastName)

        if(!t1 || !t2 || !t3 || !t4){
            setSuccessMsg('')
            setErrMsg('One of the name fields is invalid. Try again')
            return
        }
        
        try {
            const response = await axios.post('/customers',
                JSON.stringify({ custFirstName, custLastName, empFirstName, empLastName }),
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
                setErrMsg('That customer is already in the database');
            } 
            else if (err.response?.status === 410){
                setErrMsg('That employee is not in the database');
            }
            else if (err.response?.status === 411){
                setErrMsg('That employee is not a cashier');
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
                Type in the name of the customer you want to create below as well as 
                the name of the cashier who serviced them
            </header>
            <Response errMsg={errMsg} errRef={errRef} successMsg={successMsg} successRef={successRef}/>
            <form onSubmit={handleSubmit}>
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
                <button type="submit">Submit</button>
            </form>
            <br/>
            <button onClick={() => navigate("/Create")}>Back</button>
        </div>
    )
}

export default CreateCustomer