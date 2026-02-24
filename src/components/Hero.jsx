import React from 'react'

export default function Hero({ title = 'Welcome', subtitle = '', cta = 'Schedule Service' } = {}) {
  return (
    <header className="hero">
      <div className="hero-content">
        <h1>{title}</h1>
        {subtitle ? <p className="hero-sub">{subtitle}</p> : null}
        <a href="#schedule" className="hero-cta">{cta}</a>
      </div>
    </header>
  )
}
