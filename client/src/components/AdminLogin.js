import React,{useState} from 'react'
import { Link,Navigate } from 'react-router-dom'
import axios from 'axios'

const AdminLogin = () => {
    const [auth,setAuth] = useState(false)
    const [data,seData] = useState({
        email : '',
        password : '',
    })
    const {email,password} = data
    const changeHandler = e =>{
        seData({...data,[e.target.name]:e.target.value})
    }
    const submitHandler = e =>{
        e.preventDefault();
        if(email && password){
            axios.post('http://localhost:5000/adminlogin',data).then(
            res => { 
                if(res.data.token)
                    {
                        localStorage.setItem('token',res.data.token);
                        setAuth(true)
                    }
                else{
                        alert(res.data);
                }}
            )
        }
        else{
            alert("Invalid input")
        }
        
        
    }
    

    if(auth){
        return <Navigate to='/admindashboard' />
    }

    return (
        <div className='con'>
            
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
                <h1 className="large " style={{"color":"orange","marginTop":"100px"}} >Admin Sign In</h1>
                <p className="lead"><b>Sign into Your Account</b></p>
                <form onSubmit={submitHandler} autoComplete="off">
                    <input className="form-control-lg m-1 border mobile2" style={{"float":"left" }} type="email"    placeholder="Enter email"    name="email" value={email}   onChange={changeHandler} /><br /><br />
                    <input className="form-control-lg m-1 border mobile2" style={{"float":"left" }} type="password" placeholder="Enter password" name="password" value={password} onChange={changeHandler} /><br /><br /><br />
                    <input type="submit" className="btn btn-primary" value="login" />
                </form>
                <p>
                    Don't know password? <Link to="/forgetpassword">Forget Password</Link>
                </p>
                
            </section>
        </div>
    )
}

export default AdminLogin
