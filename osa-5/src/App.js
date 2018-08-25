import React from 'react'

import * as blogService from './services/blogService'
import * as authService from './services/authService'
import * as storage from './util/localStorage'

import LoginForm from './components/LoginForm'
import Blog from './components/Blog'

const baseState = {
  blogs: [],
  username: '',
  password: '',
  user: null,
  error: null
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = baseState
  }

  componentWillMount() {
    const user = storage.get('user')

    if(user) {
      this.setState({ user })
    }
  }

  async componentDidMount() {
    const { user } = this.state

    if(user){
      this.fetchBlogs()
    }
  }

  fetchBlogs = async () => {
    const blogs = await blogService.getAll()
    return this.setState({ blogs })
  }

  handleLogin = async (e) => {
    e.preventDefault()
    const { username, password } = this.state

    try{
      const user = await authService.login({
        username,
        password
      })

      this.clearFields()
      return this.setState({ user }, () => this.fetchBlogs())

    } catch(e) {
      this.clearFields()
      this.displayError('käyttäjätunnus tai salasana virheellinen')
    }
  }

  handleLogout = async () => {
    try {
      await authService.logout()
      this.setState(baseState)
    } catch(e) {
      return this.displayError(e)
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

  displayError = (error) => {
    this.setState({ error }, () => {
      setTimeout(() => this.setState({ error: null }), 3000)
    })
  }

  render() {
    const { user, blogs } = this.state

    if(!user) {
      return (
        <LoginForm
          handleNameChange={this.handleFieldChange}
          handlePwdChange={this.handleFieldChange}
          handleLogin={this.handleLogin}
          username={this.state.username}
          password={this.state.password}
        />
      )
    }

    return (
      <div>
        <h2>blogs</h2>
        {user && (<p>{user.name} logged in <button onClick={this.handleLogout}>logout</button></p>)}
        {blogs.map(blog => <Blog key={blog.id} blog={blog}/> )}
      </div>
    );
  }
}

export default App;
