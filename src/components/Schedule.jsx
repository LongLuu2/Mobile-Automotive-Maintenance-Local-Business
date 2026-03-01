import React from 'react'
import { Link } from 'react-router-dom'
import { getRole } from '../utils/auth.js'

export default function Schedule() {
  const role = getRole()
  return (
    <div>
      <h2>Schedule</h2>
      {role === 'guest' ? (
        <div>
          <p>You must <Link to="/login">log in</Link> to schedule a service.</p>
        </div>
      ) : (
        <div>
          <p>Logged in as <strong>{role}</strong>. You can schedule services here.</p>
        </div>
      )}
    </div>
  )
}
