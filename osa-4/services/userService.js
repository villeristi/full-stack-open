const { User } = require('../config/models')

module.exports = {
  getAll() {
    return User.find({}).populate('blogs')
  },

  get(id) {
    return User.findById(id)
  },

  findBy(condition) {
    return User.findOne(condition)
  },

  create(data) {
    const user = new User(data)
    return user.save()
  },

  update(id, data) {
    try{
      return User.findByIdAndUpdate(id, { ...data }, { new: true })
    } catch(e) {
      return e
    }
  },

  save(user) {
    try{
      return user.save()
    } catch(e) {
      return e
    }
  },

  validate(userData) {
    return User.validate(userData)
  }
}
