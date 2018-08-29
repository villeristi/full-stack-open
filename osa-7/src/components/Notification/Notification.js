import React from 'react'
import PropTypes from 'prop-types'
import './notification.css'

const Notification = ({ notification }) => {

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

Notification.propTypes = {
  notification: PropTypes.string,
}

export default Notification
