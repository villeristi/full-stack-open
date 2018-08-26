import React from 'react'

const Anecdote = ({ item, addVote }) => {
  return (
    <div>
      <p>{item.content} <br />
      has {item.votes > 0 ? item.votes : 0} vote{item.votes > 1 || item.votes === undefined ? 's' : ''}
      </p>
      <button onClick={addVote}>vote</button>
    </div>
  )
}

export default Anecdote
