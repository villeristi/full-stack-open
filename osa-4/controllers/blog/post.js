const blogService = require('../../services/blogService')

const post = async (req, res) => {
  const blogData = req.body
  try {
    const data = await blogService.create(blogData)

    return res.status(201).json(data)
  } catch (e) {
    const status = e.name && e.name === 'ValidationError' ? 400 : 500
    return res.status(status).json(e)
  }
}

module.exports = post
