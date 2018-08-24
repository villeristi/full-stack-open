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

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  adult: {
    type: Boolean,
    required: false,
    default: true
  }
}, {
    // Format responses
    toJSON: {
      transform(doc, {_id, username, name, adult}) {
        return {
          id: _id,
          username,
          name,
          adult
        }
      }
    }
})

UserSchema.path('username').validate({
  async validator(username) {
    const count = await this.model('User').count({ username })
    return count === 0
  },

  message: 'Käyttäjätunnus `{VALUE}` löytyy jo tietokannasta!'
});


module.exports = {
  Blog: mongoose.model('Blog', BlogSchema),
  User: mongoose.model('User', UserSchema)
}
