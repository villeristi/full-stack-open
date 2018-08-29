const initialState = {
  message: null,
  status: null,
}

const reducer = (store = initialState, action) => {
  switch(action.type){
    case 'NOTIFICATION/SET':
      return action.notification
    case 'NOTIFICATION/CLEAR':
      return initialState
    default:
      return store
  }
}

export const notify = (message, status = 'success', timeout = 3000) => {
  return (dispatch) => {
    dispatch({
      type: 'NOTIFICATION/SET',
      notification: {
        message,
        status,
      },
    })

    return setTimeout(() => dispatch({ type: 'NOTIFICATION/CLEAR' }), timeout)
  }
}

export default reducer
