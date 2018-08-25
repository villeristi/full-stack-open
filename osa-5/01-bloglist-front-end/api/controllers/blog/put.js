const blogService = require('../../services/blogService')

const put = async (req, res) => {

  const id = req.params.id
  const blogData = req.body

  try {
    const data = await blogService.update(id, blogData)

    return res.status(200).json(data)
  } catch (e) {
    const status = e.name && e.name === 'ValidationError' ? 400 : 500
    return res.status(status).json(e)
  }
}

module.exports = put
