import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { fetchBlogs, removeBlog, likeBlog, commentOnBlog } from '../../store/blogReducer'
import { notify } from '../../store/notificationReducer'
import * as storage from '../../util/localStorage'

import './blog.css'

const currentUser = storage.get('user')

class SingleBLog extends React.Component {

  static propTypes = {
    history: PropTypes.object,
    currentBlog: PropTypes.object,
    commentOnBlog: PropTypes.any,
    notify: PropTypes.any,
    likeBlog: PropTypes.any,
  }

  constructor() {
    super()

    this.state = {
      comment: '',
    }
  }

  handleDelete = async ({title, id}) => {
    const { removeBlog, notify } = this.props
    const really = window.confirm('Are you sure you want to delete this blog?')

    if(really) {
      try {
        await removeBlog(id)
        notify(`Blog ${title} removed`, 'success')
        return this.props.history.push('/')
      } catch (e) {
        return notify(e.message)
      }
    }
  }

  updateComment = (e) => {
    this.setState({ comment: e.target.value })
  }

  handleComment = (e) => {
    e.preventDefault()

    const { comment } = this.state
    const { currentBlog, commentOnBlog, notify } = this.props

    try {
      commentOnBlog(currentBlog.id, comment)
      notify(`Comment '${comment}' was added to '${currentBlog.title}'`)
      return this.setState({ comment: '' })
    } catch(e) {
      notify(e, 'error')
    }

  }

  render() {
    const { currentBlog, likeBlog } = this.props
    const { comment } = this.state

    if(!currentBlog) {
      return null
    }

    const { likes, title, user, url, comments } = currentBlog
    const disableBtn = this.state.comment === ''

    return (
      <div>
        <div className="card">
          <h5 className="card-header">{title} {currentUser && currentUser.username === user.username && <button className="btn btn-outline-danger btn-sm pull-right" onClick={() => this.handleDelete(currentBlog)}>Delete</button>}</h5>
          <div className="card-body">
            <p className="card-text"><i className="fa fa-link"></i> <a href={url} target="_blank" rel="noopener noreferrer">{url}</a></p>
            <p className="card-text"><i className="fa fa-user"></i> {user.name}</p>
            <button type="button" className="btn btn-outline-primary btn-sm" onClick={() => likeBlog(currentBlog)}>
              Like <span className="badge badge-success">{likes}</span>
            </button>
          </div>
        </div>

        <form className="input-group mb-3 mt-3" onSubmit={this.handleComment}>
          <input type="text" className="form-control" placeholder="Comment..." name="comment" value={comment} onChange={this.updateComment} />
          <div className="input-group-append">
            <button className="btn btn-outline-success" type="submit" disabled={disableBtn}>Add comment</button>
          </div>
        </form>

        {!!comments.length &&
          <div className="card">
            <h5 className="card-header">
              Comments
            </h5>
            <ul className="list-group list-group-flush">
              {comments.map((comment, index) => {
                return (
                  <li key={index} className="list-group-item">{comment}</li>
                )
              })}
            </ul>
          </div>
        }
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
    { removeBlog, likeBlog, fetchBlogs, notify, commentOnBlog }
  )(SingleBLog)
)

