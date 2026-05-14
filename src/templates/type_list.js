//Will generate a drop down list of all of the product types
import { useState, useEffect } from "react"
import axios from "../api/axios"

const TypeList = ({type, setType}) => {

    const [types, setTypes] = useState([])

    let optionItems = types.map((item) =>
        <option key={item._id} value={item._id}>{item.type}</option>
    )

    //will fill up the types array
    async function findTypes() {
        try {
            const response = await axios.get('/products/getTypes')
            setTypes(response.data)
            setType(response.data[0]._id)
        } 
        catch (err) {
            if (!err?.response) {
                console.log("No server response")
            }
            else {
                console.log('Request Failed')
            }
        }
    }

    //Will make it so the products list is populated when the page is first loaded
    useEffect(() => {
        findTypes()
    }, [])

    return(
        <label>
            Type: <select value={type} onChange={(e) => setType(e.target.value)}>
                {optionItems}
            </select>
        </label>
    )
}

export default TypeList