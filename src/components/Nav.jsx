import React from 'react'
import { Link } from 'react-router-dom'

export default function Nav() {
  const links = [
    { text: 'Home', to: '/' },
    { text: 'About', to: '/about' },
    { text: 'Contact', to: '/contact' }
  ]

  return (
    <nav className="site-nav">
      <div className="nav-inner">
        <Link to="/" className="nav-logo">Logo Holder</Link>

        <div className="nav-links">
          {links.map(l => (
            <Link key={l.to} to={l.to} className="nav-link">{l.text}</Link>
          ))}
        </div>

        <a href="#schedule" className="cta">Schedule Service</a>
      </div>
    </nav>
  )
}
