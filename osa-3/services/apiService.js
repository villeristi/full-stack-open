const Person = require('../config/models')

module.exports = {
  getAll() {
    return Person.find()
  },

  get(id) {
    return Person.findById(id)
  },

  create(data) {
    try {
      const person = new Person(data)

      return person.save()
    } catch(e) {
      return e
    }
  },

  async update(id, data) {
    return Person.findByIdAndUpdate(id, { ...data }, { new: true })
  },

  delete(id) {
    return Person.deleteOne({ _id: id })
  }
}
