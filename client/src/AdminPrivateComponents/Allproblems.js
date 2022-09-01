import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Header2 from './Header2'
import "./Video.css"
// import Videofile from "./road.mp4"
import { useParams,Navigate } from 'react-router-dom';

const Allproblems = () => {
    const {id} = useParams()
    const [allcomp,setAllcomp] = useState([])
  
    const [y,setY] = useState(0);
    useEffect(() =>{
        axios.get(`http://localhost:5000/getcontact`,{
            headers : {
                'x-token' : localStorage.getItem('token')
            }
        }).then(res => setAllcomp(res.data)) 

        axios.get('http://localhost:5000/adminprofile',{
            headers : {
                'x-token' : localStorage.getItem('token')
            }
        }).then(res => {
            if(res.data.concerndepartment === "higher authority" || res.data.concerndepartment === "Re-contacted"){
                setY("1")
            }
        })
    },[id])

    if(!localStorage.getItem('token')){
        return <Navigate to='/login' />
    }

  return (
  <div className='con2'>
       <Header2 />
            
      
            <br /><br />

                { y === "1" ?

                    <div>

                <center><h1 style={{color:"#06D6A0",textShadow:"2px 2px #ff0000",fontFamily:"cursive"}}><b>STUDENT CONCERN :</b></h1></center>

                    {
                        allcomp && 
                        <div className = "row" >
                        {allcomp.map( (profile,index) =>
                            <div className='col-md-4' key={index}>
                            <div className="profile card two" style={{margin : "10px"}}>
                                <center>
                                <h2 style={{color:"#FF206E"}}>{profile.fullname}</h2>
                                <h2>{profile.collegeId}</h2>
                                <p><b>Mobile : {profile.mobile}</b></p>
                                <p><b>Date : {profile.date.slice(0,10)}</b></p>
                                <pre><b style={{color:"red"}}>Problem : </b>{profile.problem}</pre>
                                <br /><br />
                                </center>
                            </div>
                            </div>
                            )}
                        </div>
                    }

<br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />

                    </div>

                    :

                    <div>
                        <br /><br />
                        <center>
                        <h2 style={{color:"red"}}>Sorry , You are not allowed to view this informtion</h2>
                        <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />  

                        </center>
                    </div> }
  </div>
  )
};

export default Allproblems;
