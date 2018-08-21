const mongoose = require('mongoose')

const PersonSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  number: {
    type: String,
    required: true,
  },
})

PersonSchema.method({})
PersonSchema.statics = {}

module.exports = mongoose.model('Person', PersonSchema)
