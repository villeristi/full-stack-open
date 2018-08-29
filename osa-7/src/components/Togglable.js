import React from 'react'
import PropTypes from 'prop-types'

export default class Togglable extends React.Component {

  static propTypes = {
    title: PropTypes.string,
    children: PropTypes.object,
  }

  constructor(props) {
    super(props)
    this.state = {
      visible: false
    }
  }

  toggleVisibility = () => {
    this.setState({ visible: !this.state.visible })
  }

  render() {
    const { title } = this.props
    const showWhenVisible = { display: this.state.visible ? '' : 'none' }

    return (
      <div className="toggle-container">
        <p onClick={this.toggleVisibility} className="title">{title}</p>
        <div style={showWhenVisible} className="toggle-content">
          {this.props.children}
        </div>
      </div>
    )
  }
}
