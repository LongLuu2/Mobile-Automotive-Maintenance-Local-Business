import React from 'react'

export default function Services() {
  const items = [
    'Oil change',
    'Tire rotation',
    'Diagnostic (check engine light)',
    'Cabin & air filter',
    'Interior clean-up',
    'Snow removal'
  ]

  return (
    <div className="card">
      <h2>Services</h2>
      <ul className="services">
        {items.map(i => (
          <li key={i}>{i}</li>
        ))}
      </ul>
    </div>
  )
}
