import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { fetchBlogs, removeBlog, likeBlog } from '../../store/blogReducer'
import Togglable from '../Togglable'
import Blog from '../Blog/Blog'

class BlogList extends React.Component {

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

  render() {

    const { blogs } = this.props

    return (
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
    )
  }
}

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs.sort((a, b) => (a.likes < b.likes) ? 1 : ((b.likes > a.likes) ? -1 : 0))
  }
}

export default withRouter(
  connect(
    mapStateToProps,
    {
      fetchBlogs,
      removeBlog,
      likeBlog,
    }
  )(BlogList)
)
