const Blog = require('../models/blog')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const reduceFunction = (likesSum, blog) => {
    return likesSum + blog.likes
  }

  return blogs.reduce(reduceFunction, 0)
}

const favouriteBlog = (blogs) => {
  if (blogs.length === 0 || !blogs) {
    return null
  }

  let favourite = blogs[0]

  blogs.forEach(blog => {
    if (blog.likes > favourite.likes) {
      favourite = blog
    }
  })

  return favourite
}

const mostBlogs = (blogs) => {
  const map = new Map()
  let mostBlogs = null

  for (let blog of blogs) {
    map.set(blog.author, (map.get(blog.author) || 0) + 1)
  }

  map.forEach((value, key) => {
    if (mostBlogs === null || value > mostBlogs.blogs) {
      mostBlogs = {
        author: key,
        blogs: value
      }
    }
  })

  return mostBlogs
}

const mostLikes = (blogs) => {
  const map = new Map()
  let mostLikes = null

  for (let blog of blogs) {
    map.set(blog.author, (map.get(blog.author) || 0) + blog.likes)
  }

  map.forEach((value, key) => {
    if (mostLikes === null || value > mostLikes.likes) {
      mostLikes = {
        author: key,
        likes: value
      }
    }
  })

  console.log(mostLikes)

  return mostLikes
}

const initialBlogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    __v: 0
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    __v: 0
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0
  }
]

const blogsInDb = async () => {
  const response = await Blog.find({})
  return response.map(blog => blog.toJSON())
}

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  mostBlogs,
  mostLikes,
  blogsInDb,
  initialBlogs
}