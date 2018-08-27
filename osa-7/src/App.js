import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { login, logout, setUser } from './store/authReducer'
import { fetchBlogs, removeBlog, likeBlog } from './store/blogReducer'

import * as storage from './util/localStorage'

import CreateNewBlogForm from './components/CreateBlogForm';
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import Blog from './components/Blog'

const baseState = {
  notification: null,
  displayNewForm: false,
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = baseState
  }

  async componentDidMount() {
    const { setUser, history } = this.props
    const user = storage.get('user')

    if(!!this.props.user) {
      return this.props.fetchBlogs()
    }

    if(user) {
      return setUser(user)
    }

    return history.push('/login')
  }

  componentWillReceiveProps(nextProps) {
    if( this.props.user === null && !!nextProps.user) {
      this.props.fetchBlogs()
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

  handleLogout = async () => {
    const { logout, history } = this.props
    try {
      logout()
      return history.push('/login')
    } catch(e) {
      return this.displayNotification(e)
    }
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
    const { blogs, user } = this.props
    const { notification, displayNewForm } = this.state

    return (
      <div>
        {notification && <Notification msg={notification.msg} status={notification.status} />}
        <h1>Blogs</h1>
        <p>{!!user && user.name} logged in <button onClick={this.handleLogout}>logout</button></p>

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

export default withRouter(
  connect(
    mapStateToProps,
    {
      login,
      logout,
      setUser,
      fetchBlogs,
      removeBlog,
      likeBlog,
    }
  )(App)
)
