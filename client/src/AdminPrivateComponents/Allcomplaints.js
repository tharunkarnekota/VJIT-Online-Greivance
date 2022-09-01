import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Header2 from './Header2'
import "./Video.css"
// import Videofile from "./road.mp4"
import { useParams,Link,Navigate } from 'react-router-dom';

const Allcomplaints = () => {
    const {id} = useParams()
    const [allcomp,setAllcomp] = useState([])
    const [x,setX] = useState(0);
    const [y,setY] = useState(0);

    const [numup,setNumup] = useState([])
    const [numving,setVing] = useState([])
    const [numvfied,setVfied] = useState([])
    const [numwithdraw,setnumWithdraw] = useState([])
    useEffect(() =>{
        axios.get(`http://localhost:5000/allconcerns/${id}`,{
            headers : {
                'x-token' : localStorage.getItem('token')
            }
        }).then(res => {
            console.log(res.data)
            setAllcomp(res.data);
            setVfied(res.data.filter(profile => profile.verified === "1"));
            setVing(res.data.filter(profile => profile.verifying === "1"));
            setnumWithdraw(res.data.filter(profile => profile.withdraw === "1"));
            setNumup(res.data);
            }) 

        axios.get('http://localhost:5000/adminprofile',{
            headers : {
                'x-token' : localStorage.getItem('token')
            }
        }).then(res => {
            if(res.data.concerndepartment === id){
                setX("1")
            }
            else if(res.data.concerndepartment === "higher authority" || res.data.concerndepartment === "Re-contacted"){
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

            <center>
                <h3 ><span style={{color:"#EEEF20"}}>Number of Total Complaints : </span><span style={{color:"red"}}>{numup.length }</span></h3>
                <h3 ><span style={{color:"white"}}>Number of Under processing Complaints : </span><span style={{color:"red"}}>{numup.length - numving.length - numwithdraw.length}</span></h3>
                <h3 ><span style={{color:"#EEEF20"}}>Number of verifying Complaints : </span><span style={{color:"red"}}>{numving.length - numvfied.length}</span></h3>
       
                <h3 ><span style={{color:"white"}}>Number of Verified Complaints : </span><span style={{color:"red"}}>{numvfied.length}</span></h3><br />
                <h3 ><span >Number of Withdraw Complaints : </span><span style={{color:"red"}}>{numwithdraw.length}</span></h3><br />

            </center>

                { x === "1" || y === "1" ?

                    <div>

                    <h1 style={{color:"#000000",textShadow:"2px 2px #ff0000",textAlign:"center"}}><b>-: Students Concerns :-</b></h1>

                    {
                        allcomp && 
                        <div className = "row" >
                        {allcomp.map( (profile,index) =>
                            <div className='col-md-4' key={index}>
                            <div className="profile card two" style={{margin : "10px"}}>
                                <center>
                                <h2 style={{color:"#FF206E"}}>{profile.fullname}</h2>
                                <h2>{profile.collegeId}</h2>
                                <p><b>Date : {profile.date.slice(0,10)}</b></p>
                                {!profile.withdraw ? (profile.verifying ? (profile.verified ? <div><p>Status : </p><h4 style={{color:"green"}}>Verified</h4></div> : <div><p>Status : </p><h4 style={{color:"#F4A261"}}>verifying</h4></div>) :  <div><p>Status : </p><h4 style={{color:"#F4A261"}}>under processing</h4></div>) :  <div><p>Status : </p><h4 style={{color:"red"}}>Withdraw</h4></div>}

                                {/* {profile.verifying ? (profile.verified ? <div><p>Status : </p><h4 style={{color:"green"}}>Verified</h4></div> : <div><p>Status : </p><h4 style={{color:"#F4A261"}}>verifying</h4></div>) :  <div><p>Status : </p><h4 style={{color:"#F4A261"}}>under processing</h4></div>} */}
                                {/* <h3>{profile.uderprocessing ? <h2>kssshkhs</h2> : <h2>under processing</h2>}</h3> */}
                                <Link to={`/indcompliment2/${profile._id}`} className='btn btn-primary' style={{width:"100px"}}>View</Link><br /><br />
                                </center>
                            </div>
                            </div>
                            )}
                        </div>
                    }

                    <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />

                    </div>

                    :

                    <div>
                        <br /><br />
                        <center>
                        <h2 style={{color:"red"}}><b>Sorry , You are not allowed to view this information</b></h2>
                        <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />       

                        </center>
                    </div> }
  </div>
  )
};

export default Allcomplaints;
