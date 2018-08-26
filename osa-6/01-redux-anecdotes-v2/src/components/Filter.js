import React from 'react'

import { setFilter } from '../reducers/filterReducer'

export default class Filter extends React.Component {

  handleUpdate = (e) => {
    const { store } = this.props

    store.dispatch(setFilter(e.target.value))
  }

  render() {

    const { filter } = this.props.store.getState()

    return(
      <div>
        Filter <input type="text" value={filter} onChange={this.handleUpdate} />
      </div>
    )
  }
}
