import axios from 'axios'
import React, { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'

const Resetpassword = () => {
    const [code,setCode] = useState("")
    const [auth,setAuth] = useState(false)
    const [password,setPassword] = useState("");
    const [confirmpassword,setConfirmpassword] = useState("")

    const submitHandler = e =>{
        e.preventDefault();
        console.log(code)
        if(password === confirmpassword ){
            if(code.length===40){
                if(password.length >= 6){
                    axios.post(`http://localhost:5000/resetpassword/${code}`,{password:password,confirmpassword:confirmpassword}).then(
                    res => {
                        alert(res.data)
                        setAuth(true)
                    }
                )
                }
                else{
                    alert("password should minimum 6 characters")
                }
            }
            else{
                alert("Invalid code")
            }
            
        }
        else{
            alert("password and confirm password doesnt match")
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
                <h1 className="large " style={{"color":"orange","marginTop":"100px"}} >Reset password</h1>
                <h5><b>Note :</b>Do check spam in your mail once if you have not received password reset mail</h5>
                <p className="lead"><b>Verify your code:</b></p>
                <form onSubmit={submitHandler}>
                    <input className="form-control-lg m-1 border" style={{width:"40%"}} type="text"    placeholder="Enter code received in your mail"    name="code" value={code}   onChange={ e => setCode(e.target.value) } /><br /><br />
                    <p className="lead"><b>Change Password:</b></p>
                    <input className="form-control-lg m-1 border" style={{width:"40%"}} type="text"    placeholder="Enter new password"    name="password" value={password}   onChange={ e => setPassword(e.target.value) } /><br /><br />
                    <input className="form-control-lg m-1 border" style={{width:"40%"}} type="text"    placeholder="Enter new confirm password"    name="confirmpassword" value={confirmpassword}   onChange={ e => setConfirmpassword(e.target.value) } /><br /><br />

                    <input type="submit" className="btn btn-primary" value="Reset" />
                </form>
                <p>
                    Don't received mail? <Link to="/forgetpassword">Resend mail</Link>
                </p>
            </section>

        </div>
    )
}

export default Resetpassword
