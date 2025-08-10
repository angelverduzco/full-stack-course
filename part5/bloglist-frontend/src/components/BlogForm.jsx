import { useState } from 'react'

export function BlogForm({ createBlog }) {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addNote = (event) => {
    event.preventDefault()

    createBlog({
      title,
      author,
      url
    })

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <form onSubmit={addNote}>
      <label htmlFor="title">Title</label>
      <input id='title' type="text" onChange={({ target }) => setTitle(target.value)} value={title} placeholder='Type here the title of your blog' data-testid='title'/>
      <label htmlFor="author">Author</label>
      <input id='author' type="text" onChange={({ target }) => setAuthor(target.value)} value={author} placeholder='Type here the author of your blog' data-testid='author'/>
      <label htmlFor="url">URL</label>
      <input id='url' type="text" onChange={({ target }) => setUrl(target.value)} value={url} placeholder='Type here the url of your blog' data-testid='url'/>
      <button type='submit'>Create</button>
    </form>
  )
}