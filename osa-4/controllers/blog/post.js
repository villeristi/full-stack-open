const userService = require('../../services/userService')
const blogService = require('../../services/blogService')

const post = async (req, res) => {
  const blogData = req.body

  try {
    const user = await userService.get(blogData.user)
    const data = await blogService.create(blogData)
    user.blogs.push(data._id)
    await userService.save(user)

    return res.status(201).json(data)
  } catch (e) {
    const status = e.name && e.name === 'ValidationError' ? 400 : 500
    return res.status(status).json(e)
  }
}

module.exports = post
