//Will print out the page for creating a new data entry
import Page from "./Page";

const Create = () => {
    let text = "Select an entry type you want to create"
    const buttons = [
        { id: 1, page: "/CreateCustomer", message: "Customer" },
        { id: 2, page: "/CreateEmployee", message: "Employee" },
        { id: 3, page: "/", message: "Back" }
    ]

    return (
        <Page message={text} buttons={buttons}/>
    )
}

export default Create