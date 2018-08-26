const initialState = ''

const reducer = (store = initialState, action) => {
  switch(action.type){
    case 'FILTER/SET':
      return action.filter
    default:
      return store
  }
}

export const setFilter = (filter = '') => {
  return {
    type: 'FILTER/SET',
    filter
  }
}

export default reducer
