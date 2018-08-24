const listHelper = require('./util/listHelper')
const dummyBlogs = require('./util/blogs')

describe('List helpers', () => {
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

    test('Finds the author with most likes', () => {
      const mostLikedAuthor = { author: 'Edsger W. Dijkstra', likes: 12 }

      expect(listHelper.mostLikes(dummyBlogs)).toEqual(mostLikedAuthor)
    })
  })

  describe('Most active', () => {
    test('Finds the author with most blogs', () => {
      const mostActive = { author: 'Robert C. Martin', blogCount: 3 }

      expect(listHelper.mostBlogs(dummyBlogs)).toEqual(mostActive)
    })
  })
})
