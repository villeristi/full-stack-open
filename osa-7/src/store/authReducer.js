import * as authService from '../services/authService'

const initialState = null

const reducer = (store = initialState, action) => {
  switch(action.type){
    case 'AUTH/LOGIN':
        return action.user
    case 'AUTH/LOGOUT':
      return initialState
    case 'AUTH/SET':
      return { ...store, ...action.user }
    default:
      return store
  }
}

export const login = (credentials) => {
  return async (dispatch) => {
    const user = await authService.login(credentials)
    return dispatch({
      type: 'AUTH/LOGIN',
      user
    })
  }
}

export const setUser = (user) => {
  return {
    type: 'AUTH/SET',
    user
  }
}

export const logout = () => {
  return async (dispatch) => {
    await authService.logout()
    return dispatch({
      type: 'AUTH/LOGOUT',
      user: {}
    })
  }
}

export default reducer
