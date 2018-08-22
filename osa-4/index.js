const express = require('express')
const app = express()
const cors = require('cors')
const router = express.Router()

const db = require('./config/db')
const ctrls = require('./controllers')

db.connect()

router.route('/api/blogs')
  .get(ctrls.get)
  .post(ctrls.post)

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);

const PORT = process.env.PORT || 3003
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
