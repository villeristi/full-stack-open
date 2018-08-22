const mongoose = require('mongoose')

const BlogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
    required: false,
    default: 0
  }
}, {
    // Format responses
    toJSON: {
      transform(doc, {_id, author, title, likes}) {
        return {
          id: _id,
          title,
          author,
          likes
        }
      }
    }
})

module.exports = mongoose.model('Blog', BlogSchema)
