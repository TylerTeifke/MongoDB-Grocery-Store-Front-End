//Will generate a menu for updating an employee's name
import UpdateName from "../update_name_template"

const UpdateEmployeeName = () => {
    let person = "employees"
    let prevPage = "/UpdateEmployees"

    return(
        <UpdateName person={person} prevPage={prevPage}/>
    )
}

export default UpdateEmployeeName