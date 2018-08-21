const apiService = require('../services/apiService')

const put = async (req, res, next) => {
  const personData = req.body
  const personId = req.params.id
  const data = await apiService.update(personId, personData)

  return res.json(data)
}

module.exports = put
