const mongoose = require('mongoose')

module.exports = {
  connect() {
    mongoose.Promise = Promise;
    return mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true });
  },

  close() {
    return mongoose.connection.close()
  }
}
