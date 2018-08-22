const listHelper = require('./util/listHelper')
const dummyBlogs = require('./util/blogs')

describe('total likes', () => {
  test('Calculate total likes of all blogs', () => {
    const result = listHelper.totalLikes(dummyBlogs)
    expect(result).toBe(36)
  })
})

describe('Most likes', () => {
  test('Finds the blog with most likes', () => {
    const mostLikedTitle = 'Canonical string reduction'

    expect(listHelper.favoriteBlog(dummyBlogs).title).toEqual(mostLikedTitle)
  })
})
