import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { login, logout, setUser } from './store/authReducer'
import { fetchBlogs } from './store/blogReducer'

import * as storage from './util/localStorage'

import Notification from './components/Notification/Notification'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      notification: null
    }
  }

  async componentDidMount() {
    const { setUser, history, auth, fetchBlogs } = this.props
    const user = storage.get('user')

    if(!!auth) {
      return fetchBlogs()
    }

    if(user) {
      return setUser(user)
    }

    return history.push('/login')
  }

  componentWillReceiveProps(nextProps) {
    if( this.props.auth === null && !!nextProps.auth) {
      this.props.fetchBlogs()
    }
  }

  render() {
    const { notification } = this.props

    return (
      <div className="container">
        <Notification notification={notification} />
        {this.props.children}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    blogs: state.blogs.sort((a, b) => (a.likes < b.likes) ? 1 : ((b.likes > a.likes) ? -1 : 0)),
    notification: state.notification,
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
    }
  )(App)
)
