import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import anecdoteReducer from './reducers/anecdoteReducer'
import notificationReducer from './reducers/notificationReducer'

const reducers = combineReducers({
  notification: notificationReducer,
  anecdotes: anecdoteReducer
})

export default createStore(
  reducers,
  applyMiddleware(thunk)
)
