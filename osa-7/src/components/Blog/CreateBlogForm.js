import React from 'react'

import * as blogService from '../../services/blogService'

const newBlog = {
  title: '',
  author: '',
  url: '',
}

export default class CreateNewBlogForm extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      newBlog,
      visible: false,
    }
  }

  handleSubmit = async (e) => {
    const { newBlog } = this.state
    const { fetchBlogs, displayNotification } = this.props
    e.preventDefault()

    try {
      await blogService.create(newBlog)
      this.clearFields()
      displayNotification(`A new blog '${newBlog.title}' by ${newBlog.author} added!`, 'success')
      return await fetchBlogs()
    } catch(e) {
      this.clearFields()
      return displayNotification(e.message)
    }
  }

  toggleVisibility = () => {
    return this.setState({ visible: !this.state.visible })
  }

  handleChange = (e) => {
    const { newBlog } = this.state
    return this.setState({ newBlog: {...newBlog, [e.target.name]: e.target.value}})
  }

  clearFields = () => {
    return this.setState({ newBlog })
  }

  render() {

    const { visible } = this.state
    const { author, title, url } = this.state.newBlog

    if(!visible) {
      return <button onClick={this.toggleVisibility}>create new</button>
    }

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <h2>Create new blog</h2>
          <div>
            title
            <input
              type="text"
              name="title"
              value={title}
              onChange={this.handleChange}
            />
          </div>
          <div>
            author
            <input
              type="text"
              name="author"
              value={author}
              onChange={this.handleChange}
            />
          </div>
          <div>
            url
            <input
              type="text"
              name="url"
              value={url}
              onChange={this.handleChange}
            />
          </div>
          <button type="submit">Create</button>
        </form>

        <button onClick={this.toggleVisibility}>close</button>
      </div>
    )
  }
}
