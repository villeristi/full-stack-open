import React from 'react'
import { connect } from 'react-redux'

class Notification extends React.Component {
  render() {
    const { notification: { message } } = this.props

    const style = {
      border: 'solid',
      padding: 10,
      borderWidth: 1,
      marginBottom: 10,
    }

    if(!message) {
      return null
    }

    return (
      <div style={style}>
        {message}
      </div>
    )
  }
}

export default connect((state) => {
  return {
    notification: state.notification
  }
})(Notification)

