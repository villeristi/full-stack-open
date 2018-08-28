import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import authReducer from './authReducer'
import blogReducer from './blogReducer'
import userReducer from './userReducer'
import notificationReducer from './NotificationReducer'

const reducers = combineReducers({
  auth: authReducer,
  users: userReducer,
  blogs: blogReducer,
  notification: notificationReducer,
})

export default createStore(
  reducers,
  applyMiddleware(thunk)
)
