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

    return (
      <div>
        <h2>Single</h2>
        <p>{!!currentUser && currentUser.name}</p>
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
