//Will generate a menu for updating a product's type
import ProductNameList from "../../../templates/get_all_product_names";
import TypeList from "../../../templates/type_list";
import "../../Page.css"
import Response from "../../../templates/response"
import { useNavigate } from "react-router-dom"
import { useState, useRef } from "react";
import axios from "../../../api/axios";

const UpdateType = () => {
    const [name, setName] = useState('')
    const [newType, setNewType] = useState('')

    //Will be used to display error messages to the screen
    const errRef = useRef();
    const [errMsg, setErrMsg] = useState('');
    
    //Will be used to display the success message to the screen
    const successRef = useRef();
    const [successMsg, setSuccessMsg] = useState('');

    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
            
        try {
            const response = await axios.put('/products/updateType',
                JSON.stringify({ name, newType }),
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
            else {
                setErrMsg('Registration Failed')
            }
            errRef.current.focus();
        }
    }

    return(
        <div>
            <header className="header">
                Select the product whose type you want to change, as well as its new type.
            </header>
            <Response errMsg={errMsg} errRef={errRef} successMsg={successMsg} successRef={successRef}/>
            <form onSubmit={handleSubmit}>
                <ProductNameList product={name} setProduct={setName}/>
                <hr/>
                <TypeList type={newType} setType={setNewType}/>
                <hr/>
                <button type="submit">Submit</button>
            </form>
            <hr/>
            <button onClick={() => navigate("/UpdateProducts")}>Back</button>
        </div>
    )
}

export default UpdateType