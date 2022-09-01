import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Header2 from './Header2'
import "./Video.css"
// import Videofile from "./road.mp4"
import { Navigate } from 'react-router-dom';
import "./Bg.css"


const Adminprofile = () => {
    const [myprof,setMyprof] = useState(null)
    useEffect(() =>{
        axios.get('http://localhost:5000/adminprofile',{
            headers : {
                'x-token' : localStorage.getItem('token')
            }
        }).then(res => setMyprof(res.data)) 
    },[])

    if(!localStorage.getItem('token')){
        return <Navigate to='/login' />
    }

  return (
  <div className='con2'>
      <Header2 />
            
            {
                myprof &&
                
                <div className='container card profile' style={{width:"70%",background: "rgba(255,255,255,0.6)",fontFamily:"Teko"}}>
                    
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
                        <h4>Dept : </h4>
                        <h4>Branch : </h4>
                        <h4>Mobile : </h4>  
                        <h4>Email : </h4>
                            
                    </div>
                    <div className='flex-item-right2'>
                            <h4>{myprof.inchargename} </h4>
                            <h4>{myprof.concerndepartment} </h4>
                            <h4>{myprof.branch} </h4>
                            <h4>{myprof.mobile}</h4>
                            <h4>{myprof.email}</h4>
                            
                    </div>
                    </div> */}

                    <center>
                        <div>
                        <h4><b style={{color:"#D62828"}}>Name :  </b>{myprof.inchargename} </h4>
                        <h4><b style={{color:"#D62828"}}>Dept : </b>{myprof.concerndepartment}</h4>
                        <h4><b style={{color:"#D62828"}}>Branch : </b>{myprof.branch}</h4>
                        <h4><b style={{color:"#D62828"}}>Mobile : </b>{myprof.mobile}</h4>  
                        <h4><b style={{color:"#D62828"}}>Email : </b>{myprof.email}</h4>
                        </div>
                    </center>

                    

                    </center>

                </div>
                

                

            }
          <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />       

  </div>
  )
};

export default Adminprofile;
