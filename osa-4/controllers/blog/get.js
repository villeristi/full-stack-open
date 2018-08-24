const blogService = require('../../services/blogService')

module.exports = async (req, res) => {
  const data = await blogService.getAll()
  return res.json(data)
}
