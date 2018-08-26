export const initialState = {
  anecdotes: [
    {
      content: 'If it hurts, do it more often',
      votes: 0
    },
    {

      content: 'Adding manpower to a late software project makes it later!',
      votes: 0
    },
    {
      content: 'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
      votes: 0
    },
    {
      content: 'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
      votes: 0
    },
    {
      content: 'Premature optimization is the root of all evil.',
      votes: 0
    },
    {
      content: 'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
      votes: 0
    },
  ]
}

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'VOTE':
      const { index } = action
      state.anecdotes[index].votes = state.anecdotes[index].votes + 1
      return {...state, anecdotes: [...state.anecdotes ] }
    case 'ADD':
      const { item } = action
      return {...state, anecdotes: [...state.anecdotes, item ] }
    default:
      return state
  }
}

export default rootReducer
