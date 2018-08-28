import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import * as storage from '../../util/localStorage'
import { login, logout, setUser } from '../../store/authReducer'

class CurrentUser extends React.Component {

  async componentDidMount() {
    const { setUser, history } = this.props
    const user = storage.get('user')

    if(user) {
      return setUser(user)
    }

    return history.push('/login')
  }

  handleLogout = async () => {
    const { logout, history } = this.props
    try {
      logout()
      return history.push('/login')
    } catch(e) {
      return this.displayNotification(e)
    }
  }

  render() {
    const { auth } = this.props

    if(!auth) {
      return null
    }

    return (
      <p>{auth.name} logged in <button onClick={this.handleLogout}>logout</button></p>
    )
  }
}

const mapStateToProps = ({ auth }) => {
  return {
    auth
  }
}

export default withRouter(
  connect(
    mapStateToProps,
    {
      login,
      logout,
      setUser,
    }
  )(CurrentUser)
)
