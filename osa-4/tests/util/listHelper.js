module.exports = {
  totalLikes(blogData = []) {
    return blogData.reduce((a, { likes }) => a + likes, 0)
  },

  favoriteBlog(blogData = []) {
    return blogData.reduce((a, b) => b.likes > a.likes ? b : a, blogData[0])
  }
}
