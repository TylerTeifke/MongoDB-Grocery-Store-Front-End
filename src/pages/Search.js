//Will printout the search data page
import { useNavigate } from 'react-router-dom';
import './Page.css'

const Search = () => {
    //Will be used to navigate to other pages
    let navigate = useNavigate();

    //Will navigate to the specified page upon the arrow being clicked
    const handleClick = () => {
        navigate("/")
    }

    return(
        <div>
            <header className='header'>
                Welcome to the search page
            </header>
            <button onClick={handleClick}>Back</button>
        </div>
    )
}

export default Search