import Page from "../Page";

const UpdateEmployees = () => {
    let text = "Select what aspect of an employee you want to update"
    const buttons = [
        { id: 1, page: "/UpdateEmployeeName", message: "Update Name" },
        { id: 2, page: "/Update", message: "Back"}
    ]

    return (
        <Page message={text} buttons={buttons}/>
    )
}

export default UpdateEmployees