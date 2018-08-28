import * as blogService from '../services/blogService'
import { notify } from './NotificationReducer'

const initialState = []

const reducer = (store = initialState, action) => {
  switch(action.type){
    case 'BLOGS/FETCH':
      return [...action.blogs]
    case 'BLOGS/LIKE':
      const index = store.findIndex(({ id }) => id === action.blog.id)
      store[index] = action.blog
      return [...store ]
    case 'BLOGS/DELETE':
      return [...action.blogs]
    default:
      return store
  }
}

export const fetchBlogs = () => {
  return async (dispatch) => {
      try {
      const blogs = await blogService.getAll()
      return dispatch({
        type: 'BLOGS/FETCH',
        blogs
      })
    } catch(e) {
      return dispatch(notify(e.message, 'error'))
    }
  }
}

export const removeBlog = (id) => {
  return async (dispatch) => {
    try {
      await blogService.remove(id)
      const blogs = await blogService.getAll()
      return dispatch({
        type: 'BLOGS/DELETE',
        blogs
      })
    } catch(e) {
      return dispatch(notify(e.message, 'error'))
    }
  }
}

export const likeBlog = (blogData) => {
  blogData.likes = blogData.likes + 1
  return async (dispatch) => {
    try {
      const blog = await blogService.like(blogData)
      return dispatch({
        type: 'BLOGS/LIKE',
        blog
      })
    } catch(e) {
      return dispatch(notify(e.message, 'error'))
    }
  }
}

export default reducer
