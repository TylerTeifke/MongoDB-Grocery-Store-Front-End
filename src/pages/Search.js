//Will printout the search data page
import Page from './Page'

const Search = () => {
    let text = "Select an entry type you want to search for"
    const buttons = [
        { id: 1, page: "/SearchAll", message: "Search all entries"},
        { id: 2, page: "/SearchOne", message: "Search for one entry"},
        { id: 3, page: "/", message: "Back"}
    ]

    return (
        <Page message={text} buttons={buttons}/>
    )
}

export default Search