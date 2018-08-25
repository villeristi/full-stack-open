const jwt = require('jsonwebtoken')

const userService = require('../../services/userService')
const blogService = require('../../services/blogService')

const post = async (req, res) => {
  const blogData = req.body

  try {

    const { id } = jwt.verify(req.token, process.env.SECRET)

    if ( !req.token || !id) {
      return res.status(401).json({ error: 'token missing or invalid' })
    }

    const user = await userService.get(id)
    blogData.user = user._id
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
