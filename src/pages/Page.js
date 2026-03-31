//Will generate a template for all the web pages in this app
import { useNavigate } from 'react-router-dom'
import './Page.css'

const Page = ({ message, buttons }) => {
    //Will be used to navigate to other pages
    let navigate = useNavigate();

    function NavButton({ page, children }) {
        return (
            <button onClick={() => navigate(page)}>
                {children}
            </button>
        );
    }

    return(
        <div>
            <header className='header'>{message}</header>
            {buttons.map(button => (
                <>
                    <NavButton key={button.id} page={button.page}>
                        {button.message}
                    </NavButton>
                    <br/>
                    <br/>
                </>
            ))}
        </div>
    )
}

export default Page