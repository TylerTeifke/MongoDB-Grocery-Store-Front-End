//Will create a response based on the user's input that will be used for most pages

const Response = ({ errMsg, errRef, successMsg, successRef }) => {

    return(
        <div>
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
        </div>
    )
}

export default Response