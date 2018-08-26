import React from 'react'
import { connect } from 'react-redux'

import { setFilter } from '../reducers/filterReducer'

class Filter extends React.Component {

  handleUpdate = (e) => {
    const { setFilter } = this.props

    setFilter(e.target.value)
  }

  render() {

    const { filter } = this.props

    return(
      <div>
        Filter <input type="text" value={filter} onChange={this.handleUpdate} />
      </div>
    )
  }
}

export default connect((state) => {
  return {
    filter: state.filter
  }
}, { setFilter })(Filter)

