const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const { userExtractor } = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.post('/', userExtractor, async (request, response) => {
  const body = request.body
  const user = request.user

  if (!user) {
    return response.status(401).json({ error: 'token invalid' })
  }

  const newUser = await User.findById(user.id)

  if (!newUser) {
    return response.status(400).json({ error: 'userId invalid or missing' })
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: newUser._id
  })

  const savedBlog = await blog.save()
  newUser.blogs = newUser.blogs.concat(savedBlog)
  await newUser.save()

  savedBlog.user = user

  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', userExtractor, async (request, response) => {
  const id = request.params.id
  const user = request.user

  if (!user) {
    return response.status(401).json({ error: 'invalid token' })
  }

  const blog = await Blog.findById(id)

  if (!blog) {
    return response.status(404).json({ error: 'blog not found' })
  }

  if (!(blog.user.toString() === user.id)) {
    return response.status(401).json({ error: 'not authorized' })
  }

  await Blog.findByIdAndDelete(id)
  response.status(204).end()
})

blogsRouter.put('/:id', userExtractor, async (request, response) => {
  const id = request.params.id
  const body = request.body
  const user = request.user

  if (!user) {
    response.status(401).json({ error: 'invalid token' })
  }

  const blog = await Blog.findById(id)

  if (!blog) {
    return response.status(404).end()
  }

  if (!(blog.user.toString() === user.id)) {
    return response.status(401).json({ error: 'not authorized' })
  }

  blog.title = body.title || blog.title
  blog.author = body.author || blog.author
  blog.url = body.url || blog.url
  blog.likes = body.likes !== undefined ? body.likes : blog.likes
  blog.user = body.user || blog.user

  const updatedBlog = await blog.save()
  updatedBlog.user = user
  response.json(updatedBlog)
})

module.exports = blogsRouter