const Blog = require('../config/models')

module.exports = {
  getAll() {
    return Blog.find()
  },

  create(data) {
    const blog = new Blog(data)
    return blog.save()
  },

  async delete(_id) {
    return await Blog.deleteOne({ _id })
  }
}
