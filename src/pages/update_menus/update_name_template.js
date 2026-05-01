//Will generate a template for updating a person's name
import "../Page.css"
import { useState, useRef } from "react"
import { useNavigate } from "react-router-dom"
import axios from "../../api/axios"

//Will make sure there are only letters in a person's name
const LETTER_REGEX = /^[a-zA-Z]+$/;

const UpdateName = ({ person, prevPage }) => {
    const [oldFirstName, setOldFirstName] = useState('')
    const [oldLastName, setOldLastName] = useState('')
    const [newFirstName, setNewFirstName] = useState('')
    const [newLastName, setNewLastName] = useState('')

    //Will be used to display error messages to the screen
    const errRef = useRef();
    const [errMsg, setErrMsg] = useState('');
    
    let navigate = useNavigate();
    //The singular form of the type of person in the database getting renamed
    let singular = person.slice(0, person.length - 1)

    const handleSubmit = async (e) => {
        e.preventDefault();

        const t1 = LETTER_REGEX.test(newFirstName)
        const t2 = LETTER_REGEX.test(newLastName)

        if(!t1 || !t2){
            setErrMsg("There can be no numbers in the new name entries. Try again")
            return
        }

        try {
            const response = await axios.put(`/${person}/updateName`,
                JSON.stringify({ oldFirstName, oldLastName, newFirstName, newLastName }),
                {
                    headers: { 'Content-Type': 'application/json' }
                }
            );
            setErrMsg('')
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } 
            else if (err.response?.status === 409) {
                setErrMsg(`There is no ${singular} with the old name`);
            } 
            else if (err.response?.status === 410){
                setErrMsg(`There is already a ${singular} with the new name`);
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
                Type in the name of the {singular} you want to update below as well as 
                their updated name
            </header>
            <p 
                ref={errRef} 
                className={errMsg ? "errmsg" : "offscreen"} 
                aria-live="assertive"
            >
                {errMsg}
            </p>
            <form onSubmit={handleSubmit}>
                <label>
                    Old First Name: <input 
                        type="text" 
                        name="oldFirstName" 
                        placeholder="First Name" 
                        required
                        value={oldFirstName}
                        onChange={(e) => setOldFirstName(e.target.value)}
                    />
                </label>
                <hr/>
                <label>
                    Old Last Name: <input 
                        type="text" 
                        name="oldLastName" 
                        placeholder="Last Name" 
                        required 
                        value={oldLastName} 
                        onChange={(e) => setOldLastName(e.target.value)}
                    />
                </label>
                <hr/>
                <label>
                    New First Name: <input 
                        type="text" 
                        name="newFirstName" 
                        placeholder="First Name" 
                        required
                        value={newFirstName}
                        onChange={(e) => setNewFirstName(e.target.value)}
                    />
                </label>
                <hr/>
                <label>
                    New Last Name: <input 
                        type="text" 
                        name="newLastName" 
                        placeholder="Last Name" 
                        required 
                        value={newLastName} 
                        onChange={(e) => setNewLastName(e.target.value)}
                    />
                </label>
                <hr/>
                <button type="submit">Submit</button>
            </form>
            <br/>
            <button onClick={() => navigate(prevPage)}>Back</button>
        </div>
    )
}

export default UpdateName