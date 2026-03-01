import React, { useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Home from './components/Home.jsx'
import Nav from './components/Nav.jsx'
import About from './components/About.jsx'
import ContactPage from './components/ContactPage.jsx'
import Schedule from './components/Schedule.jsx'
import History from './components/History.jsx'
import Contact from './components/Contact.jsx'
import Brand from './components/Brand.jsx'
import Login from './components/Login.jsx'
import { setToken } from './utils/auth.js'

function handleUrlToken(){
  try{
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    if(token){
      setToken(token);
      // remove token from url
      params.delete('token');
      const newUrl = window.location.pathname + (params.toString() ? ('?'+params.toString()) : '');
      window.history.replaceState({}, document.title, newUrl);
    }
  }catch(e){}
}

export default function App() {
  useEffect(()=>{
    handleUrlToken();
  },[])
  return (
    <div>
      <Nav />
      <div className="app-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/history" element={<History />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Navigate to="/" replace />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </div>
  )
}
