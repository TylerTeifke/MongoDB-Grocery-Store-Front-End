//Will print out the home page of the app
import { useNavigate } from 'react-router-dom'
import { useState } from 'react';
import Page from './Page';

const Home = () => {
    //Will be used to navigate to other pages
    let navigate = useNavigate();

    //Will navigate to the specified page upon the arrow being clicked
    const handleClick = () => {
        navigate("/Search")
    }

    let text = "Welcome to the grocery store database, please click one of the buttons below to explore what this app can do."
    const [items] = useState([
        {
            id: 1,
            page: "/Search",
            message: "Search data"
        }
    ])

    return(
        <Page message={text} buttons={items}/>
    )
}

export default Home