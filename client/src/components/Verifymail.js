import axios from 'axios'
import React, { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'

const Resetpassword = () => {
    const [code,setCode] = useState("")
    const [auth,setAuth] = useState(false)
    

    const submitHandler = e =>{
        e.preventDefault();
        console.log(code)
            if(code.length===40){
                
                    axios.post(`http://localhost:5000/resetpassword/${code}`).then(
                    res => {
                        alert(res.data)
                        setAuth(true)
                    }
                )
            }
            else{
                alert("Invalid code")
            }
        
        setCode("")
        
    }

    if(auth){
        return <Navigate to='/login' />
    }
    return (
        <div>
            
            <nav className="navbar bg-dark justify-content-left">
            <h1 style={{"marginLeft":"5px"}}>
                <Link to='/'>Online Grievance</Link>
            </h1> 
            <div className="justify-content-left" >
                <h5 >
                    <Link to="/register" className="btn btn-secondary" style={{margin:"12px"}}>Register</Link>
                    <Link to="/login" className="btn btn-secondary" >Login</Link>&nbsp;&nbsp;
                </h5>
            </div>
            
        </nav>
            
            <section className="container">
                <h1 className="large " style={{"color":"orange","marginTop":"100px"}} > Email Verification </h1>
                <p className="lead"><b>Verify your code:</b></p>
                <form onSubmit={submitHandler}>
                    <input className="form-control-lg m-1 border" style={{width:"40%"}} type="text"    placeholder="Enter code received in your mail"    name="code" value={code}   onChange={ e => setCode(e.target.value) } /><br /><br />
                    <input type="submit" className="btn btn-primary" value="verify" />
                </form>
                <p>
                    Don't received mail? <Link to="/register">Resend mail</Link>
                </p>
            </section>

        </div>
    )
}

export default Resetpassword
