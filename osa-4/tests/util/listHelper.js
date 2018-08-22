const { chain, countBy } = require('lodash')

module.exports = {
  totalLikes(blogData = []) {
    return blogData.reduce((a, { likes }) => a + likes, 0)
  },

  favoriteBlog(blogData = []) {
    return blogData.reduce((a, b) => b.likes > a.likes ? b : a, blogData[0])
  },

  mostBlogs(blogData = []) {
    const authors = blogData.map(({author}) => author)
    const mostActive = chain(authors)
                        .countBy()
                        .entries()
                        .maxBy('[1]')
                        .head()
                        .value()
    const blogCount = countBy(authors)[mostActive]

    return { author: mostActive, blogCount }
  }
}
