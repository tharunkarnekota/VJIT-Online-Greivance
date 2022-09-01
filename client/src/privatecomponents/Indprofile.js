import React,{useEffect, useState} from 'react';
import "./Video.css"
// import Videofile from "./road.mp4"
import Header from './Header';
import { useParams,Navigate } from 'react-router-dom';
import axios from 'axios';

const Indprofile = () => {
    const [selectedFiles,setSelectedfiles] = useState([])
    const [admindata,setAdmindata] = useState(null);
    const {id} = useParams()

    const [data,setData] = useState({
        fullname : '',
        concern : '',
        Hperson : "",
        concerndepartment : ''
    })

    const {fullname,Hperson,concern} = data;


    const changeHandler = e =>{
        setData({...data,[e.target.name]:e.target.value,concerndepartment:id});  
    }

    const fileHandler = (e) =>{
        // console.log(e);
        console.log(e.target.files);
        // this.setState({selectedFiles:e.target.files})
        setSelectedfiles(e.target.files)
    }

    const submitHandler = e =>{
        e.preventDefault();

        if(fullname && concern && Hperson && selectedFiles.length>=1 ){

            for(let i=0;i<selectedFiles.length;i++){
                let formData = new FormData()
                formData.append('file',selectedFiles[i]);
                formData.append('upload_preset','bvfppdbk');
                axios.post('https://api.cloudinary.com/v1_1/drnndbow7/image/upload',formData).then(res =>{
                  
                    axios.post("http://localhost:5000/addconcern2",{fullname,concern,Hperson,concerndepartment:id,concernpic:res.data.url},{
                        headers : {
                        'x-token' : localStorage.getItem('token')
                    }
                    }).then(res =>{ console.log(res.data) ;
                                    alert("Successfully response submitted");
                  
                })
            })    
            }


            axios.post("http://localhost:5000/sendmailadmin",{concern:concern,Hperson:Hperson,email:admindata[0].email},{
                headers : {
                    'x-token' : localStorage.getItem('token')
                }
                }).then(
                    res => {console.log(res.data);
                            console.log("hiii");
                            setData({...data,concerndepartment:'',concern:'',Hperson:''});
                    }
                )
        }





        else if(fullname && concern && Hperson ) {
                axios.post("http://localhost:5000/addconcern",data,{
                    headers : {
                        'x-token' : localStorage.getItem('token')
                    }
                    }).then(
                        res => alert(res.data)
                    )
                

                axios.post("http://localhost:5000/sendmailadmin",{concern:concern,Hperson:Hperson,email:admindata[0].email},{
                    headers : {
                        'x-token' : localStorage.getItem('token')
                    }
                    }).then(
                        res => {console.log(res.data);
                                console.log("hiii");
                                setData({...data,concerndepartment:'',concern:'',Hperson:''});
                        }
                    )

                
        }
        else{
            alert("Invalid information ")
        }
    }


    useEffect(()=>{
        axios.get('http://localhost:5000/alladmins',{
            headers : {
                'x-token' : localStorage.getItem('token')
            }
        }).then(res => setAdmindata(res.data.filter(profile => profile.concerndepartment===id)))
    },[id])

    if(!localStorage.getItem('token')){
        return <Navigate to='/login' />
    }

  return (
  <div className='con2'>
      <Header />
        
        <center>
            <br />
            <h1 style={{color:"#E55934",textShadow:"2px 2px #000000",fontFamily:"cursive"}}><b>COMPLAINT FORM :</b></h1><br />
        <div className='container card profile' style={{width:"75%",fontFamily: "Teko",fontSize:"20px",background: "rgba(255,255,255,0.7)"}}>
                    
                        <center>
                            <br />
                        <img 
                            className="round-img"
                            src="https://www.vkeel.com/blog/wp-content/uploads/2020/10/private-complaint.jpg"
                            height="250" width="250"
                            alt="pix" style={{borderRadius:"10px"}} 
                        /><br /><br />
                        </center>
                    <form onSubmit={submitHandler} autoComplete='off'>
                        <h3 style={{margin:"10px 0 0 0"}} className='fantasyy'>Your Name : </h3>
                        <input type="text" name="fullname" className='mobile' value={fullname} placeholder='Name' onChange={changeHandler}></input>
                        <h5 style={{margin:"20px 0 0 0"}} className='fantasyy'>complainee /organisation details : </h5>
                        <input type="text" name="Hperson" className='mobile' value={Hperson} placeholder='Details' onChange={changeHandler}></input>
                        <h3 style={{margin:"20px 0 0 0"}} className='fantasyy'>Your Concern : </h3>
                        {/* <input type="text" name="concern" value={concern} placeholder='concern' onChange={changeHandler}></input> */}
                        <div className="form-group green-border-focus widthta">
                            <textarea className="form-control" id="exampleFormControlTextarea5" rows="3"  name="concern" value={concern}  onChange={changeHandler} placeholder="Concern around 50 words"></textarea>
                        </div>
                        <br />
                        <small><b>Complainee pic under 1MB (Not Mandatory):</b></small><br />
                        <input type="file"  className="inputfile" onChange={fileHandler} /><br />
                        <br />
                        <input type="submit" value="submit" className="btn btn-success" /><br /><br />
                    </form>
                    
                </div>
                <br /><br />
                </center>
  </div>
  )
};

export default Indprofile;
