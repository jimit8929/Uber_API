import React from 'react'
import {Route , Routes} from "react-router-dom"

//Pages
import Home from './pages/Home.jsx';
import UserLogin from './pages/UserLogin.jsx';
import UserRegister from './pages/UserRegister.jsx';
import CaptainLogin from './pages/CaptainLogin.jsx';
import CaptainRegister from './pages/CaptainRegister.jsx';
import Layout from './features/Global/components/layout.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/user-login" element={<UserLogin/>}/>
          <Route path="/user-register" element={<UserRegister/>}/>
          <Route path="/captain-login" element={<CaptainLogin/>}/>
          <Route path="/captain-register" element={<CaptainRegister/>}/>
        </Route>
      </Routes>
    </div>
  )
}

export default App; 