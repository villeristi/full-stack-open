import * as anecdoteService from '../services/anecdoteService'

const initialState = []

const createId = () => (100000 * Math.random()).toFixed(0)


const reducer = (store = initialState, action) => {
  switch(action.type){
    case 'ANECDOTES/GETALL':
        return [...store, ...action.anecdotes]
    case 'ANECDOTES/VOTE':
      const old = store.filter(a => a.id !== action.item.id)
      const voted = store.find(a => a.id === action.item.id)

      return [...old, { ...voted, votes: action.item.votes} ]
    case 'ANECDOTES/CREATE':
      return [...store, action.item ]
    default:
      return store
  }
}

export const fetchAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    return dispatch({
      type: 'ANECDOTES/GETALL',
      anecdotes
    })
  }
}

export const voteAnecdote = (item) => {
  return async (dispatch) => {
    const updated = await anecdoteService.update(item.id, { ...item, votes: item.votes + 1 })
    return dispatch({
      type: 'ANECDOTES/VOTE',
      item: { ...updated }
    })
  }
}

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const item = await anecdoteService.create({
      content,
      votes: 0,
      id: createId(),
    })

    return dispatch({
      type: 'ANECDOTES/CREATE',
      item,
    })
  }
}

export default reducer
