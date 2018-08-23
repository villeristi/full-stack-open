const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)

describe('Blog  API', () => {
  test('Blogs are returned as json', async () => {
    return await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('New blogs can be added', async () => {

    const dummy = {
      title: 'asd',
      author: 'asd',
      likes: 123
    }

    return await api
      .post('/api/blogs')
      .send(dummy)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201)
  })

  test('Blog likes default to 0', async () => {

    const dummy = {
      title: 'asd',
      author: 'asd'
    }

    return await api
      .post('/api/blogs')
      .send(dummy)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201)
      .expect(({ body }) => {
        expect(body.likes).toBe(0)
      })
  })

  test('Blog should have required fields', async () => {
    return await api
      .post('/api/blogs')
      .send({})
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)
  })

  afterAll(() => {
    server.close()
  })
})
