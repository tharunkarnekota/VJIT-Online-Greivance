import React, { useState,useEffect } from 'react'
import { Link,Navigate } from 'react-router-dom'
import Header from './Header'
import "./Dashboard.css"
import "./Video.css"
// import Videofile from "./road.mp4"
import axios from 'axios'
import Logo from '../components/Logo2'

const Dashboard = () => {
    const [department,setDepartment] = useState([])

    useEffect(() =>{
        axios.get('http://localhost:5000/alladmins',{
            headers : {
                'x-token' : localStorage.getItem('token')
            }
        }).then(res => setDepartment(res.data.filter(profile => profile.concerndepartment!=="higher authority" && profile.concerndepartment!=="Re-contacted"))) 

       
       
    },[])

    if(!localStorage.getItem('token')){
        return <Navigate to='/login' />
    }

    
    return (
        <div className='con2'>
            {/* <Logo /> */}
            <Header />
            
            <div className='container'>
            { department ? 
                     department.map( (profile,index) => 
                        <div className="flex-container" style={{"margin":"10px"}} key={index} >
                            <div className='flex-item-left'>
                                <img
                                    className="round-img"
                                    src={profile.pic}
                                    height="150" width="300"
                                    alt="userPhoto"
                                    style={{borderRadius:"10px"}}
                                />
                            </div>
                            <div className='flex-item-right'>
                                <h2 style={{"color":"green"}} ><b>{profile.concerndepartment}</b></h2>
                                <p style={{fontSize:"20px"}}><b>Incharge : </b>{profile.inchargename}</p>
                                <Link to={`/indprofile/${profile.concerndepartment}`} className='btn btn-primary'>Complaint</Link>
                            </div>
                            
                        
                        </div>
                        )
                    : null}
                    <br /><br /><br /><br /><br /><br />
            </div>
        </div>
    )
}

export default Dashboard
