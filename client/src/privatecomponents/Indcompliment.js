import React,{useEffect, useState} from 'react';
import "./Video.css"
// import Videofile from "./road.mp4"
import Header from './Header';
import { useParams,Navigate } from 'react-router-dom';
import axios from 'axios';
import "./Myprofile.css"
import "./Ind.css"

const Indcompliment = () => {
    const [spconcern,setSpconcern] = useState(null)
    const [w,setW] = useState(0);
    const [x,setX] = useState(0);
    const [reason,setReason] = useState("");
    const {id} = useParams()

    const whandler = () =>{
        if(w===1){
            setW(0);
            setX(0);
        }
        if(w===0){
            setW(1);
            setX(0);
        }
    }

    const xhandler = () =>{
        if(x===1){
            setX(0);
        }
        if(x===0){
            setX(1);
        }
    }

    const yeshandler = () =>{
       
        if(reason.length >= 15){
            axios.put(`http://localhost:5000/withdraw/${id}`,{reason:reason},{
                headers : {
                    'x-token' : localStorage.getItem('token')
                }
            }).then(res => {
            alert(res.data.message);
            // setSpconcern(res.data.update);
            setSpconcern(res.data.specific)
            setW(0);
            setX(0);
                         
                }) 
        }
        else{
            alert("write atleast 5 words of reason to accept")
        }
        
    }

    useEffect(()=>{
        axios.get(`http://localhost:5000/getspecificconcern/${id}`,{
            headers : {
                'x-token' : localStorage.getItem('token')
            }
        }).then(res => setSpconcern(res.data)) 
    },[id])

    if(!localStorage.getItem('token')){
        return <Navigate to='/login' />
    }

  return (
  <div className='con2'>
        <Header />
        
        { spconcern &&
        <div>
        <center>
            <br />
            <h1 style={{color:"#000000",textShadow:"2px 2px #ff0000",fontFamily:"cursive"}}><b>MY CONCERN :</b></h1>
        <div className='container card bg-light profile ' style={{marginTop:"20px"}}>         
            

            {/* <div className="flex-container" >
                    <div className='flex-item-left2'>
                        <h4>Student Name :  </h4>
                        <h4>Date : </h4>
                        <h4>Concern Department : </h4>
                        <h4>Complainee Info : </h4>
                        <h4>My concern Info : </h4>      
                    </div>
                    <div className='flex-item-right2'>
                            <h4>{spconcern.fullname} </h4>
                            <h4>{spconcern.date.slice(0,10)} </h4>
                            <h4>{spconcern.concerndepartment} </h4>
                            <h4>{spconcern.HarassedPersonDetails}</h4>
                            <h4>{spconcern.concern}</h4>
                    </div>
            </div> */}
                    <center>
                    <div >
                        <h4><b ><b style={{color:"#D62828"}}>Student Name : </b></b><span >{spconcern.fullname} </span></h4>
                        <h4><b ><b style={{color:"#D62828"}}>Date : </b></b>
                        {spconcern.date ? new Date(spconcern.date).toLocaleString() :"-"}</h4>
                        <h4><b ><b style={{color:"#D62828"}}>Concern Department : </b></b><span >{spconcern.concerndepartment}</span></h4><br /><br />
                        <h4><b ><b style={{color:"#D62828"}}>Complainee Info : </b></b><span >{spconcern.HarassedPersonDetails}</span> </h4>
                        {spconcern.concernpic ? <div><img 
                                                                        className="round-img"
                                                                        src={spconcern.concernpic}
                                                                        height="50%" width="50%"
                                                                        alt="userPhoto"
                                                                    /><br /><br /></div> : null}
                        <h4 style={{whiteSpace : "pre-line",color:"#D62828"}}><b ><b>My concern Info : </b></b><span style={{color:"#2196F3",textShadow:"1px 1px #000000"}} >{spconcern.concern}</span></h4>      
                    </div>
                    </center>
            <br />
            
            <h4 className='mt-4'><b>Status : </b></h4>


            {spconcern.withdraw ? 
            <div>
                <h3 style={{color:"green"}}>Withdraw</h3>
                <h5><b>Reason: </b>{spconcern.reason}</h5>
            </div>
            :
            <div>
            {spconcern.verifying ? (spconcern.verified ? <div>
                                                            
                                                            <h4 className='three mb-5'>Verified</h4>
                                                            {spconcern.report && <div><h4 style={{whiteSpace : "pre-line"}} ><b style={{color:"red"}}>Report : </b>{spconcern.report}</h4><br /></div>}
                                                            {spconcern.pic ? <div><img 
                                                                        className="round-img"
                                                                        src={spconcern.pic}
                                                                        height="50%" width="50%"
                                                                        alt="userPhoto"
                                                                    /><br /><br /></div>:<h5 style={{color:"red"}}>No Pic uploaded</h5>}
                                                        </div> 
                                                        : 
                                                        <div>
                                                            
                                                            <h4 className='three'>verifying</h4>
                                                        </div>
                                    ) 
                                    :  
                                    <div>
                                        
                                        <h4 className='three'>Under processing</h4>
                                    </div>
            }
            

            {
                !spconcern.verifying ? 
                <div>
                    <br /><br /><br />
                    <button className='btn btn-danger' onClick={() => whandler()}>withdraw</button>
                    <br /><br />
                    {w ? <div><h3><b>Reason :</b></h3>
                    <textarea className='textareaa' placeholder="Enter your Reason for withdraw" onChange={(e)=> setReason(e.target.value)}  rows="3" cols="50">                       
                    </textarea>
                    <br />
                    <button className='btn btn-primary' onClick={() => xhandler()}>submit</button><br />
                    {x ? <div>
                        <p>Are you sure want to withdaw</p>
                        <button className='btn btn-success' onClick={() => yeshandler()}>yes</button> &nbsp;&nbsp; <button className='btn btn-success' onClick={() => xhandler()}>no</button>
                        </div> : null}
                    <br /></div>:null}
                </div>:null
            }

            </div>
            }




                    
        </div>
        <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
        </center>
        </div>
       }

  </div>
  )
}

export default Indcompliment;
