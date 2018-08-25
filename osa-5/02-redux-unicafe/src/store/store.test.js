import deepFreeze from 'deep-freeze'
import reducer, { initialState } from './index'
import { VALUES } from '../constants';

describe('unicafe reducer', () => {

  let state

  beforeEach(() => {
    state = initialState
  })

  test('should return a proper initial state when called with undefined state', () => {
    const action = {
      type: 'DO_NOTHING'
    }

    const newState = reducer(undefined, action)
    expect(newState).toEqual(initialState)
  })

  test('Good is incremented', () => {
    const action = {
      type: VALUES.good.value.toUpperCase()
    }

    deepFreeze(state)
    const newState = reducer(state, action)
    expect(newState).toEqual({
      [VALUES.good.value]: 1,
      [VALUES.neutral.value]: 0,
      [VALUES.bad.value]: 0
    })
  })

  it('Neutral is incremented', () => {
    const action = {
      type: VALUES.neutral.value.toUpperCase()
    }

    deepFreeze(state)
    const newState = reducer(state, action)
    expect(newState).toEqual({
      [VALUES.good.value]: 0,
      [VALUES.neutral.value]: 1,
      [VALUES.bad.value]: 0
    })
  })

  test('Bad is incremented', () => {
    const action = {
      type: VALUES.bad.value.toUpperCase()
    }

    deepFreeze(state)
    const newState = reducer(state, action)
    expect(newState).toEqual({
      [VALUES.good.value]: 0,
      [VALUES.neutral.value]: 0,
      [VALUES.bad.value]: 1
    })
  })
})
