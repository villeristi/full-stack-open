import React from 'react'
import { connect } from 'react-redux'

import NavBar from './Navbar'
import CreateNewBlogForm from '../Blog/CreateBlogForm';

class Header extends React.Component {
  render() {

    if(!this.props.auth) {
      return null
    }

    return (
      <div>
        <NavBar title={'Lé Blog app'} />

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
