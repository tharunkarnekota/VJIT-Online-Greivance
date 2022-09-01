import React from 'react'
import { Link } from 'react-router-dom'
import './Home.css'

import Logo from './Logo'

const Home = () => {
    return (
        <div className="bg">
            {/* <center> */}

                <Logo />
                
                {/* <nav className="navbar bg-dark justify-content-left">
                    <h1 style={{"marginLeft":"5px"}}>
                        <Link to='/'>VJIT Linkedin</Link>
                    </h1>
                    <div className="justify-content-left" >
                        <h5 >
                            <Link to="/register" className="btn btn-secondary" style={{margin:"12px"}}>Register</Link>
                            <Link to="/login" className="btn btn-secondary" >Login</Link>&nbsp;&nbsp;
                        </h5>
                    </div>
                </nav> */}
                {/* <section  style={{"marginTop":"170px"}}> */}
                    <div className="home-position">
                        <h1 className="heading" style={{color:"#FB8500"}}><b>Online Grievance</b></h1>
                        <p className="caption">
                            Create your Profile and sort your problems
                        </p>
                        
                        <Link to='/register' className="btn2 btn btn-primary">Signup</Link>&nbsp;&nbsp;&nbsp;
                        <Link to='/login' className="btn1 btn btn-success">SignIn</Link>&nbsp;&nbsp;&nbsp;
                        <Link to='/adminlogin' className="btn1 btn btn-info">Admin</Link>
                    </div>
                {/* </section> */}
            {/* </center> */}
        </div>
        
    )
}

export default Home