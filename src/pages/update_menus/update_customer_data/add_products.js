//will create a page for adding a product to a customer's kart
import UpdateProduct from "../../../templates/update_customer_products"

const AddProduct = () => {

    return(
        <UpdateProduct productApiRoute={'available'} customerApiRoute={'addProduct'}/>
    )
}

export default AddProduct