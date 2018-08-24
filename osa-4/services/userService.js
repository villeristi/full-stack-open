const { User } = require('../config/models')

module.exports = {
  getAll() {
    return User.find({})
  },

  create(data) {
    const user = new User(data)
    return user.save()
  },
}
