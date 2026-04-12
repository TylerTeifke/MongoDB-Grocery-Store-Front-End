//Will generate a menu for searching for a specific customer
import SearchTemplate from "./Search_Template";
import axios from "../../api/axios"
import { useState, useRef } from "react";

const SearchCustomers = () => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [customer, setCustomer] = useState([])
    const [display, setDisplay] = useState(false)

    //Will be used to display error messages to the screen
    const errRef = useRef();
    const [errMsg, setErrMsg] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault()

        try{
            const response = await axios.get(`/customers/${firstName}/${lastName}`)
            setCustomer(response.data)
            setErrMsg('')
            setDisplay(true)
        }
        catch(err){
            setDisplay(false)
            if (!err?.response) {
                setErrMsg('No Server Response');
            } 
            else if (err.response?.status === 401) {
                setErrMsg('No customer matches that name. Try again');
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
                table={"customer"} 
                firstName={firstName} 
                setFirstName={setFirstName}
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
                        Name: {customer.firstname} {customer.lastname}
                    </p>
                    <p>
                        Cashier: {customer.employee.firstname} {customer.employee.lastname}
                    </p>
                    <p>
                        Purchases:
                    </p>
                    {customer.products.map(product => {
                        return <li key={product._id}>{product.details.name}, 
                        Price: {product.details.price}, 
                        Expiration Date: {product.expiration_date}
                        </li>
                    })}
                </div>
            )}
        </div>
    )
}

export default SearchCustomers