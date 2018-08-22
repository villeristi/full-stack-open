const morgan = require('morgan')

morgan.token('data', (req, res) => `Data: ${JSON.stringify(req.body)}`)

module.exports = () => morgan(':method :url :data :status :res[content-length] - :response-time ms')

