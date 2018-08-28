import React from 'react'
import './notification.css'

export default ({ notification }) => {

  const { message, status } = notification

  if(!message) {
    return null
  }

  const className = status && status !== 'success' ? 'warning' : 'success'

  return (
    <div className={`mt-3 alert alert-${className}`} role="alert">
      {message}
    </div>
  )
}
