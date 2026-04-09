//Will generate a menu for searching for a specific customer
import SearchTemplate from "./Search_Template";
import axios from "../../api/axios"
import { useState } from "react";

const SearchCustomers = () => {
    const [firstName, setFirtName] = useState('')
    const [lastName, setLastName] = useState('')
    const [customer, setCustomer] = useState([])
    const [display, setDisplay] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()

        try{
            //get this information displayed to the web page
            const response = await axios.get(`/customers/${firstName}/${lastName}`)
            console.log(response.data)
            setCustomer(response.data)
            setDisplay(true)
        }
        catch(err){
            console.log(err)
        }
    }

    return(
        <div>
            <SearchTemplate 
                table={"customer"} 
                firstName={firstName} 
                setFirstName={setFirtName}
                lastName={lastName}
                setLastName={setLastName}
                handleSubmit={handleSubmit}
            />
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