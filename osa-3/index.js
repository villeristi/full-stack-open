const express = require('express')
const morgan = require('./config/morgan')
const db = require('./config/mongo')

db.connect()

const app = express()
const router = express.Router()
const PORT = process.env.PORT || 3001

const ctrls = require('./ctrls')
const apiService = require('./services/apiService')

router.get('/info', async (req, res) => {
  const persons = await apiService.getAll()

  res.json({
    data: `Puhelinluettelossa on ${persons.length} henkilön tiedot`,
    created: new Date(),
  })
})

router.route('/api/persons/:id?')
  .get(ctrls.get)
  .put(ctrls.put)
  .post(ctrls.post)
  .delete(ctrls.del);

app.use(morgan())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router)
app.use(express.static('static'))


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
