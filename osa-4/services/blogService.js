const Blog = require('../config/models')

module.exports = {
  getAll() {
    return Blog.find()
  },

  create(data) {
    try {
      const blog = new Blog(data)

      return blog.save()
    } catch(e) {
      return e
    }
  }
}
