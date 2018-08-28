import React from 'react'
import * as storage from '../../util/localStorage'

import './blog.css'

const currentUser = storage.get('user')

const Blog = ({ blog, handleLike, handleDelete }) => {
  return (
    <div className="blog">
      <a href={blog.url} target="_blank">{blog.url}</a>
      <p>{blog.likes} like <button onClick={handleLike}>like</button></p>
      {blog.user && <p>By {blog.user.name}</p>}
      {currentUser && currentUser.username === blog.user.username && <button onClick={handleDelete}>delete</button>}
    </div>
  )
}

export default Blog
