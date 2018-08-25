import React from 'react'

import * as blogService from './services/blogService'
import * as authService from './services/authService'
import * as storage from './util/localStorage'

import CreateNewBlogForm from './components/CreateBlogForm';
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import Blog from './components/Blog'

const baseState = {
  blogs: [],
  username: '',
  password: '',
  user: null,
  notification: null
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
      this.displayNotification('käyttäjätunnus tai salasana virheellinen')
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

  handleLike = async (blogData) => {
    const { blogs } = this.state
    const index = this.state.blogs.indexOf(blogData)
    const data = await blogService.like({...blogData, likes: blogData.likes + 1})

    blogs[index] = data

    return this.setState({ blogs: [...blogs] })
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

  displayNotification = (msg, status = 'error') => {
    this.setState({ notification: { msg, status } }, () => {
      setTimeout(() => this.setState({ notification: null }), 3000)
    })
  }

  render() {
    const { user, blogs, notification } = this.state
    blogs.sort((a, b) => (a.likes < b.likes) ? 1 : ((b.likes > a.likes) ? -1 : 0))

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
        <p>{user.name} logged in <button onClick={this.handleLogout}>logout</button></p>

        <CreateNewBlogForm
          displayNotification={this.displayNotification}
          fetchBlogs={this.fetchBlogs}
        />

        {blogs.map((blog) => {
          return (
            <Togglable key={blog.id} title={`${blog.title}, ${blog.author}`}>
              <Blog blog={blog} handleLike={() => this.handleLike(blog)} />
            </Togglable>
          )
        })}
      </div>
    );
  }
}

export default App;
