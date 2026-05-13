//Will generate a menu for updating the product's name
import ProductNameList from "../../../templates/get_all_product_names";
import "../../Page.css"
import Response from "../../../templates/response"
import { useNavigate } from "react-router-dom"
import { useState, useRef } from "react";
import axios from "../../../api/axios";

//Will make sure there are only letters in a product's name
const LETTER_REGEX = /^[a-zA-Z]+$/;

const UpdateProductName = () => {
    const [oldName, setOldName] = useState('')
    const [newName, setNewName] = useState('')

    //Will be used to display error messages to the screen
    const errRef = useRef();
    const [errMsg, setErrMsg] = useState('');
    
    //Will be used to display the success message to the screen
    const successRef = useRef();
    const [successMsg, setSuccessMsg] = useState('');

    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const t1 = LETTER_REGEX.test(newName)

        if(!t1){
            setErrMsg("Invalid Name. Try again")
            return
        }

        try {
            const response = await axios.put(`/products/updateName`,
                JSON.stringify({ oldName, newName }),
                {
                    headers: { 'Content-Type': 'application/json' }
                }
            );
            setErrMsg('')
            setSuccessMsg('Update Successful')
            successRef.current.focus();
        } catch (err) {
            setSuccessMsg('')
            if (!err?.response) {
                setErrMsg('No Server Response');
            } 
            else if (err.response?.status === 409) {
                setErrMsg(`There is no product with the old name`);
            } 
            else if (err.response?.status === 410){
                setErrMsg(`There is already a product with the new name`);
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
                Select the product whose name you want to change, and then type 
                in the product's new name.
            </header>
            <Response errMsg={errMsg} errRef={errRef} successMsg={successMsg} successRef={successRef}/>
            <form onSubmit={handleSubmit}>
                <ProductNameList product={oldName} setProduct={setOldName}/>
                <hr/>
                <label>
                    New Name: <input 
                        type="text" 
                        name="new Name"
                        required 
                        value={newName} 
                        onChange={(e) => setNewName(e.target.value)}
                    />
                </label>
                <hr/>
                <button type="submit">Submit</button>
            </form>
            <hr/>
            <button onClick={() => navigate("/UpdateProducts")}>Back</button>
        </div>
    )
}

export default UpdateProductName