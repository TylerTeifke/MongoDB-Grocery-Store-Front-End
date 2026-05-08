//will create a page for removing a product from a customer's cart
import UpdateProduct from "../../../templates/update_customer_products"

const RemoveProduct = () => {

    return(
        <UpdateProduct productApiRoute={'purchased'} customerApiRoute={'removeProduct'}/>
    )
}

export default RemoveProduct