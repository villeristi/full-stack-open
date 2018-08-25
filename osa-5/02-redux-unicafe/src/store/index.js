import { VALUES } from '../constants'

export const initialState = {
  [VALUES.good.value]: 0,
  [VALUES.neutral.value]: 0,
  [VALUES.bad.value]: 0,
}

const counterReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GOOD':
      return {...state, [VALUES.good.value]: state[VALUES.good.value] + 1}
    case 'OK':
      return {...state, [VALUES.neutral.value]: state[VALUES.neutral.value] + 1}
    case 'BAD':
      return {...state, [VALUES.bad.value]: state[VALUES.bad.value] + 1}
    case 'ZERO':
      return state
  }
  return state
}

export default counterReducer
