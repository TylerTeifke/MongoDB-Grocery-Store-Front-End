//Will generate a template for all the web pages in this app
import { useNavigate } from 'react-router-dom'
import './Page.css'

const Page = ({ message, buttons }) => {
    //Will be used to navigate to other pages
    let navigate = useNavigate();

    //Will navigate to the specified page upon the arrow being clicked
    const handleClick = (page) => {
        console.log("test")
        navigate(page)
    }

    return(
        <div>
            <header className='header'>{message}</header>
            {buttons.map(button => (
                <button key={button.id} onClick={handleClick(button.page)}>{button.message}</button>
            ))}
        </div>
    )
}

export default Page