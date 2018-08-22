const apiService = require('../services/apiService')

const del = async (req, res, next) => {
  const personId = req.params.id
  await apiService.delete(personId)

  return res.json({msg: `Deleted person with id ${personId}`})
}

module.exports = del
