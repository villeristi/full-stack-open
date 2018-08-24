const mongoose = require('mongoose')

const ValidationError = require('./errors')

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
    default: 0,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
}, {
    // Format responses
    toJSON: {
      transform(doc, { _id, author, title, likes, user }) {
        return {
          id: _id,
          title,
          author,
          likes,
          user,
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
    default: true,
  },
  blogs: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Blog'
  }]

}, {
    // Format responses
    toJSON: {
      transform(doc, { _id, username, name, adult, blogs }) {
        return {
          id: _id,
          username,
          name,
          adult,
          blogs,
        }
      }
    }
})

UserSchema.statics = {
  async validate({ username }) {
    const user = await this.find({ username })

    if( user.length ){
      throw new ValidationError(`Käyttäjänimi ${username} on jo olemassa!`)
    }

    return true
  }
}

module.exports = {
  Blog: mongoose.model('Blog', BlogSchema),
  User: mongoose.model('User', UserSchema)
}
