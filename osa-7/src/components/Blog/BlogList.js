import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'

import { fetchBlogs } from '../../store/blogReducer'

class BlogList extends React.Component {

  static propTypes = {
    blogs: PropTypes.array,
  }

  render() {

    const { blogs } = this.props

    return (
      <div>
        <h1 className="title border-bottom pb-2">Blogs</h1>
        <ul className="list-group">
          {!!blogs.length && blogs.map((blog) => {
            return (
              <Link className="list-group-item d-flex justify-content-between align-items-center list-group-item-action"
                to={`/blogs/${blog.id}`} key={blog.id}>
                {blog.title}
                <span className="badge badge-secondary badge-pill">
                  <i className="fa fa-user"></i> {blog.author}
                  <i className="ml-1 fa fa-comment-o"></i> {blog.comments.length}
                </span>
              </Link>
            )
          })}
        </ul>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs.sort((a, b) => (a.likes < b.likes) ? 1 : ((b.likes > a.likes) ? -1 : 0)),
  }
}

export default withRouter(
  connect(
    mapStateToProps,
    { fetchBlogs }
  )(BlogList)
)
