const { getTokenFrom } = require('./helpers')

module.exports = {
  tokenExtractor(req, res, next) {
    req.token = getTokenFrom(req)
    return next()
  }
}
