import React from 'react'
import { connect } from 'react-redux'

import * as blogService from '../../services/blogService'
import { notify } from '../../store/NotificationReducer'

const newBlog = {
  title: '',
  author: '',
  url: '',
}

class CreateNewBlogForm extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      newBlog,
      visible: false,
    }
  }

  handleSubmit = async (e) => {
    const { newBlog } = this.state
    const { fetchBlogs, notify } = this.props
    e.preventDefault()

    try {
      await blogService.create(newBlog)
      this.clearFields()
      notify(`A new blog '${newBlog.title}' by ${newBlog.author} added!`)
      return await fetchBlogs()
    } catch(e) {
      this.clearFields()
      return notify(e.message, 'error')
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

    const disableBtn = !author || !title || !url

    if(!visible) {
      return <button onClick={this.toggleVisibility} className="btn btn-outline-primary btn-lg btn-block mb-4">Create new blog <i className="fa fa-plus"></i></button>
    }

    return (
      <form onSubmit={this.handleSubmit} className="mb-4 border p-4">
        <button type="button" className="close mb-4" aria-label="Close" onClick={this.toggleVisibility}>
          <span aria-hidden="true">&times;</span>
        </button>
        <div className="clearfix" />
        <div className="form-group row">
          <label className="col-sm-2 col-form-label">Title</label>
          <div className="col-sm-10">
            <input type="text" className="form-control" name="title" placeholder="Blog title" value={title} onChange={this.handleChange} />
          </div>
        </div>

        <div className="form-group row">
          <label className="col-sm-2 col-form-label">Author</label>
          <div className="col-sm-10">
            <input type="text" className="form-control" name="author" placeholder="Blog author" value={author} onChange={this.handleChange} />
          </div>
        </div>

        <div className="form-group row">
          <label className="col-sm-2 col-form-label">Url</label>
          <div className="col-sm-10">
            <input type="text" className="form-control" name="url" placeholder="Blog url" value={url} onChange={this.handleChange} />
          </div>
        </div>

        <button type="submit" className="btn btn-success" disabled={disableBtn}>Create</button>
      </form>
    )
  }
}

export default connect(null, { notify })(CreateNewBlogForm)
