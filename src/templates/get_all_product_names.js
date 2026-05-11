//Will generate a drop down list of all of the individual product names
import { useState, useEffect } from "react"
import axios from "../api/axios"

const ProductNameList = ({product, setProduct}) => {

    const [products, setProducts] = useState([])

    let optionItems = products.map((item) =>
        <option key={item._id} value={item.name}>{item.name}</option>
    )

    //will fill up the products array
    async function findProducts() {
        try {
            const response = await axios.get('/products/getDetails')
            setProducts(response.data)
            setProduct(response.data[0].name)
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
        findProducts()
    }, [])

    return(
        <label>
            Product: <select value={product} onChange={(e) => setProduct(e.target.value)}>
                {optionItems}
            </select>
        </label>
    )
}

export default ProductNameList