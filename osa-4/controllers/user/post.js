const { createHash } = require('../../config/helpers')
const userService = require('../../services/userService')

const MIN_PWD_LENGTH = 3

const post = async (req, res) => {
  const userData = req.body

  if( userData.password.length < MIN_PWD_LENGTH ) {
    return res.status(400).json({ msg: `Salasanan tulee olla vähintään ${MIN_PWD_LENGTH} merkkiä pitkä` })
  }

  try {
    userData.password = await createHash(userData.password)
    const data = await userService.create(userData)

    return res.status(201).json(data)
  } catch (e) {
    const status = e.name && e.name === 'ValidationError' ? 401 : 500
    return res.status(status).json(e)
  }
}

module.exports = post
