import React from 'react'

import Anecdote from './components/Anecdote'

export default class App extends React.Component {
  constructor() {
    super()

    this.state = {
      val: ''
    }
  }

  addVote = (index) => {
    const { store: { dispatch } } = this.props
    return dispatch({ type: 'VOTE', index })
  }

  createNew = (e) => {
    e.preventDefault()
    const { store: { dispatch } } = this.props
    const item = { content: this.state.val, votes: 0 }

    this.setState({ val: '' })

    return dispatch({ type: 'ADD', item })
  }

  handleChange = (e) => {
    return this.setState({ val: e.target.value })
  }

  render() {
    const { anecdotes } = this.props.store.getState()
    anecdotes.sort((a, b) => (a.votes < b.votes) ? 1 : ((b.votes > a.votes) ? -1 : 0))

    return (
      <div>
        <h1>Anecdotes</h1>
        {anecdotes.map((item, index) => <Anecdote key={index} item={item} addVote={() => this.addVote(index)} />)}

        <h3>Create new</h3>
        <form onSubmit={this.createNew}>
          <input type="text" value={this.state.val} onChange={this.handleChange} />
          <button type="submit">Create</button>
        </form>
      </div>
    )
  }
}
