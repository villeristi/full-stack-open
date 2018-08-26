import React from 'react'
import './notification.css'

export default ({ msg, status }) => {
  const className = status && status !== 'success' ? 'error' : 'success'

  if(!msg) {
    return null
  }

  return (
    <div className={`notification ${className}`}>
      <p>{msg}</p>
    </div>
  )
}
