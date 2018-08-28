const { Blog, User } = require('../config/models')

module.exports = {
  getAll() {
    return Blog.find({}).populate('user')
  },

  get(id) {
    return Blog.findById(id)
  },

  create(data) {
    const blog = new Blog(data)
    return blog.save()
  },

  async update(id, data) {
    return Blog.findByIdAndUpdate(id, { ...data }, { new: true }).populate('user')
  },

  async delete(_id) {
    const blog = await Blog.findById(_id)
    const user = await User.findById(blog.user)

    await blog.remove()
    return await user.blogs.pull(_id)
  }
}
