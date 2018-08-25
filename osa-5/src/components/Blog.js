import React from 'react'
import './blog.css'

const Blog = ({ blog, handleLike }) => (
  <div className="blog">
    <a href={blog.url} target="_blank">{blog.url}</a>
    <p>{blog.likes} like <button onClick={handleLike}>like</button></p>
    <p>By {blog.user.name}</p>
  </div>
)

export default Blog
