import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import NavBar from './Navbar'
import CreateNewBlogForm from '../Blog/CreateBlogForm'

class Header extends React.Component {

  static propTypes = {
    auth: PropTypes.object,
  }

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
