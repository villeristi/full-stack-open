import React from 'react'
import { shallow } from 'enzyme'

import App from './App'
import * as storage from './util/localStorage'

const user = {
  name: 'test',
  username: 'test',
  token: 'test'
}
const dum = jest.fn()

describe('<App />', () => {
  let AppComponent

  beforeEach(() => {
    AppComponent = shallow(<App />)
  })

  describe('App', () => {
    test('Exists', () => {
      expect(AppComponent).toBeTruthy()
    })
  })

  describe('Login', () => {
    test('Display for non-logged users', () => {
      const loginForm = AppComponent.find('.login-form')
      expect(loginForm).toBeTruthy()
    })

    test('Displays blogs for logge-in users', () => {
      storage.set('user', user)
      const blogs = AppComponent.find('.blogs-container')
      expect(blogs).toBeTruthy()
    })
  })
})
