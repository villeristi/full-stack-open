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
      <div className="card">
        <div className="card-header">
          <i className="fa fa-user"></i> User <small className="text-muted pull-right">blogs</small>
        </div>
        <ul className="list-group list-group-flush">
          {!!users.length && users.map(({ id, username, blogs }) => {
            return (
              <Link key={id} to={`/users/${id}`} className="list-group-item d-flex justify-content-between align-items-center">
                {username} <span className="badge badge-primary badge-pill">{blogs.length}</span>
              </Link>
            )
          })}
        </ul>
      </div>
    )
  }
}

export default connect(({ users, auth }) => {
  return {
    users,
  }
}, { fetchAll })(UserList)
