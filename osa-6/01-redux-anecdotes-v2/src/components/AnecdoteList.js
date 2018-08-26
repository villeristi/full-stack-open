import React from 'react'
import { connect } from 'react-redux'

import { voteAnecdote } from '../reducers/anecdoteReducer'
import { addNotification } from '../reducers/notificationReducer'

class AnecdoteList extends React.Component {

  handlevote = (item) => {
    this.props.voteAnecdote(item)
    this.props.addNotification(`You voted ${item.content}`)
  }

  render() {
    const {filteredAnecdotes } = this.props

    return (
      <div>
        <h2>Anecdotes</h2>
        {filteredAnecdotes.sort((a, b) => b.votes - a.votes).map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => this.handlevote(anecdote)}>
                vote
              </button>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default connect((state) => {
  return {
    filteredAnecdotes: state.anecdotes.filter(item => item.content.toLowerCase().includes(state.filter)),
  }
}, { voteAnecdote, addNotification })(AnecdoteList)
