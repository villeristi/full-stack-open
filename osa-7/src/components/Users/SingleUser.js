import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchAll } from '../../store/userReducer'

class UserList extends React.Component {

  static propTypes = {
    users: PropTypes.Array,
    fetchAll: PropTypes.Function,
    currentUser: PropTypes.object,
  }

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
        <h1 className=" mb-2 pb-2"><i className="fa fa-user"></i> {currentUser.name}</h1>
        <div className="card">
          <div className="card-header">
            Added blogs <small className="text-muted pull-right">comments</small>
          </div>
          <ul className="list-group list-group-flush">
            {!!currentUser.blogs.length && currentUser.blogs.map(({ id, title, comments }) => {
              return (
                <Link key={id} to={`/blogs/${id}`} className="list-group-item d-flex justify-content-between align-items-center">
                  {title} <span className="badge badge-primary badge-pill">{comments.length}</span>
                </Link>
              )
            })}
          </ul>
        </div>
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
