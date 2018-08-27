import React from 'react'
import { connect } from 'react-redux'

import { login, logout, setUser } from './store/authReducer'
import { fetchBlogs, removeBlog, likeBlog } from './store/blogReducer'

import * as authService from './services/authService'
import * as storage from './util/localStorage'

import CreateNewBlogForm from './components/CreateBlogForm';
import Notification from './components/Notification'
import LoginForm from './components/Login/LoginForm'
import Togglable from './components/Togglable'
import Blog from './components/Blog'

const baseState = {
  username: '',
  password: '',
  notification: null,
  displayNewForm: false,
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = baseState
  }

  async componentDidMount() {
    const { setUser } = this.props
    const user = storage.get('user')

    if(user) {
      setUser(user)
    }
  }

  componentWillReceiveProps(nextProps) {
    if( this.props.user === null && !!nextProps.user) {
      this.props.fetchBlogs()
    }
  }

  handleLogin = async (e) => {
    e.preventDefault()
    const { username, password } = this.state
    const { login } = this.props

    try{
      this.clearFields()
      return login({ username, password })

    } catch(e) {
      console.log('asdasd')
      this.clearFields()
      this.displayNotification('käyttäjätunnus tai salasana virheellinen')
    }
  }

  handleLogout = async () => {
    try {
      await authService.logout()
      this.setState(baseState)
    } catch(e) {
      return this.displayNotification(e)
    }
  }

  handleDelete = async ({ id }) => {
    const { removeBlog } = this.props
    const really = window.confirm('Are you sure you want to delete this blog?')

    if(really) {
      try {
        await removeBlog(id)
      } catch (e) {
        return this.displayNotification(e.message)
      }
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

  toggleCreateForm = () => {
    return this.setState({ displayNewForm: !this.state.displayNewForm })
  }

  displayNotification = (msg, status = 'error') => {
    this.setState({ notification: { msg, status } }, () => {
      setTimeout(() => this.setState({ notification: null }), 3000)
    })
  }

  render() {
    const { blogs, user, logout } = this.props
    const { notification, displayNewForm } = this.state

    if(!user) {
      return (
        <div>
          {notification && <Notification msg={notification.msg} status={notification.status} />}
          <LoginForm
            handleNameChange={this.handleFieldChange}
            handlePwdChange={this.handleFieldChange}
            handleLogin={this.handleLogin}
            username={this.state.username}
            password={this.state.password}
          />
        </div>
      )
    }

    return (
      <div>
        {notification && <Notification msg={notification.msg} status={notification.status} />}
        <h1>Blogs</h1>
        <p>{user.name} logged in <button onClick={logout}>logout</button></p>

        {!displayNewForm && <button onClick={this.toggleCreateForm}>create new</button>}

        <CreateNewBlogForm
          displayNotification={this.displayNotification}
          fetchBlogs={this.fetchBlogs}
          toggle={this.toggleCreateForm}
          visible={displayNewForm}
        />

        <div className="blogs-container">
          {!!blogs.length && blogs.map((blog) => {
            return (
              <Togglable key={blog.id} title={`${blog.title}, ${blog.author}`}>
                <Blog
                  blog={blog}
                  handleLike={() => this.props.likeBlog(blog)}
                  handleDelete={() => this.handleDelete(blog)}
                />
              </Togglable>
            )
          })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    blogs: state.blogs.sort((a, b) => (a.likes < b.likes) ? 1 : ((b.likes > a.likes) ? -1 : 0))
  }
}

export default connect(mapStateToProps, {
  login,
  logout,
  setUser,
  fetchBlogs,
  removeBlog,
  likeBlog,
})(App)
