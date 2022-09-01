import React, { useState,useEffect } from 'react'
import { Link,Navigate } from 'react-router-dom'
import Header2 from './Header2'
// import Department from "./Department.json"
import "./Dashboard.css"
import "./Video.css"
// import Videofile from "./road.mp4"
import axios from 'axios'

const Admindashboard = () => {
    const [department,setDepartment] = useState([])
    const [department2,setDepartment2] = useState([])

    useEffect(() =>{
        axios.get('http://localhost:5000/alladmins',{
            headers : {
                'x-token' : localStorage.getItem('token')
            }
        }).then(res => setDepartment(res.data.filter(profile => profile.concerndepartment!=="higher authority" && profile.concerndepartment!=="Re-contacted"))) 

        axios.get('http://localhost:5000/alladmins',{
            headers : {
                'x-token' : localStorage.getItem('token')
            }
        }).then(res => setDepartment2(res.data.filter(profile => profile.concerndepartment==="Re-contacted")))
    },[])

    if(!localStorage.getItem('token')){ 
        return <Navigate to='/login' />
    }

    
    return (
        <div className='con2'>
            <Header2 />
            
            <div className='container'>
            { department ? 
                     department.map( (profile,index) => 
                        <div className="flex-container" style={{"margin":"10px"}} key={index}>
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
                                <h2 style={{"color":"green"}}><b>{profile.concerndepartment}</b></h2>
                                <p style={{fontSize:"20px"}}><b>Incharge : </b>{profile.inchargename}</p>
                                <Link to={`/allcomplaints/${profile.concerndepartment}`} className='btn btn-primary'>View Complaints</Link>
                            </div>
                        </div>
                        )
                    : null}

                { department2 ? 
                     department2.map( (profile,index) => 
                        <div className="flex-container" style={{"margin":"10px"}} key={index}>
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
                                <h2 style={{"color":"green"}}><b>{profile.concerndepartment}</b></h2>
                                <p style={{fontSize:"20px"}}><b>Incharge : </b>{profile.inchargename}</p>
                                <Link to={`/allproblems/${profile.concerndepartment}`} className='btn btn-primary'>View problems</Link>
                            </div>
                            
                        </div>
                        )
                    : null}
                
                <br /><br />
                    
            </div>
        </div>
    )
}

export default Admindashboard
