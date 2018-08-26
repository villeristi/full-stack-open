import React from 'react'
import { connect } from 'react-redux'

import { fetchAnecdotes } from './reducers/anecdoteReducer'

import Notification from './components/Notification'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Filter from './components/Filter';

class App extends React.Component {

  componentDidMount() {
    if(!this.props.anecdotes.length) {
      this.props.fetchAnecdotes()
    }
  }

  render() {
    return (
      <div>
        <h1>Programming anecdotes</h1>
        <Notification />
        <Filter />
        <AnecdoteList />
        <AnecdoteForm />
      </div>
    )
  }
}

export default connect(({ anecdotes }) => ({ anecdotes }), { fetchAnecdotes })(App)
