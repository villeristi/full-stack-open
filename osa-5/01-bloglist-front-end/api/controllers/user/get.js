const userService = require('../../services/userService')

module.exports = async (req, res) => {
  const data = await userService.getAll()
  return res.json(data)
}
