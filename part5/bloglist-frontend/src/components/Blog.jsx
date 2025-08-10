import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, handleLike, handleRemove, currentUser }) => {
  const [detailsVisible, setDetailsVisible] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
    width: 'fit-content',
    display: 'flex',
    flexDirection: 'column'
  }

  const addLike = () => {
    handleLike({ ...blog, likes: blog.likes + 1, user: blog.user.id }, blog.id)
  }

  const removeBlog = () => {
    if (confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      handleRemove(blog.id)
    }
  }

  const isOwner = currentUser && blog.user && (currentUser.username === blog.user.username)

  return (
    <div style={blogStyle} className='blog'>
      <span id='blog-title'>{blog.title}</span>
      <span id='blog-author'>{blog.author}</span>
      <button className='btn-details' onClick={() => setDetailsVisible(true)} style={{ display: detailsVisible ? 'none' : '' }}>View details</button>
      {
        detailsVisible ? (
          <>
            <span id='blog-url'>{blog.url}</span>
            <span id='blog-likes'>Likes: {blog.likes}</span> <button onClick={addLike}>Like</button>
            <span>{blog.user.name}</span>
            <button className='btn-details' onClick={() => setDetailsVisible(false)}>Hide details</button>
            { isOwner && <button onClick={removeBlog}>Delete</button> }
          </>
        ) : null
      }
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  handleLike: PropTypes.func.isRequired,
  handleRemove: PropTypes.func.isRequired,
  currentUser: PropTypes.object.isRequired
}

export default Blog