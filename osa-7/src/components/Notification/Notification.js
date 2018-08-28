import React from 'react'
import './notification.css'

export default ({ notification }) => {

  if(!notification) {
    return null
  }

  const { status, msg } = notification
  const className = status && status !== 'success' ? 'error' : 'success'

  return (
    <div className={`notification ${className}`}>
      <p>{msg}</p>
    </div>
  )
}
