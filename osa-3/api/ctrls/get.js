const apiService = require('../services/apiService')

module.exports = async (req, res, next) => {
  const personId = req.params.id

  if( personId ) {
    const person = await apiService.get(personId)

    if( !person ) {
      return res.json({msg: `Person with id ${personId} not found`}, 404)
    }

    return res.json(person)
  }

  const data = await apiService.getAll()
  return res.json(data)
}
