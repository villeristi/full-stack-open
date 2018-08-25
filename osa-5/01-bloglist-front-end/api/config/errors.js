class ValidationError extends Error {
  constructor(props) {
    super(props)
    this.name = 'ValidationError'
  }
}

module.exports = ValidationError
