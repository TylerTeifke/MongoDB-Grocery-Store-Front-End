//Will ask for which type of data you want to update
import Page from "./Page";

const Update = () => {
    let text = "Select an entry type you want to update"
    const buttons = [
        { id: 1, page: "/UpdateEmployees", message: "Employees" },
        { id: 2, page: "/UpdateCustomers", message: "Customers" },
        { id: 3, page: "/", message: "Back"}
    ]

    return (
        <Page message={text} buttons={buttons}/>
    )
}

export default Update