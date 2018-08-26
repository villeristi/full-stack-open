import React from 'react'

class Notification extends React.Component {
  render() {
    const { notification: { message } } = this.props.store.getState()

    const style = {
      border: 'solid',
      padding: 10,
      borderWidth: 1
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

export default Notification