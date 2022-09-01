import React,{useState} from 'react'
import { Link,Navigate } from 'react-router-dom'
import axios from 'axios'
import './Logo.css'
import './Register.css'



const Register = () => {
    const [code,setCode] = useState("")
    const [m,setM] = useState(0)
    const [k,setK] = useState(0)
    const [data,seData] = useState({
        fullname : '',
        collegeId : '',
        branch : '',
        email : '',
        mobile : '',
        password : '',
        confirmpassword : ''
    })
    const [x,setX] = useState(false);
    const {fullname,collegeId,branch,email,mobile,password,confirmpassword} = data
    const changeHandler = e =>{
        seData({...data,[e.target.name]:e.target.value})
    }
    const changeHandler2 = e =>{
        seData({...data,[e.target.name]:e.target.value.toUpperCase()})
    }
    const Handler = e =>{
        seData({...data,[e.target.name]:e.target.value})
    }

    const check_roll =  (roll_no, branch) => {

        var x;
        if(branch==="CIVIL"){
            let pattern = /^[2][0-2][9][1][1][A][0][1][\d|\w]\d$/g;
            x = false;
            x =  pattern.test(roll_no);
            if(!x){
                pattern = /^[2][0-2][9][1][5][A][0][1][0-1][0-9]$/g;
                x =  pattern.test(roll_no);
            }
            if(!x){
                pattern = /^[1][8-9][9][1][1][A][0][1][\d|\w]\d$/g;
                x =  pattern.test(roll_no);
            }
            if(!x){
                pattern = /^[1][8-9][9][1][5][A][0][1][0-1][0-9]$/g;
                x = pattern.test(roll_no);
            }
            if(x){
                return true;
            }
            else{
                return false;
            }
        }
        else if(branch==="EEE"){
            let pattern = /^[2][0-2][9][1][1][A][0][2][\d|\w]\d$/g;
            x = false;
            x =  pattern.test(roll_no);
            if(!x){
                pattern = /^[2][0-2][9][1][5][A][0][2][0-1][0-9]$/g;
                x =  pattern.test(roll_no);
            }
            if(!x){
                pattern = /^[1][8-9][9][1][1][A][0][2][\d|\w]\d$/g;
                x =  pattern.test(roll_no);
            }
            if(!x){
                pattern = /^[1][8-9][9][1][5][A][0][2][0-1][0-9]$/g;
                x = pattern.test(roll_no);
            }
            if(x){
                return true;
            }
            else{
                return false;
            }
        }
        else if(branch==="MECH"){
            let pattern = /^[2][0-2][9][1][1][A][0][3][\d|\w]\d$/g;
            x = false;
            x =  pattern.test(roll_no);
            if(!x){
                pattern = /^[2][0-2][9][1][5][A][0][3][0-1][0-9]$/g;
                x =  pattern.test(roll_no);
            }
            if(!x){
                pattern = /^[1][8-9][9][1][1][A][0][3][\d|\w]\d$/g;
                x =  pattern.test(roll_no);
            }
            if(!x){
                pattern = /^[1][8-9][9][1][5][A][0][3][0-1][0-9]$/g;
                x = pattern.test(roll_no);
            }
            if(x){
                return true;
            }
            else{
                return false;
            }
        }
        else if(branch==="ECE"){
            let pattern = /^[2][0-2][9][1][1][A][0][4][\d|\w]\d$/g;
            x = false;
            x =  pattern.test(roll_no);
            if(!x){
                pattern = /^[2][0-2][9][1][5][A][0][4][0-1][0-9]$/g;
                x =  pattern.test(roll_no);
            }
            if(!x){
                pattern = /^[1][8-9][9][1][1][A][0][4][\d|\w]\d$/g;
                x =  pattern.test(roll_no);
            }
            if(!x){
                pattern = /^[1][8-9][9][1][5][A][0][4][0-1][0-9]$/g;
                x = pattern.test(roll_no);
            }
            if(x){
                return true;
            }
            else{
                return false;
            }
        }
        else if(branch==="CSE"){
            let pattern = /^[2][0-2][9][1][1][A][0][5][\d|\w]\d$/g;
            x = false;
            x =  pattern.test(roll_no);
            if(!x){
                pattern = /^[2][0-2][9][1][5][A][0][5][0-1][0-9]$/g;
                x =  pattern.test(roll_no);
            }
            if(!x){
                pattern = /^[1][8-9][9][1][1][A][0][5][\d|\w]\d$/g;
                x =  pattern.test(roll_no);
            }
            if(!x){
                pattern = /^[1][8-9][9][1][5][A][0][5][0-1][0-9]$/g;
                x = pattern.test(roll_no);
            }
            if(x){
                return true;
            }
            else{
                return false;
            }
        }
        else if(branch==="IT"){
            let pattern = /^[2][0-2][9][1][1][A][1][2][\d|\w]\d$/g;
            x = false;
            x =  pattern.test(roll_no);
            if(!x){
                pattern = /^[2][0-2][9][1][5][A][1][2][0-1][0-9]$/g;
                x =  pattern.test(roll_no);
            }
            if(!x){
                pattern = /^[1][8-9][9][1][1][A][1][2][\d|\w]\d$/g;
                x =  pattern.test(roll_no);
            }
            if(!x){
                pattern = /^[1][8-9][9][1][5][A][1][2][0-1][0-9]$/g;
                x = pattern.test(roll_no);
            }
            if(x){
                return true;
            }
            else{
                return false;
            }
        }
        else if(branch==="AIE"){
            let pattern = /^[2][0-2][9][1][1][A][3][5][\d|\w]\d$/g;
            x = false;
            x =  pattern.test(roll_no);
            if(!x){
                pattern = /^[2][0-2][9][1][5][A][3][5][0-1][0-9]$/g;
                x =  pattern.test(roll_no);
            }
            if(!x){
                pattern = /^[1][8-9][9][1][1][A][3][5][\d|\w]\d$/g;
                x =  pattern.test(roll_no);
            }
            if(!x){
                pattern = /^[1][8-9][9][1][5][A][3][5][0-1][0-9]$/g;
                x = pattern.test(roll_no);
            }
            if(x){
                return true;
            }
            else{
                return false;
            }
        }
        else if(branch==="CSEDS"){
            let pattern = /^[2][0-2][9][1][1][A][6][7][\d|\w]\d$/g;
            x = false;
            x =  pattern.test(roll_no);
            if(!x){
                pattern = /^[2][0-2][9][1][5][A][6][7][0-1][0-9]$/g;
                x =  pattern.test(roll_no);
            }
            if(!x){
                pattern = /^[1][8-9][9][1][1][A][6][7][\d|\w]\d$/g;
                x =  pattern.test(roll_no);
            }
            if(!x){
                pattern = /^[1][8-9][9][1][5][A][6][7][0-1][0-9]$/g;
                x = pattern.test(roll_no);
            }
            if(x){
                return true;
            }
            else{
                return false;
            }
    
        }
    
    }



    const yesHandler = () =>{
        axios.post("http://localhost:5000/sendregistermail",{collegeId:collegeId,email:email}).then(
            res  => { console.log(res.data);
                setM(1)}
        )
        
    }

    const noHandler = () =>{
        console.log(collegeId)
        axios.delete(`http://localhost:5000/deletetoken/${data.collegeId}`,{collegeId:collegeId}).then(
                        res  => console.log(res.data)
        )
        setK(0)
    }

    const submitHandler3 = e =>{
        e.preventDefault(); 
        axios.post(`http://localhost:5000/verifyregistermail/${code}`,).then(
            res  => {
                if(res.data === "verified")
                {
                    axios.post("http://localhost:5000/register",data).then(
                        res  => {
                            alert(res.data);
                            setX(true)
                        }
                    )

                    axios.delete(`http://localhost:5000/deletetoken/${data.collegeId}`).then( 
                        res  => console.log(res.data)
                    )
                }
                else{
                    alert("Invalid verification code")
                }
            }
        )
        
    }


    const submitHandler = e =>{
        e.preventDefault(); 
        
        
        if(password.length>5 && mobile.length===10){
            if(fullname && email ){
                if(password===confirmpassword){
                    if(collegeId && branch && collegeId.length===10){
                        
                            if(check_roll(collegeId,branch)){

                                axios.post("http://localhost:5000/createtoken",{collegeId:collegeId}).then(
                                    res  => {console.log(res.data);
                                                 setK(1);
                                    }
                                )
                                
                                
                            }
                            else{
                                alert("please choose correct branch respective to your ID")
                            }

                    }
                    else{
                        alert("Please give valid inputs to branch and collegeId")
                    }

                }
                else{
                    alert("password and confirm password doesnt match")
                }
            }
            else{
                alert("Please fill the complete form with valid details")
            }
        }
        else{
            alert("please use min 6 characters for password and 10 digits for mobile")
        }
    }

    if(x){
        return <Navigate to='/login' />
    }

    return (
        <div>
            <div className="reg-bg">
            <nav className="navbar bg-dark justify-content-left">
                <h1 style={{"marginLeft":"5px"}}>
                    <Link to='/'>Online Grievance</Link>
                </h1>
                <div className="justify-content-left" >
                    <h5 >
                        <Link to="/register" className="btn1 btn btn-secondary" style={{margin:"12px"}}>Register</Link>
                        <Link to="/login" className="btn2 btn btn-secondary" >Login</Link>&nbsp;&nbsp;
                    </h5>
                </div>
            </nav>

            { !m ? <div>

            <section className="container">
                <h1 className="large " style={{"color":"orange","marginTop":"50px"}}>Sign Up</h1>
                <p className="lead"><b> Create your Account</b></p>
                <form onSubmit={submitHandler} autoComplete="off">
                    <input className="form-control-lg m-1 border mobile2" style={{"float":"left" }} type="text"             placeholder="Name*"            onChange={changeHandler} value={fullname} name="fullname" /><br /><br />
                    <input className="form-control-lg m-1 border mobile2" style={{"float":"left" }} type="text"             placeholder="collegeId*"       onChange={changeHandler2} value={collegeId} name="collegeId" /><br /><br />
                    <div className='mobile2' style={{"textAlign":"left","padding":"1px"}}><br/>
                        <div className="card">
                            <div className="card-body">
                                <h4 className="card-title">
                                Branch
                                </h4>
                                <div onChange={Handler}>
                                    <input type="radio" value="AIE" name="branch" /> <span>AIE</span> &nbsp;&nbsp;
                                    <input type="radio" value="IT" name="branch" /> <span>IT</span> &nbsp;&nbsp;
                                    <input type="radio" value="CSE" name="branch" /> <span>CSE</span> &nbsp;&nbsp;
                                    <input type="radio" value="CSEDS" name="branch" /> <span>CSEDS</span> &nbsp;&nbsp;
                                    <input type="radio" value="ECE" name="branch" /> <span>ECE</span> &nbsp;&nbsp;
                                    <input type="radio" value="EEE" name="branch" /> <span>EEE</span> &nbsp;&nbsp;
                                    <input type="radio" value="CIVIL" name="branch" /> <span>CIVIL</span> &nbsp;
                                    <input type="radio" value="MECH" name="branch" /> <span>MECH</span> &nbsp;&nbsp;
                                </div>
                            </div>
                        </div>
                    </div>
                    <input className="form-control-lg m-1 border mobile2" style={{"float":"left" }} type="email"            placeholder="Email Address*"   onChange={changeHandler} value={email} name="email" /><br /><br />
                    <input className="form-control-lg m-1 border mobile2" style={{"float":"left" }} type="text"             placeholder="mobile*"          onChange={changeHandler} value={mobile} name="mobile" /><br /><br />
                    <input className="form-control-lg m-1 border mobile2" style={{"float":"left" }} type="password"         placeholder="password*"         onChange={changeHandler} value={password} name="password" /><br /><br />
                    <input className="form-control-lg m-1 border mobile2" style={{"float":"left" }} type="confirmpassword"  placeholder="confirm password*" onChange={changeHandler} value={confirmpassword} name="confirmpassword" /><br /><br /><br/><br />
                    <input type="submit" className="btn btn-primary" value="Register" />
                    
                        {k === 1 && <div><p><b>Are you sure?</b></p> <button className="btn btn-danger" onClick={()=>  yesHandler() }>yes</button> &nbsp;&nbsp; <button className="btn btn-success" onClick={()=> noHandler() }>No</button></div> } <br />
                    
                </form>
                <p>
                    Already have an Account? <Link to="/login">Sign in</Link>
                </p>
            </section><br /><br />

            </div>

            :

            <div>
                <section className="container">
                <h1 className="large " style={{"color":"orange","marginTop":"100px"}} > Email Verification </h1>
                <p className="lead"><b>Verify your code:</b></p>
                <form onSubmit={submitHandler3}>
                    <input className="form-control-lg m-1 border" style={{width:"40%"}} type="text"    placeholder="Enter code received in your mail"    name="code" value={code}   onChange={ e => setCode(e.target.value) } /><br /><br />
                    <input type="submit" className="btn btn-primary" value="verify" />
                </form>
                <p>
                    Don't received mail? <Link to="/register">Resend mail</Link>
                </p>
            </section>
            </div>
            }

            {x===1 ? <Navigate to="/login" /> : null}
        </div>
        </div>
    )
}

export default Register
