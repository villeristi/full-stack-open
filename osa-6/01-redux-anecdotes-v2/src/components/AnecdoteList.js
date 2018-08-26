import React from 'react'

import { voteAnecdote } from '../reducers/anecdoteReducer'

class AnecdoteList extends React.Component {

  handlevote = (item) => {
    this.props.store.dispatch(voteAnecdote(item))
  }

  render() {
    const anecdotes = this.props.store.getState()

    return (
      <div>
        <h2>Anecdotes</h2>
        {anecdotes.sort((a, b) => b.votes - a.votes).map(anecdote =>
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
