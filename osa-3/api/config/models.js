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
}, {
  // Format responses
  toJSON: {
    transform(doc, {_id, name, number}) {
      return {
        id: _id,
        name,
        number
      }
    }
  }
})

PersonSchema.path('name').validate({
  async validator(name) {
    const count = await this.model('Person').count({ name })
    return count === 0
  },

  message: 'Nimi `{VALUE}` löytyy jo tietokannasta!'
});


module.exports = mongoose.model('Person', PersonSchema)
