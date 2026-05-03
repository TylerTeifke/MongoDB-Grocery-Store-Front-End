import Page from "../Page";

const UpdateCustomers = () => {
    let text = "Select what aspect of a customer you want to update"
    const buttons = [
        { id: 1, page: "/UpdateCustomerName", message: "Update Name"},
        { id: 2, page: "/UpdateCashier", message: "Update Cashier"},
        { id: 3, page: "/Update", message: "Back"}
    ]

    return (
        <Page message={text} buttons={buttons}/>
    )
}

export default UpdateCustomers