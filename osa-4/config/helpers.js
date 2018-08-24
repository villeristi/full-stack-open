const bcrypt = require('bcrypt')

const HASH_ROUNDS = 10

module.exports = {
  async createHash(string, rounds = HASH_ROUNDS) {
    return await bcrypt.hash(string, rounds)
  }
}
