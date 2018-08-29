import React from 'react'
import { shallow } from 'enzyme'

import App from '../../App'
import Togglable from '../Togglable'

const dum = jest.fn()

describe('Components', () => {

  let ToggleComponent

  beforeEach(() => {
    ToggleComponent = shallow(<Togglable title={'Testing'}><p>Testings</p></Togglable>)
  })

  describe('<Togglable />', () => {
    test('After clicking name the details are displayed', () => {
      const titleDiv = ToggleComponent.find('.title')
      const blogContent = ToggleComponent.find('.toggle-content')

      expect(blogContent.getElement().props.style.display).toEqual('none')

      titleDiv.simulate('click')

      expect(ToggleComponent.find('.toggle-content').getElement().props.style.display).toEqual('')
    })
  })
})
