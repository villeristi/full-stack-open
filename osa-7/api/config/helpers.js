const bcrypt = require('bcrypt')

const HASH_ROUNDS = 10

module.exports = {
  async createHash(string, rounds = HASH_ROUNDS) {
    return await bcrypt.hash(string, rounds)
  },

  getTokenFrom(req) {
    const authorization = req.get('authorization')

    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
      return authorization.substring(7)
    }

    return null
  }
}
