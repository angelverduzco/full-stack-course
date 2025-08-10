import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginServices from './services/login'
import { Notification } from './components/Notification'
import { Error } from './components/Error'
import Togglable from './components/Togglable'
import { BlogForm } from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [message, setMessage] = useState(null)

  useEffect(() => {
    const fetchBlogs = async () => {
      const blogs = await blogService.getAll()
      blogs.sort((a, b) => b.likes - a.likes)
      setBlogs(blogs)
    }

    fetchBlogs()
  }, [])

  useEffect(() => {
    const loggedUserJSON = localStorage.getItem('loggedUser')

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginServices.login({ username, password })
      localStorage.setItem('loggedUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setPassword('')
      setUsername('')
    } catch {
      setErrorMessage('Wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('loggedUser')
    setUser(null)
  }

  const addBlog = async (blogObject) => {
    try {
      const returnedBlog = await blogService.create(blogObject)

      const newBlogs = blogs.concat(returnedBlog)
      setBlogs(newBlogs)

      setMessage(`A new blog ${returnedBlog.title} by ${returnedBlog.author} added`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    } catch (error) {
      setErrorMessage(error.response.data.error)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLike = async (blogObject, blogId) => {
    try {
      const returnedBlog = await blogService.update(blogObject, blogId)

      const newBlogs = blogs.map((blog => blog.id === returnedBlog.id ? returnedBlog : blog))
      setBlogs(newBlogs)
    } catch (e) {
      setErrorMessage('An error ocurred, please try again later')
      setTimeout(() => {
        setErrorMessage('')
      }, 5000)
    }
  }

  const handleRemove = async blogId => {
    try {
      await blogService.remove(blogId)

      const newBlogs = blogs.filter(blog => blogId !== blog.id)
      setBlogs(newBlogs)
      setMessage('Blog deleted successfully')
      setTimeout(() => {
        setMessage('')
      }, 5000)
    } catch (e) {
      setErrorMessage('An error ocurred when trying to do this operation, please try again later')
      setTimeout(() => {
        setErrorMessage('')
      }, 5000)
    }
  }

  const loginForm = () => (
    <>
      <h2>Login to application</h2>
      {errorMessage ? <Error message={errorMessage} /> : null}
      {message ? <Notification message={message} /> : null}
      <form onSubmit={handleLogin}>
        <label htmlFor="username">Username</label>
        <input id='username' type="text" onChange={({ target }) => setUsername(target.value)} data-testid='username'/>
        <label htmlFor="password">Password</label>
        <input id='password' type="password" onChange={({ target }) => setPassword(target.value)} data-testid='password'/>
        <button type='submit'>Login</button>
      </form>
    </>
  )

  const blogsSection = () => (
    <>
      <h2>Blogs</h2>
      {errorMessage ? <Error message={errorMessage} /> : null}
      {message ? <Notification message={message} /> : null}
      <p>{user.name} logged in</p>
      <button onClick={handleLogout}>Logout</button>
      <h3>Create new blog</h3>
      <Togglable buttonLabel={'New blog'}>
        <BlogForm createBlog={addBlog}/>
      </Togglable>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} handleLike={handleLike} handleRemove={handleRemove} currentUser={user}/>
      )}
    </>
  )

  return (
    <>
      {user === null ? loginForm() : blogsSection()}
    </>
  )
}

export default App