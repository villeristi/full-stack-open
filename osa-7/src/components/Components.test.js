import React from 'react'
import { shallow } from 'enzyme'

import Blog from './Blog'
import Togglable from './Togglable'

const blog = {
  title: 'BlogTitle',
  author: 'SomeAuthor',
  likes: 12,
  user: null
}

const dum = jest.fn()

describe('Components', () => {

  let BlogComponent
  let ToggleComponent

  beforeEach(() => {
    BlogComponent = shallow(<Blog blog={blog} handleDelete={dum} handleLike={dum} />)
    ToggleComponent = shallow(<Togglable title={blog.title}><Blog blog={blog} handleDelete={dum} handleLike={dum} /></Togglable>)
  })


  describe('<Blog />', () => {
    test('Exists', () => {
      expect(BlogComponent).toBeTruthy()
    })

    test('Clicks get called', () => {
      const btn = BlogComponent.find('button')

      btn.simulate('click')
      btn.simulate('click')

      expect(dum.mock.calls.length).toBe(2)
    })
  })

  describe('<Togglable />', () => {
    test('After clicking name the details are displayed', () => {
      const titleDiv = ToggleComponent.find('.title')
      const blogContent = ToggleComponent.find('.blog-content')

      expect(blogContent.getElement().props.style.display).toEqual('none')

      titleDiv.simulate('click')

      expect(ToggleComponent.find('.blog-content').getElement().props.style.display).toEqual('')
    })
  })
})
