const supertest = require('supertest')

const { app, server } = require('../index')
const listHelper = require('./util/listHelper')
const api = supertest(app)

describe('Blog  API', () => {

  beforeAll(async () => {
    await listHelper.addInitial()
  })

  afterAll(async () => {
    await listHelper.tearDown()
    server.close()
  })

  test('Blogs are returned as json', async () => {
    return await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('New blogs can be added', async () => {

    return await api
      .post('/api/blogs')
      .send(listHelper.getDummyBlogs()[0])
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201)
  })

  test('Blog likes default to 0', async () => {

    return await api
      .post('/api/blogs')
      .send(listHelper.getDummyBlogs()[1])
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

  test('Blogs can be deleted', async() => {
    const blog = await listHelper.getOne()

    return await api
      .delete(`/api/blogs/${blog._id}`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
  })
})
