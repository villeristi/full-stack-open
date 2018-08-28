import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import authReducer from './authReducer'
import blogReducer from './blogReducer'
import userReducer from './userReducer'

const reducers = combineReducers({
  auth: authReducer,
  users: userReducer,
  blogs: blogReducer,
})

export default createStore(
  reducers,
  applyMiddleware(thunk)
)
