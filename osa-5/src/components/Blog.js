import React from 'react'
import './blog.css'

const Blog = ({ blog }) => (
  <div className="blog">
    <a href={blog.url} target="_blank">{blog.url}</a>
    <p>{blog.likes} like <button>like</button></p>
    <p>By {blog.user.name}</p>
  </div>
)

export default Blog
