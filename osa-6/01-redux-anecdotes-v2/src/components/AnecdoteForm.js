import React from 'react'
import { connect } from 'react-redux'

import { createAnecdote } from '../reducers/anecdoteReducer'
import { addNotification } from '../reducers/notificationReducer'

class AnecdoteForm extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault()
    const content = e.target.anecdote.value
    this.props.createAnecdote(content)
    this.props.addNotification(`You created ${content}`)

    e.target.anecdote.value = ''
  }
   render() {
     return (
       <div>
      <h2>create new</h2>
        <form onSubmit={this.handleSubmit}>
          <input name='anecdote' />
          <button>create</button>
        </form>
      </div>
     )
   }
}

export default connect(null, { createAnecdote, addNotification })(AnecdoteForm)
