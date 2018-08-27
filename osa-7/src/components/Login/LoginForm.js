import React from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import * as storage from '../../util/localStorage'
import { login, logout } from '../../store/authReducer'

class Login extends React.Component {

  constructor() {
    super()

    this.state = {
      username: '',
      password: '',
    }
  }

  componentDidMount() {
    const user = storage.get('user')
    console.log('USER', user)
    if(user) {
      this.props.history.push('/')
    }
  }

  handleLogin = async (e) => {
    e.preventDefault()
    const { username, password } = this.state
    const { login, history } = this.props

    try{
      this.clearFields()
      login({ username, password })
      history.push('/')

    } catch(e) {
      this.clearFields()
      this.displayNotification('käyttäjätunnus tai salasana virheellinen')
    }
  }

  handleFieldChange = (e) => {
    const name = e.target.name
    this.setState({ [name]: e.target.value })
  }

  clearFields = () => {
    return this.setState({
      username: '',
      password: ''
    })
  }

  render() {

    const { username, password } = this.state

    return (
      <div className="login-form">
        <h1>Login</h1>
        <form onSubmit={this.handleLogin}>
          <div>
            käyttäjätunnus
            <input
              type="text"
              name="username"
              value={username}
              onChange={this.handleFieldChange}
            />
          </div>
          <div>
            salasana
            <input
              type="password"
              name="password"
              value={password}
              onChange={this.handleFieldChange}
            />
          </div>
          <button type="submit">kirjaudu</button>
        </form>
      </div>
    )
  }
}

export default withRouter(
  connect(
    (state) => {
      return {

      }
    },
    { login, logout }
  )(Login))
