//Will generate a menu for deleting an employee
import DeletePerson from "../../templates/delete_person"

const DeleteEmployee = () => {
    let message = "Type in the name of the employee you want to delete, then press submit."

    return(
        <DeletePerson message={message} personType={"employees"}/>
    )
}

export default DeleteEmployee