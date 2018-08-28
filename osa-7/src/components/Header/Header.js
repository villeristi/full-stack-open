import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'


import CreateNewBlogForm from '../Blog/CreateBlogForm';
import CurrentUser from '../Auth/currentUser'

class Header extends React.Component {

  constructor() {
    super()

    this.state = {
      displayNewForm: false,
    }
  }

  toggleCreateForm = () => {
    return this.setState({ displayNewForm: !this.state.displayNewForm })
  }

  render() {
    const { auth } = this.props
    const { displayNewForm } = this.state

    if(!auth) {
      return null
    }

    return (
      <div>
        <h1>Lé Blog app</h1>

        <CurrentUser />

        {!displayNewForm && <button onClick={this.toggleCreateForm}>create new</button>}

        <CreateNewBlogForm
          displayNotification={this.displayNotification}
          fetchBlogs={this.fetchBlogs}
          toggle={this.toggleCreateForm}
          visible={displayNewForm}
        />
      </div>
    )
  }
}

export default withRouter(connect(({ auth }) => ({ auth }))(Header))
