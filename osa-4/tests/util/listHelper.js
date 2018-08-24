const supertest = require('supertest')
const { chain, countBy } = require('lodash')

const app = require('../../index')
const api = supertest(app)

const { Blog, User } = require('../../config/models')

module.exports = {

  getApp() {
    return api
  },

  totalLikes(blogData = []) {
    return blogData.reduce((a, { likes }) => a + likes, 0)
  },

  mostLikes(blogData = []) {
    const authorLikes = chain(blogData)
                          .groupBy(({author}) => author)
                          .map((value, key) => {
                            const likes = value.reduce((a, { likes }) => likes, 0)
                            return { author: key, likes }
                          })
                          .maxBy('likes')
                          .value()

    return authorLikes
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
  },

  async blogsInDb() {
    return await Blog.find({})
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
