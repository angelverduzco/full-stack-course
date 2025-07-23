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

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  mostBlogs,
  mostLikes
}