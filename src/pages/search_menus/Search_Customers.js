//Will generate a menu for searching for a specific customer
import SearchTemplate from "./Search_Template";
import axios from "../../api/axios"
import { useState } from "react";

const SearchCustomers = () => {
    const [firstName, setFirtName] = useState('')
    const [lastName, setLastName] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()

        try{
            //get this information displayed to the web page
            const response = await axios.get(`/customers/${firstName}/${lastName}`)
            console.log(JSON.stringify(response.data))
        }
        catch(err){
            console.log(err)
        }
    }

    return(
        <SearchTemplate 
            table={"customer"} 
            firstName={firstName} 
            setFirstName={setFirtName}
            lastName={lastName}
            setLastName={setLastName}
            handleSubmit={handleSubmit}
        />
    )
}

export default SearchCustomers