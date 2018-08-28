import * as userService from '../services/userService'

const initialState = []

const reducer = (store = initialState, action) => {
  switch(action.type) {
    case 'USERS/FETCH':
        return action.users
    case 'USERS/FETCH_SINGLE':
      return initialState
    default:
      return store
  }
}

export const fetchAll = () => {
  return async (dispatch) => {
    const users = await userService.getAll()
    return dispatch({
      type: 'USERS/FETCH',
      users
    })
  }
}

export const fetchSingle = (id) => {
  return async (dispatch) => {
    const user = await userService.getSingle(id)
    return dispatch({
      type: 'USERS/FETCH_SINGLE',
      user
    })
  }
}

export default reducer
