import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Home from './components/Home.jsx'
import Nav from './components/Nav.jsx'
import About from './components/About.jsx'
import ContactPage from './components/ContactPage.jsx'

export default function App() {
  return (
    <div>
      <Nav />
      <div className="app-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/home" element={<Navigate to="/" replace />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </div>
  )
}
