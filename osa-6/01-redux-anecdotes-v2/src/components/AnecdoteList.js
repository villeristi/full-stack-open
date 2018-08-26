import React from 'react'

import { voteAnecdote } from '../reducers/anecdoteReducer'
import { addNotification } from '../reducers/notificationReducer'

class AnecdoteList extends React.Component {

  handlevote = (item) => {
    this.props.store.dispatch(voteAnecdote(item))
    this.props.store.dispatch(addNotification(`You voted ${item.content}`))
  }

  render() {
    const { anecdotes, filter } = this.props.store.getState()
    const filteredAnecdotes = anecdotes.filter((item) => item.content.toLowerCase().indexOf(filter) !== -1)

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

export default AnecdoteList
