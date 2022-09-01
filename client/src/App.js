import React from 'react'
import Home from './components/Home'
import Login from './components/Login'
import Register from './components/Register'
import Dashboard from './privatecomponents/Dashboard'
import {  BrowserRouter,Routes,Route} from "react-router-dom"
import Myprofile from './privatecomponents/Myprofile'
import Contact from './privatecomponents/Contact'
import Indprofile from './privatecomponents/Indprofile'
import Indcompliment from './privatecomponents/Indcompliment'
import AdminLogin from './components/AdminLogin'
import Admindashboard from './AdminPrivateComponents/Admindashboard'
import Adminprofile from './AdminPrivateComponents/Adminprofile'
import Allcomplaints from './AdminPrivateComponents/Allcomplaints'
import Indcompliment2 from './AdminPrivateComponents/Indcompliment2'

import Forgetpassword from './components/Forgetpassword'
import Resetpassword from './components/Resetpassword'
import Allproblems from './AdminPrivateComponents/Allproblems'

const App = () => {
  return (
    <div>
      <BrowserRouter>
      <Routes>

        <Route path='/' exact element={<Home />} />
        <Route path='/login' exact element={<Login />} />
        <Route path='/adminlogin' exact element={<AdminLogin />} />
        <Route path='/dashboard' exact element={<Dashboard />} />
        <Route path='/admindashboard' exact element={<Admindashboard />} />
        <Route path='/register' exact element={<Register />} />
        <Route path="/myprofile" exact element={<Myprofile />} />
        <Route path="/adminprofile" exact element={<Adminprofile />} />
        <Route path='/contact' exact element={<Contact />} />
        <Route path='/indprofile/:id' exact element={<Indprofile />} />
        <Route path='/allcomplaints/:id' exact element={<Allcomplaints />} />
        <Route path='/indcompliment/:id' exact element={<Indcompliment />} />
        <Route path='/indcompliment2/:id' exact element={<Indcompliment2 />} />
        <Route path='/allproblems/:id' exact element={<Allproblems />} />

        
        <Route path='/forgetpassword' exact element={<Forgetpassword />} />
        <Route path='/resetpassword' exact element={<Resetpassword />} />




      </Routes>
      </BrowserRouter>
      
    </div>
  )
}

export default App
