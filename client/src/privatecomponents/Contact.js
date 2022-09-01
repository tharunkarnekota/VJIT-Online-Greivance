import React,{ useState} from 'react';
import "./Video.css"
// import Videofile from "./road.mp4"
import Header from './Header';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import "./Contact.css"

const Contact = () => {
    
    const [data,setData] = useState({
        fullname : '',
        problem : ''
    })

    const {fullname,problem} = data;

    const changeHandler = e =>{
        setData({...data,[e.target.name]:e.target.value});  
    }

    const submitHandler = e =>{
        e.preventDefault();
        if(fullname && problem ) {
                axios.post("http://localhost:5000/addcontact",data,{
                    headers : {
                        'x-token' : localStorage.getItem('token')
                    }
                    }).then(
                        res => alert(res.data)
                    )
                setData({...data,problem:''});

                
        }
        else{
            alert("Invalid information ")
        }
    }

    if(!localStorage.getItem('token')){
        return <Navigate to='/login' />
    }

   
  return (
  <div className='con2'>
      <Header />
        
        <center>
            <br />
            <h1 style={{color:"#E55934",textShadow:"2px 2px #000000",fontFamily:"cursive"}}><b>CONTACT FORM :</b></h1><br />
        <div className='container card profile' style={{width:"75%",fontFamily: "Teko",fontSize:"20px",background: "rgba(255,255,255,0.7)"}}>
                    
                        <center>
                            <br />
                        <img 
                            className="round-img"
                            src="http://cdn.onlinewebfonts.com/svg/img_504923.png"
                            height="250" width="250"
                            alt="pix" style={{borderRadius:"10px"}} 
                        /><br /><br />
                        </center>
                    <form onSubmit={submitHandler} autoComplete='off' >
                        <h3 style={{margin:"10px 0 0 0"}} className='fantasyy'>Your Name : </h3>
                        <input type="text"  name="fullname" className='mobile' value={fullname} placeholder='Name' onChange={changeHandler}></input>
                        <h3 style={{margin:"20px 0 0 0"}} className='fantasyy'>Your problem : </h3>
                        <div className="form-group green-border-focus widthta">
                            <textarea className="form-control" id="exampleFormControlTextarea5"  rows="3" value={problem} name="problem" onChange={changeHandler} placeholder="problem around 50 words"></textarea>
                        </div>
                        
                        <br /><br />
                        <input type="submit" value="submit" className="btn btn-success" /><br /><br />
                    </form>
                    
                </div>
                <br /><br />
                </center>
  </div>
  )
};

export default Contact;
