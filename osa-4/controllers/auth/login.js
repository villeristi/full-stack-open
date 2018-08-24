const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const userService = require('../../services/userService')

module.exports = async (req, res) => {
  const { username, password } = req.body
  const user = await userService.findBy({ 'username': username })
  const correctPassword = user === null ? false : await bcrypt.compare(password, user.password)

  if ( !( user && correctPassword ) ) {
    return res.status(401).json({ error: 'Invalid credentials' })
  }

  const userForToken = {
    username: user.username,
    id: user.id
  }

  const token = jwt.sign(userForToken, process.env.SECRET)

  res.status(200).send({ token })
}
