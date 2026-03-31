//Will give options of which table the user wants to search from
import Page from "../Page";

const SearchOne = () => {
    let text = "Select an entry type you want to search"
    const buttons = [
        { id: 1, page: "/Search", message: "Back"}
    ]

    return (
        <Page message={text} buttons={buttons}/>
    )
}

export default SearchOne