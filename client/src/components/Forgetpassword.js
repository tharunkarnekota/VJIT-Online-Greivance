import axios from 'axios'
import React, { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'

const Forgetpassword = () => {
    const [email,setEmail] = useState("")
    const [auth,setAuth] = useState(false)

    const submitHandler = e =>{
        e.preventDefault();
        if(email){
            axios.post("http://localhost:5000/forgetpassword",{email:email}).then(
                res => 
                {
                    
                    if(res.data !== "user not found"){
                        console.log(res.data.message)
                        setAuth(true)
                    }
                    else{
                        console.log(res.data)
                    }
                }
            )
        }
        else{
            alert("Invalid info")
        }
        setEmail("")
    }

    if(auth){
        return <Navigate to='/resetpassword' />
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
                <h1 className="large " style={{"color":"orange","marginTop":"100px"}} >Forget password</h1>
                <p className="lead"><b>Verify your mail</b></p>
                <form onSubmit={submitHandler}>
                    <input className="form-control-lg m-1 border" style={{width:"40%"}} type="email"    placeholder="Enter email"    name="email" value={email}   onChange={ e => setEmail(e.target.value) } /><br /><br />
                    <input type="submit" className="btn btn-primary" value="Send" />
                </form>
                <p>
                    Don't have any account? <Link to="/register">Sign Up</Link>
                </p>
            </section>

        </div>
    )
}

export default Forgetpassword
