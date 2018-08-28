import React from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import * as storage from '../../util/localStorage'
import { login, logout } from '../../store/authReducer'
import { notify } from '../../store/NotificationReducer'

import './login.css'

class LoginForm extends React.Component {

  constructor() {
    super()

    this.state = {
      username: '',
      password: '',
    }
  }

  componentDidMount() {
    const user = storage.get('user')
    if(user) {
      this.props.history.push('/')
    }
  }

  componentWillReceiveProps(nextProps) {
    if( this.props.auth === null && !!nextProps.auth) {
      return this.props.history.push('/')
    }
  }

  handleLogin = async (e) => {
    e.preventDefault()
    const { username, password } = this.state
    const { login, history, notify } = this.props

    try{
      await login({ username, password })
      return history.push('/')
    } catch(err) {
      this.clearFields()
      notify('käyttäjätunnus tai salasana virheellinen', 'error')
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
    const disableBtn = !username || !password

    return (
      <div className="text-center form-container">
        <form className="form-signin" onSubmit={this.handleLogin}>
          <h1 className="h3 mb-3 font-weight-normal">Login</h1>
          <label className="sr-only">Username</label>
          <input type="text" name="username" value={username} onChange={this.handleFieldChange} className="form-control" placeholder="Username" />
          <label className="sr-only">Password</label>
          <input type="password" name="password" className="form-control" placeholder="Password" value={password} onChange={this.handleFieldChange} />
          <button className="btn btn-lg btn-primary btn-block" type="submit" disabled={disableBtn}>Log in</button>
        </form>
      </div>
    )
  }
}

export default withRouter(
  connect(
    ({ auth }) => {
      return {
        auth,
      }
    },
    { login, logout, notify }
  )(LoginForm))
