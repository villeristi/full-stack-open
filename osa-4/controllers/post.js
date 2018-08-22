const blogService = require('../services/blogService')

const post = async (req, res, next) => {
  const blogData = req.body
  try {
    const data = await blogService.create(blogData)

    return res.status(201).json(data)
  } catch (e) {
    return res.status(500).json(e )
  }
}

module.exports = post
