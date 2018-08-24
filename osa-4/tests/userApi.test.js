const listHelper = require('./util/listHelper')

const app = listHelper.getApp()

describe.only('User API', () => {

  beforeAll(async () => {
    await listHelper.addInitialUsers()
  })

  afterAll(async () => {
    await listHelper.tearDownUsers()
    app.close()
  })

  test('Users are returned as json', async () => {
    return await app
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('Users can be added', async () => {

    const user = {
      username: 'test',
      name: 'test',
      password: '1234',
      adult: false
    }

    return await app
      .post('/api/users')
      .send(user)
      .expect(201)
      .expect('Content-Type', /application\/json/)
      .expect(({ body }) => {
        expect(body.username).toBe('test')
        expect(body.adult).toBeFalsy()
      })
  })

  test('Adult-field defaults to `true`', async () => {

    const user = {
      username: 'another',
      name: 'another',
      password: '1234'
    }

    return await app
      .post('/api/users')
      .send(user)
      .expect(201)
      .expect('Content-Type', /application\/json/)
      .expect(({ body }) => {
        expect(body.adult).toBeTruthy()
      })
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

  test('Username must be unique', async () => {

    const user = {
      name: "asd",
      username: "asd",
      password: "1234"
    }

    return await app
      .post('/api/users')
      .send(user)
      .expect(400)
      .expect('Content-Type', /application\/json/)
  })
})
