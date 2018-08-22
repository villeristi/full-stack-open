module.exports = {
  totalLikes(blogData = []) {
    return blogData.reduce((a, { likes }) => a + likes, 0)
  }
}
