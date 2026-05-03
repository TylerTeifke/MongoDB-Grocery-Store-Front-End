//Will generate the menu for adding an item to the inventory
import "../Page.css"
import { useNavigate } from "react-router-dom";
import axios from "../../api/axios"
import { useState, useRef } from "react";

//Will be used to prevent the user from entering numbers into the name entry
const LETTER_REGEX = /^[a-zA-Z ]+$/;

const AddToInventory = () => {

    const [name, setName] = useState('')
    const [expiration, setExpiration] = useState('')
    
    //Will be used to display error messages to the screen
    const errRef = useRef();
    const [errMsg, setErrMsg] = useState('');

    //Will be used to display the success message to the screen
    const successRef = useRef();
    const [successMsg, setSuccessMsg] = useState('');
    
    let navigate = useNavigate();
    
    const handleSubmit = async (e) => {
        //get the input for this menu to work.
        e.preventDefault();
        
        const t1 = LETTER_REGEX.test(name)
        
        if(!t1){
            setErrMsg("There can only be letters in the name entry. Try again")
            return
        }
                    
        try {
            const response = await axios.post('/products/inventory',
                JSON.stringify({ name, expiration }),
                {
                    headers: { 'Content-Type': 'application/json' }
                }
            );
            setErrMsg('')
            setSuccessMsg('Creation Successful')
            successRef.current.focus()
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } 
            else if (err.response?.status === 409) {
                setErrMsg('That product is not in the database');
            }
            else {
                setErrMsg('Registration Failed')
            }
            errRef.current.focus();
        }
    }

    return(
        <div>
            <header className="header">
                Type in the name of the product you want to add below. Note that for 
                vegetables, the expiration date does not matter and you can enter anything
            </header>
            <p 
                ref={errRef} 
                className={errMsg ? "errmsg" : "offscreen"} 
                aria-live="assertive"
            >
                {errMsg}
            </p>
            <p 
                ref={successRef} 
                className={successMsg ? "successmsg" : "offscreen"} 
                aria-live="assertive"
            >
                {successMsg}
            </p>
            <form onSubmit={handleSubmit}>
                <label>
                    Product Name: <input 
                        type="text" 
                        name="Name" 
                        placeholder="Name" 
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </label>
                <hr/>
                <label>
                    Expiration Date: <input 
                        type="date" 
                        name="expiration"
                        required 
                        value={expiration} 
                        onChange={(e) => setExpiration(e.target.value)}
                    />
                </label>
                <hr/>
                <button type="submit">Submit</button>
            </form>
            <br/>
            <button onClick={() => navigate("/Create")}>Back</button>
        </div>
    )
}

export default AddToInventory