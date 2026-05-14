//Will generate a menu for creating a new product
import "../Page.css"
import Response from "../../templates/response";
import { useNavigate } from "react-router-dom";
import axios from "../../api/axios"
import { useState, useRef } from "react";
import TypeList from "../../templates/type_list";

//Will be used to prevent the user from entering numbers into the name entry
const LETTER_REGEX = /^[a-zA-Z ]+$/;

const CreateProduct = () => {

    const [name, setName] = useState('')
    const [type, setType] = useState('Dairy')
    const [price, setPrice] = useState(0)

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
            setSuccessMsg('')
            setErrMsg("Invalid Name. Try again")
            return
        }
                
        try {
            const response = await axios.post('/products',
                JSON.stringify({ name, type, price }),
                {
                    headers: { 'Content-Type': 'application/json' }
                }
            );
            setErrMsg('')
            setSuccessMsg('Creation Successful')
            successRef.current.focus()
        } catch (err) {
            setSuccessMsg('')
            if (!err?.response) {
                setErrMsg('No Server Response');
            } 
            else if (err.response?.status === 409) {
                setErrMsg('That product is already in the database');
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
                Type in the name of the product you want to create below as well as 
                the price and pick a type
            </header>
            <Response errMsg={errMsg} errRef={errRef} successMsg={successMsg} successRef={successRef}/>
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
                <TypeList type={type} setType={setType}/>
                <hr/>
                <label>
                    Price: <input 
                        type="number" 
                        name="price"
                        required 
                        value={price} 
                        onChange={(e) => setPrice(e.target.value)}
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

export default CreateProduct