import Page from "../Page";

const UpdateProducts = () => {
    let text = "Select what aspect of the products you want to update"
    const buttons = [
        { id: 1, page: "/UpdatePrice", message: "Price" },
        { id: 2, page: "/UpdateProductName", message: "Name" },
        { id: 3, page: "/UpdateType", message: "Type" },
        { id: 5, page: "/Update", message: "Back" }
    ]

    return (
        <Page message={text} buttons={buttons}/>
    )
}

export default UpdateProducts