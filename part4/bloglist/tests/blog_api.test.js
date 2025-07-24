const { test, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('../utils/list_helper')
const Blog = require('../models/blog')
const assert = require('node:assert')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

test('blogs are returned in JSON format', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')
  assert(response.body.length, helper.initialBlogs.length)
})

test('blogs have an id camp instead of _id', async () => {
  const response = await api.get('/api/blogs')
  assert(Object.hasOwn(response.body[0], 'id'), true)
})

test('a valid blog can be added', async () => {
  const newBlog = {
    title: 'This is a new blog',
    author: 'Angel Verduzco',
    url: 'https://github.com/angelverduzco',
    likes: 10
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')

  const titles = response.body.map(blog => blog.title)

  assert.strictEqual(response.body.length, helper.initialBlogs.length + 1)
  assert(titles.includes('This is a new blog'))
})

test('if value of likes is not included in a POST request the value will be 0 by default', async () => {
  const newBlogWithoutLikes = {
    title: 'I\'m a blog with no likes',
    author: 'Angel Verduzco',
    url: 'https://github.com/angelverduzco'
  }

  await api
    .post('/api/blogs')
    .send(newBlogWithoutLikes)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')

  const likes = response.body[response.body.length - 1].likes

  assert.strictEqual(response.body.length, helper.initialBlogs.length + 1)
  assert.strictEqual(likes, 0)
})

test.only('if title or url camps are missing the server will respond with a 400 code status', async () => {
  const newBlogWithoutTitle = {
    author: 'Angel Verduzco',
    url: 'https://github.com/angelverduzco',
    likes: 20
  }

  const newBlogWithoutUrl = {
    title: 'I\'m a blog with no url',
    author: 'Angel Verduzco',
    likes: 12
  }

  await api
    .post('/api/blogs')
    .send(newBlogWithoutTitle)
    .expect(400)

  await api
    .post('/api/blogs')
    .send(newBlogWithoutUrl)
    .expect(400)
})

after(async () => {
  await mongoose.connection.close()
})
