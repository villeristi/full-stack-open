import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import * as storage from '../../util/localStorage'
import { login, logout, setUser } from '../../store/authReducer'

class CurrentUser extends React.Component {

  static propTypes = {
    setUser: PropTypes.any,
    history: PropTypes.object,
    auth: PropTypes.object,
  }

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
      <span className="navbar-text">
        <i className="fa fa-user"></i> <strong>{auth.name}</strong> <button onClick={this.handleLogout} className="btn btn-outline-secondary btn-sm">logout <i className="fa fa-sign-out"></i></button>
      </span>
    )
  }
}

const mapStateToProps = ({ auth }) => {
  return {
    auth,
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
