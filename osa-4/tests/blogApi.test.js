const { User } = require('../config/models')
const listHelper = require('./util/listHelper')

const app = listHelper.getApp()

describe('Blog  API', () => {

  beforeAll(async () => {
    await listHelper.addInitialBlogs()
  })

  afterAll(async () => {
    await listHelper.tearDownBlogs()
  })

  test('Blogs are returned as json', async () => {
    return await app
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('Created blog has user defined', async () => {
    const blogUser = new User({
      name: 'bloguser',
      username: 'bloguser',
      password: '1234'
    })

    const { id } = await blogUser.save()

    await app
      .post('/api/blogs')
      .send(listHelper.getDummyBlogs()[0])
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201)
      .expect(({ body }) => {
        expect(body.user).toBeTruthy()
        return User.deleteOne({ _id: id })
      })
  })

  test('New blogs can be added', async () => {

    return await app
      .post('/api/blogs')
      .send(listHelper.getDummyBlogs()[0])
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201)
  })

  test('Blog likes default to 0', async () => {

    return await app
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
    return await app
      .post('/api/blogs')
      .send({})
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)
  })

  test('Blogs can be updated', async() => {
    const blog = await listHelper.getOne()
    const oldAuthor = blog.author
    const updated = {
      author: 'Somethings elses',
      title: blog.title,
      likes: blog.likes,
    }

    return await app
      .put(`/api/blogs/${blog._id}`)
      .send(updated)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .expect(({ body }) => {
        expect(body.author).not.toBe(oldAuthor)
        expect(body.author).toBe(updated.author)
      })
  })

  test('Blogs can be deleted', async() => {
    const blog = await listHelper.getOne()

    return await app
      .delete(`/api/blogs/${blog._id}`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
  })
})
