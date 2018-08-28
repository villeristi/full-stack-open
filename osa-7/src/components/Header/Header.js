import React from 'react'
import { connect } from 'react-redux'

import CreateNewBlogForm from '../Blog/CreateBlogForm';
import CurrentUser from '../Auth/currentUser'

class Header extends React.Component {
  render() {

    if(!this.props.auth) {
      return null
    }

    return (
      <div>
        <h1>Lé Blog app</h1>

        <CurrentUser />

        <CreateNewBlogForm
          displayNotification={this.displayNotification}
          fetchBlogs={this.fetchBlogs}
          toggle={this.toggleCreateForm}
        />
      </div>
    )
  }
}

export default connect(({ auth }) => ({ auth }))(Header)
