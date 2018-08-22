import React from 'react'

import './styles/notification.css'

const Notification = ({ message, status }) => {

  const className = status === 'error' ? 'error' : 'success'

  if (!message) {
    return null
  }

  return (
    <div className={`notification ${className}`}>
      {message}
    </div>
  )
}

export default Notification
