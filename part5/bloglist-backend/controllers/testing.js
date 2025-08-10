const router = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

router.post('/reset', async (request, response) => {
  await Blog.deleteMany({})
  await User.deleteMany({})

  response.status(204).end()
})

router.post('/blogs', async (request, response) => {
  await Blog.deleteMany({})
  const users = await User.find({})
  const blogs = request.body
  const blogsWithUser = await blogs.map(blog => ({
    ...blog,
    user: users[0]._id
  }))
  await Blog.insertMany(blogsWithUser)

  response.status(201).end()
})

module.exports = router