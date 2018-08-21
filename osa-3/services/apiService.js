const Person = require('../config/models')

module.exports = {
  getAll() {
    return Person.find()
  },

  get(id) {
    return Person.findById(id)
  },

  create(data) {
    const person = new Person(data)

    return person.save()
  },

  async update(id, data) {
    return Person.findByIdAndUpdate(id, { ...data }, { new: true })
  },

  delete(id) {
    return Person.deleteOne({ _id: id })
  }
}
