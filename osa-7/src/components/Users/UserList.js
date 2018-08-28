import React from 'react'
import { Link} from 'react-router-dom'
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

    const { users } = this.props

    return (
      <div>
        <h2>Users</h2>
        <table>
          <thead>
            <tr><td /><td>Blogs added</td></tr>
          </thead>
          <tbody>
              {!!users.length && users.map((user) => {
                return (
                  <tr key={user.id}>
                    <td><Link to={`/users/${user.id}`}>{user.username}</Link></td>
                    <td>{user.blogs.length}</td>
                  </tr>
                )
              })}
          </tbody>
        </table>
      </div>
    )
  }
}

export default connect(({ users, auth }) => {
  return {
    users,
  }
}, { fetchAll })(UserList)
