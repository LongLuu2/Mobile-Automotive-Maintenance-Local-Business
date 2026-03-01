import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function parseJwt(token){
  try{const p=token.split('.')[1];return JSON.parse(atob(p));}catch(e){return null}
}

export default function Login() {
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const navigate = useNavigate()

  async function submit(e){
    e.preventDefault()
    const res = await fetch((import.meta.env.VITE_AUTH_URL||'http://localhost:4000') + '/auth/login',{
      method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({email,password})
    })
    const data = await res.json()
    if (data.token){
      localStorage.setItem('token',data.token)
      const payload = parseJwt(data.token)
      // set simple role for now
      const role = payload && payload.isAdmin ? 'admin' : 'user'
      localStorage.setItem('role', role)
      navigate('/')
    } else {
      alert(data.error || 'Login failed')
    }
  }

  function googleLogin(){
    // redirect to auth server Google endpoint
    window.location.href = (import.meta.env.VITE_AUTH_URL||'http://localhost:4000') + '/auth/google'
  }

  return (
    <div style={{padding:20}}>
      <h2>Login</h2>
      <form onSubmit={submit} style={{display:'flex',flexDirection:'column',maxWidth:320}}>
        <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" />
        <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" />
        <button type="submit">Login</button>
      </form>
      <div style={{marginTop:12}}>
        <button onClick={googleLogin}>Login with Google</button>
      </div>
    </div>
  )
}
