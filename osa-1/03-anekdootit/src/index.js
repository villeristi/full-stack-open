import React from 'react'
import ReactDOM from 'react-dom'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: 0,
      votes: {},
    }
  }

  getRandom = () => {
    const highlyRandom = Math.floor(Math.random() * anecdotes.length)

    if(highlyRandom === this.state.selected) {
      return this.getRandom()
    }

    return this.setState(() => ({selected: highlyRandom}))
  }

  addVote = () => {
    const currentVotes = this.state.votes[this.state.selected]
    return this.setState(() => {
      return {
        votes: {
          ...this.state.votes,
          [this.state.selected]: !!currentVotes ? currentVotes + 1 : 1,
        }
      }
    })
  }

  render() {

    const { votes, selected } = this.state
    const mostVotedAnecdote = Object.keys(votes).reduce((a, b) => votes[a] > votes[b] ? a : b, null);
    const voteCount = this.state.votes[mostVotedAnecdote]
    const currentAnecdoteVoteCount = this.state.votes[selected]

    return (
      <div>
        <p>{this.props.anecdotes[selected]} <br />
        has {currentAnecdoteVoteCount > 0 ? currentAnecdoteVoteCount : 0} vote{currentAnecdoteVoteCount > 1 || currentAnecdoteVoteCount === undefined ? 's' : ''}
        </p>
        <button onClick={this.addVote}>vote</button>
        <button onClick={this.getRandom}>next anecdote</button>

        <h3>anecdote with most votes:</h3>
        {!!mostVotedAnecdote && this.props.anecdotes[mostVotedAnecdote]}
        {!!mostVotedAnecdote && (<p>has {voteCount > 0 ? voteCount : 0} vote{voteCount > 1 || voteCount === undefined ? 's' : ''}</p>) }
      </div>
    )
  }
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
