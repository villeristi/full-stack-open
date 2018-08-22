const apiService = require('../services/apiService')

const post = async (req, res, next) => {
  const personData = req.body
  try {
    const data = await apiService.create(personData)

    return res.json(data)
  } catch (e) {
    return res.json(e.errors.name, 500)
  }
}

module.exports = post
