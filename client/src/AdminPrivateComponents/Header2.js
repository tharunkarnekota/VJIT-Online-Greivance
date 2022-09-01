import React from 'react'
import { NavLink } from 'react-router-dom'
import bgvjit from "./bgvjit.jpeg"



const Header = () => {
    return (
        <nav className="navbar bg-dark justify-content-center" style={{backgroundColor:"grey"}}>

<img src={bgvjit}  width="13%" height="89%" alt="vjit" style={{marginRight :"20%",marginLeft:"-24%"}} />

            <li className="nav-link ">
                <NavLink to="/Admindashboard" className="nav-link" style={({ isActive }) => ({ color: isActive ? 'orange' : 'white' })}>
                   Dashboard
                </NavLink>
            </li>

            <li className="nav-link ">
                <NavLink to="/adminprofile" className="nav-link" style={({ isActive }) => ({ color: isActive ? 'orange' : 'white' })}>
                    My Profile
                </NavLink>
            </li>

            
            <li className="nav-link">
                <NavLink to="/login" onClick={()=>localStorage.clear()} style={({ isActive }) => ({ color: isActive ? 'orange' : 'white' })}>
                    Logout
                </NavLink>
            </li>

        </nav>
    )
}

export default Header
