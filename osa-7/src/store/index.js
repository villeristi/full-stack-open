import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import authReducer from './authReducer'
import blogReducer from './blogReducer'

const reducers = combineReducers({
  user: authReducer,
  blogs: blogReducer,
})

export default createStore(
  reducers,
  applyMiddleware(thunk)
)
