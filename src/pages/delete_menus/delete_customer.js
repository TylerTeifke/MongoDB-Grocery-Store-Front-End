//Will generate a menu for deleting a customer
import DeletePerson from "../../templates/delete_person"

const DeleteCustomer = () => {
    let message = "Type in the name of the customer you want to delete, then press submit."

    return(
        <DeletePerson message={message} personType={"customers"}/>
    )
}

export default DeleteCustomer