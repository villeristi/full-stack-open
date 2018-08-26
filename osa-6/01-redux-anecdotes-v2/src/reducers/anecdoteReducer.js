const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000*Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)

const reducer = (store = initialState, action) => {
  switch(action.type){
    case 'ANECDOTE/VOTE':
      const old = store.filter(a => a.id !== action.item.id)
      const voted = store.find(a => a.id === action.item.id)

      return [...old, { ...voted, votes: action.item.votes} ]
    case 'ANECDOTE/CREATE':
      return [...store, action.data ]
    default:
      return store
  }
}

export const voteAnecdote = (item) => {
  return {
    type: 'ANECDOTE/VOTE',
    item: { ...item, votes: item.votes + 1 }
  }
}

export const createAnecdote = (content) => {
  return {
    type: 'ANECDOTE/CREATE',
    data: {
      content,
      votes: 0,
      id: getId()
    }
  }
}

export default reducer