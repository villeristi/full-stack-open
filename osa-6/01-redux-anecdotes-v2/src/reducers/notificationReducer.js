const initialState = {
  message: null,
  status: null
}

const reducer = (store = initialState, action) => {
  switch(action.type){
    case 'NOTIFICATION/ADD':
      return {...store, ...action.notification}
    case 'NOTIFICATION/CLEAR':
      return {...store, ...action.notification}
    default:
      return store
  }
}

export const addNotification = (message, status = 'success', timeout = 3000) => {
  return async (dispatch) => {
    dispatch({
      type: 'NOTIFICATION/ADD',
      notification: {
        message,
        status
      }
    })
    setTimeout(() => {
      dispatch({
        type: 'NOTIFICATION/CLEAR',
        notification: initialState
      })
    }, 2000)
  }
}

export default reducer
