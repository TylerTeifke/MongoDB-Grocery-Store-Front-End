//Will print out the page for creating a new data entry
import Page from "./Page";

const Create = () => {
    let text = "Select an entry type you want to create"
    const buttons = [
        { id: 1, page: "/", message: "Back"}
    ]

    return (
        <Page message={text} buttons={buttons}/>
    )
}

export default Create