import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import CurrentUser from '../Auth/currentUser'

const NavBar = ({ title }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4">
      <Link className="navbar-brand" to={'/'}>{title}</Link>
      <div className="collapse navbar-collapse" id="navbarText">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link className="nav-link" to={'/'}>Blogs</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to={'/users'}>Users</Link>
          </li>
        </ul>
        <CurrentUser />
      </div>
    </nav>
  )
}

NavBar.propTypes = {
  title: PropTypes.string,
}

export default NavBar
