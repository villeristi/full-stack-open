const supertest = require('supertest')

const app = require('../index')
const api = supertest(app)

const { Blog, User } = require('../config/models')

module.exports = {

  getApp() {
    return api
  },

  async getOne() {
    return await Blog.findOne()
  },

  getDummyBlogs() {
    return [
      {
        title: "asd",
        author: "asd",
        likes: 12
      },
      {
        title: "asd",
        author: "asd",
      },
    ]
  },

  async addInitialBlogs(user) {
    return this.getDummyBlogs().forEach(async (blogData) => {
      blogData.user = user._id
      await Blog.create(blogData)
    })
  },

  async addInitialUsers() {
    const initialUsers = [
      {
        name: "asd",
        username: "asd",
        password: "1234"
      },
      {
        name: "asdasd",
        username: "asdasd",
        password: "1234",
        adult: false,
      }
    ]

    return initialUsers.forEach(async (userData) => {
      const user = new User(userData)
      await user.save()
    })
  },

  tearDownBlogs() {
    return Blog.deleteMany({})
  },

  tearDownUsers() {
    return User.deleteMany({})
  }
}
