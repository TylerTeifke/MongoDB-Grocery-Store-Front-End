//Will generate a menu for searching for a specific employee
import SearchTemplate from "./Search_Template";
import axios from "../../api/axios"
import { useState, useRef } from "react";

const SearchEmployees = () => {
    const [firstName, setFirtName] = useState('')
    const [lastName, setLastName] = useState('')
    const [employee, setEmployee] = useState([])
    const [display, setDisplay] = useState(false)
    
    //Will be used to display error messages to the screen
    const errRef = useRef();
    const [errMsg, setErrMsg] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault()
    
        try{
            const response = await axios.get(`/employees/${firstName}/${lastName}`)
            setEmployee(response.data)
            setErrMsg('')
            setDisplay(true)
        }
        catch(err){
            setDisplay(false)
            if (!err?.response) {
                setErrMsg('No Server Response');
            } 
            else if (err.response?.status === 401) {
                setErrMsg('No employee matches that name. Try again');
            } 
            else {
                setErrMsg('Search Failed');
            }
            errRef.current.focus();
        }
    }

    return(
        <div>
            <SearchTemplate 
                table={"employee"} 
                firstName={firstName} 
                setFirstName={setFirtName}
                lastName={lastName}
                setLastName={setLastName}
                handleSubmit={handleSubmit}
            />
            <p 
                ref={errRef} 
                className={errMsg ? "errmsg" : "offscreen"} 
                aria-live="assertive"
            >
                {errMsg}
            </p>
            {display && (
                <div>
                    <p>
                        Name: {employee.firstname} {employee.lastname}
                    </p>
                    <p>
                        Position: {employee.position_id.name}
                    </p>
                    <p>
                        Salary: ${employee.salary}
                    </p>
                    {employee.register !== null && (
                        <p>
                            Register: {employee.register}
                        </p>
                    )}
                    <p>
                        Customers:
                    </p>
                    {employee.customers.map(customer => {
                        return <li key={customer._id}>
                            {customer.firstname} {customer.lastname}
                        </li>
                    })}
                </div>
            )}
        </div>
    )
}

export default SearchEmployees