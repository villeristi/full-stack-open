const express = require('express')
const app = express()
const cors = require('cors')
const router = express.Router()

const db = require('./config/db')
const blogCtrls = require('./controllers/blog')
const userCtrls = require('./controllers/user')
const authCtrls = require('./controllers/auth')
const { tokenExtractor } = require('./config/middlewares')

db.connect()

router.route('/api/blogs/:id?')
  .get(blogCtrls.get)
  .post(blogCtrls.post)
  .put(blogCtrls.put)
  .delete(blogCtrls.del)

router.route('/api/blogs/:id/comment')
  .post(blogCtrls.comment)

router.route('/api/users')
  .get(userCtrls.get)
  .post(userCtrls.post)

router.route('/api/auth/login')
  .post(authCtrls.login)

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(tokenExtractor)
app.use(router)

const PORT = process.env.NODE_ENV !== 'test' ? process.env.PORT || 3003 : null
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))

module.exports = app
