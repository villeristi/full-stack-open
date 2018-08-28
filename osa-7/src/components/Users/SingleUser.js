import React from 'react'
import { connect } from 'react-redux'
import { fetchAll } from '../../store/userReducer'

class UserList extends React.Component {
  componentDidMount() {
    const { users, fetchAll } = this.props

    if(!users.length) {
      fetchAll()
    }
  }

  render() {
    const { currentUser } = this.props

    if(!currentUser) {
      return null
    }

    return (
      <div>
        <h2>{currentUser.name}</h2>
        <strong>Added blogs:</strong>

        <ul>
          {!!currentUser.blogs.length && currentUser.blogs.map((blog) => {
            return (
              <li key={blog.id}>{blog.title}</li>
            )
          })}
        </ul>
      </div>
    )
  }
}

export default connect(({ users }, { match }) => {
  const currentUser = users.find(({ id }) => id === match.params.id)
  return {
    currentUser,
    users,
  }
}, { fetchAll })(UserList)
