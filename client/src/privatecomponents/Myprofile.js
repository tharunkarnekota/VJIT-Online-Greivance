import React, { useState,useEffect } from 'react'
import { Link, Navigate } from 'react-router-dom'
import Header from './Header'
import "./Video.css"
// import Videofile from "./road.mp4"
import "./Myprofile.css"

import axios from 'axios'

const Myprofile = () => {
    const [myprof,setMyprof] = useState(null)

    const [concerndata,setConcerndata] = useState([])
    
    useEffect(() =>{
        axios.get('http://localhost:5000/myprofile',{
            headers : {
                'x-token' : localStorage.getItem('token')
            }
        }).then(res => setMyprof(res.data)) 

        axios.get('http://localhost:5000/getconcern',{
            headers : {
                'x-token' : localStorage.getItem('token')
            }
        }).then(res => setConcerndata(res.data)) 
    },[])

    if(!localStorage.getItem('token')){
        return <Navigate to='/login' />
    }

    return (
        <div className='con2'>
            <Header />
            
            {
                myprof &&
                 
                <div className='container card profile' style={{width:"70%",background: "rgba(255,255,255,0.4)",fontFamily:"Teko"}}>
                    
                    <center>
                        <br />
                    <img 
                            className="round-img"
                            src="https://cdn2.iconfinder.com/data/icons/user-23/512/User_Generic_1.png"
                            height="150" width="200"
                            alt="userPhoto"
                        />
                        <br />
                    
                    {/* <div className="flex-container" >
                    <div className='flex-item-left2'>
                        <h4>Name :  </h4>
                        <h4>CollegeId : </h4>
                        <h4>Branch : </h4>
                        <h4>Mobile : </h4>  
                        <h4>Email : </h4>
                            
                    </div>
                    <div className='flex-item-right2'>
                            <h4>{myprof.fullname} </h4>
                            <h4>{myprof.collegeId} </h4>
                            <h4>{myprof.branch} </h4>
                            <h4>{myprof.mobile}</h4>
                            <h4>{myprof.email}</h4>
                    </div>
                    </div> */}

                    <center>
                    <div >
                        <h4><b>Name : </b> {myprof.fullname}</h4>
                        <h4><b>CollegeId : </b> {myprof.collegeId}</h4>
                        <h4><b>Branch : </b> {myprof.branch}</h4>
                        <h4><b>Mobile : </b> {myprof.mobile}</h4>
                        <h4><b>Email :  </b> {myprof.email}</h4>
                       
                    </div> 
                    </center>
                    

                    <br /><br />

                    <h1 style={{color:"green"}}>-: Your Concerns :-</h1>

                    {
                        concerndata.length >= 1 ?
                        
                        <div className="row" >
                        {concerndata.map( (profile,index) =>
                            <div className='col-md-4' key={index}>
                            <div className="profile card two" style={{margin : "10px",fontFamily: "Teko"}} >
                                <center>
                                <h2 style={{color:"#FF206E"}}><b>{profile.concerndepartment}</b></h2>
                                <p><b>Date : {profile.date.slice(0,10)}</b></p>
                                {!profile.withdraw ? (profile.verifying ? (profile.verified ? <div><p>Status : </p><h4 style={{color:"green"}}>Verified</h4></div> : <div><p>Status : </p><h4 style={{color:"#F4A261"}}>verifying</h4></div>) :  <div><p>Status : </p><h4 style={{color:"#F4A261"}}>under processing</h4></div>) :  <div><p>Status : </p><h4 style={{color:"red"}}>Withdraw</h4></div>}

                                {/* {profile.verifying ? (profile.verified ? <div><p>Status : </p><h4 style={{color:"green"}}>Verified</h4></div> : <div><p>Status : </p><h4 style={{color:"#F4A261"}}>verifying</h4></div>) :  <div><p>Status : </p><h4 style={{color:"#F4A261"}}>under processing</h4></div>} */}
                                {/* <h3>{profile.uderprocessing ? <h2>kssshkhs</h2> : <h2>under processing</h2>}</h3> */}
                                <Link to={`/indcompliment/${profile._id}`} className='btn btn-primary' style={{width:"100px"}}>View</Link><br /><br />
                                </center>
                            </div>
                            </div>
                            )
                        }
                        </div>
                        
                        :

                        <h1>No Concerns Yet</h1>
                        
                    }
                    
                    </center> 
                </div>
               
            }
            <br /><br /><br /><br /><br /><br /><br /><br /><br />
        </div>
    )
}

export default Myprofile
