const blogService = require('../../services/blogService')

const comment = async (req, res) => {

  const id = req.params.id
  const { comment } = req.body

  try {
    const blog = await blogService.get(id)
    blog.comments.push(comment)

    const data = await blogService.update(id, blog.toJSON())

    return res.status(200).json(data)
  } catch (e) {
    console.log(e)
    const status = e.name && e.name === 'ValidationError' ? 400 : 500
    return res.status(status).json(e)
  }
}

module.exports = comment
