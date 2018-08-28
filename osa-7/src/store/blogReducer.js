import * as blogService from '../services/blogService'

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
    const blogs = await blogService.getAll()
    return dispatch({
      type: 'BLOGS/FETCH',
      blogs
    })
  }
}

export const createBlog = (blogData) => {
  return async (dispatch) => {
    await blogService.create(blogData)
    const blogs = await blogService.getAll()
    return dispatch({
      type: 'BLOGS/FETCH',
      blogs
    })
  }
}

export const removeBlog = (id) => {
  return async (dispatch) => {
    await blogService.remove(id)
    const blogs = await blogService.getAll()
    return dispatch({
      type: 'BLOGS/DELETE',
      blogs
    })
  }
}

export const likeBlog = (blogData) => {
  blogData.likes = blogData.likes + 1
  return async (dispatch) => {
    const blog = await blogService.like(blogData)
    return dispatch({
      type: 'BLOGS/LIKE',
      blog
    })
  }
}

export default reducer
