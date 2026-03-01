import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

// Simple role detection: read from localStorage.role
function getRole() {
  return localStorage.getItem('role') || 'guest' // 'guest' | 'user' | 'admin'
}

export default function Nav() {
  const navigate = useNavigate();
  const role = getRole();

  function guardedNavigate(path) {
    if (role === 'guest') return navigate('/login');
    navigate(path);
  }

  function logout(){
    localStorage.removeItem('token')
    localStorage.setItem('role','guest')
    navigate('/login')
  }

  return (
    <nav className="site-nav">
      <div className="nav-inner">
        <Link to="/" className="nav-logo">Logo Holder</Link>

        <div className="nav-links">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/about" className="nav-link">About</Link>
          <Link to="/contact" className="nav-link">Contact</Link>
          <a onClick={() => guardedNavigate('/schedule')} className="nav-link" style={{cursor:'pointer'}}>Schedule</a>
          <a onClick={() => guardedNavigate('/history')} className="nav-link" style={{cursor:'pointer'}}>History</a>
        </div>

        <div>
          {role === 'guest' && <Link to="/login" className="cta">Login</Link>}
          {role === 'user' && <><span className="cta">User</span> <button onClick={logout} style={{marginLeft:8}}>Logout</button></>}
          {role === 'admin' && <><span className="cta">Admin</span> <button onClick={logout} style={{marginLeft:8}}>Logout</button></>}
        </div>
      </div>
    </nav>
  )
}
