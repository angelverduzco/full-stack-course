import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginServices from './services/login'
import { Notification } from './components/Notification'
import { Error } from './components/Error'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [message, setMessage] = useState(null)

  useEffect(() => {
    const fetchBlogs = async () => {
      const blogs = await blogService.getAll()
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

  const createBlog = async (event) => {
    event.preventDefault()

    try {
      const returnedBlog = await blogService.create({ title, author, url })
      setAuthor('')
      setTitle('')
      setUrl('')
      
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

  const loginForm = () => (
    <>
      <h2>Login to application</h2>
      {errorMessage ? <Error message={errorMessage} /> : null}
      {message ? <Notification message={message} /> : null}
      <form onSubmit={handleLogin}>
        <label htmlFor="username">Username</label>
        <input id='username' type="text" onChange={({target}) => setUsername(target.value)}/>
        <label htmlFor="password">Password</label>
        <input id='password' type="password" onChange={({ target }) => setPassword(target.value)} />
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
      <form onSubmit={createBlog}>
        <label htmlFor="title">Title</label>
        <input id='title' type="text" onChange={({target}) => setTitle(target.value)}/>
        <label htmlFor="author">Author</label>
        <input id='author' type="text" onChange={({target}) => setAuthor(target.value)}/>
        <label htmlFor="url">URL</label>
        <input id='url' type="text" onChange={({ target }) => setUrl(target.value)} />
        <button type='submit'>Create</button>
      </form>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
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