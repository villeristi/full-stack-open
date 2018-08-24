const jwt = require('jsonwebtoken')

const blogService = require('../../services/blogService')
const userService = require('../../services/userService')

module.exports = async (req, res) => {

  if( !req.token ) {
    return res.status(401).json({ error: 'token missing or invalid' })
  }

  const { id } = jwt.verify(req.token, process.env.SECRET)

  if (!id) {
    return res.status(401).json({ error: 'token missing or invalid' })
  }

  const blog = await blogService.get(req.params.id)
  const user = await userService.get(id)

  if ( blog.user.toString() !== user._id.toString() ) {
    return res.status(401).json({ error: 'Cannot do that' })
  }


  return res.json({msg: `deleted blog with id ${req.params.id}`})
}
