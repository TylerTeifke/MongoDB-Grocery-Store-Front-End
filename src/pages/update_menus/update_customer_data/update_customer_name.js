//Will generate a menu for updating a customer's name
import UpdateName from "../update_name_template"

const UpdateCustomerName = () => {
    let person = "customers"
    let prevPage = "/UpdateCustomers"

    return(
        <UpdateName person={person} prevPage={prevPage}/>
    )
}

export default UpdateCustomerName