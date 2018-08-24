const blogService = require('../../services/blogService')

module.exports = async (req, res) => {
  await blogService.delete(req.params.id)
  return res.json({msg: `deleted blog with id ${req.params.id}`})
}
