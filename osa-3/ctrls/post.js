const apiService = require('../services/apiService')

const post = async (req, res, next) => {
  const personData = req.body
  const data = await apiService.create(personData)
  console.log(data)

  return res.json(data)
}

module.exports = post
