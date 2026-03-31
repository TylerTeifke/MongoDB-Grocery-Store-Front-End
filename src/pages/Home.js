//Will print out the home page of the app
import Page from './Page';

const Home = () => {

    let text = "Welcome to the grocery store database, please click one of the buttons below to explore what this app can do."
    const buttons = [
        { id: 1, page: "/Search", message: "Search Data"},
        { id: 2, page: "/Create", message: "Create Data"},
        { id: 3, page: "/Update", message: "Update Data"},
        { id: 4, page: "/Delete", message: "Delete Data"}
    ]

    return(
        <Page message={text} buttons={buttons}/>
    )
}

export default Home