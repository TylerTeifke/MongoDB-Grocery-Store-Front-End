//Will ask for which type of data you want to delete
import Page from "./Page";

const Delete = () => {
    let text = "Select an entry type you want to delete"
    const buttons = [
        { id: 1, page: "/", message: "Back"}
    ]

    return (
        <Page message={text} buttons={buttons}/>
    )
}

export default Delete