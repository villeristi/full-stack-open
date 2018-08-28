const mongoose = require('mongoose')

const { createHash } = require('../config/helpers')
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
  url: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
    required: false,
    default: 0,
  },
  comments: {
    type: [String],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
}, {
    // Format responses
    toJSON: {
      transform(doc, { _id, author, title, url, likes, comments, user }) {
        return {
          id: _id,
          title,
          author,
          url,
          likes,
          comments,
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

UserSchema.pre('save', async function(next) {
  const user = this;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) {
    return next();
  }

  const hash = await createHash(user.password)
  user.password = hash
  next()
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
