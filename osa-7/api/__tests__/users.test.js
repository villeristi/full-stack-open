const helper = require('./helpers')

const app = helper.getApp()

describe.only('User API', () => {

  beforeAll(async () => {
  })

  afterAll(async () => {
    app.close()
  })

  test('Users are returned as json', async () => {
    return await app
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('Password length must be minimum of three', async () => {

    const user = {
      username: 'anotherz',
      name: 'anotherz',
      password: '12'
    }

    return await app
      .post('/api/users')
      .send(user)
      .expect(400)
      .expect('Content-Type', /application\/json/)
  })
})
