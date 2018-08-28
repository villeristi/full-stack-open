import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { fetchBlogs, removeBlog, likeBlog } from '../../store/blogReducer'
import * as storage from '../../util/localStorage'

import './blog.css'

const currentUser = storage.get('user')

class SingleBLog extends React.Component {
  handleDelete = async (id) => {
    const { removeBlog } = this.props
    const really = window.confirm('Are you sure you want to delete this blog?')

    if(really) {
      try {
        await removeBlog(id)
        this.props.history.push('/')
      } catch (e) {
        return this.displayNotification(e.message)
      }
    }
  }

  render() {
    const { currentBlog, likeBlog } = this.props

    if(!currentBlog) {
      return null
    }

    const { likes, title, user, url, id } = currentBlog

    return (
      <div className="card">
        <h5 className="card-header">{title} {currentUser && currentUser.username === user.username && <button className="btn btn-outline-danger btn-sm pull-right" onClick={() => this.handleDelete(id)}>Delete</button>}</h5>
        <div className="card-body">
          <p className="card-text"><i className="fa fa-link"></i> <a href={url} target="_blank">{url}</a></p>
          <p className="card-text"><i className="fa fa-user"></i> {user.name}</p>
          <button type="button" className="btn btn-outline-primary btn-sm" onClick={() => likeBlog(currentBlog)}>
            Like <span className="badge badge-success">{likes}</span>
          </button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ blogs }, { match }) => {
  const currentBlog = blogs.find(({ id }) => id === match.params.id)

  return {
    currentBlog,
    blogs,
  }
}

export default withRouter(
  connect(
    mapStateToProps,
    { removeBlog, likeBlog, fetchBlogs }
  )(SingleBLog)
)

