const express = require('express')
const app = express()
const cors = require('cors')
const router = express.Router()

const db = require('./config/db')
const ctrls = require('./controllers')

db.connect()

router.route('/api/blogs/:id?')
  .get(ctrls.get)
  .post(ctrls.post)
  .delete(ctrls.del)

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);

const PORT = process.env.PORT || 3003
const server = app.listen(PORT, () => console.log(`Server running on port ${PORT}`))

module.exports = { app, server }
