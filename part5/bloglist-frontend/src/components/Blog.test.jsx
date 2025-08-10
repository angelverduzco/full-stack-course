import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'
import { describe, expect, test } from 'vitest'

describe('<Blog />', () => {

  test('title and author are rendered and url and likes aren\'t by default', () => {
    const blog = {
      title: 'Hello, blog here',
      author: 'IDK',
      url: 'http://ucol.mx',
      likes: 4000
    }

    const user = {
      name: 'Yo',
      username: 'mago',
      token: 'lksdbkhwebfnlef782983snf'
    }

    const { container } = render(<Blog blog={blog} handleLike={() => {}} handleRemove={() => {}} currentUser={user}/>)

    const title = container.querySelector('#blog-title')
    const author = container.querySelector('#blog-author')
    const url = container.querySelector('#blog-url')
    const likes = container.querySelector('#blog-likes')

    expect(title).toBeDefined()
    expect(author).toBeDefined()
    expect(url).toBeNull()
    expect(likes).toBeNull()
  })

  test('when the button "show details" is clicked, likes and url are visible', async () => {
    const blog = {
      title: 'Hello, blog here',
      author: 'IDK',
      url: 'http://ucol.mx',
      likes: 4000,
      user: { id: '123', name: 'Yo', username: 'mago' }
    }

    const currentUser = {
      name: 'Yo',
      username: 'mago',
      token: 'lksdbkhwebfnlef782983snf'
    }

    const handleLike = vi.fn()
    const handleRemove = vi.fn()

    render(
      <Blog
        blog={blog}
        handleLike={handleLike}
        handleRemove={handleRemove}
        currentUser={currentUser}
      />
    )

    const user = userEvent.setup()

    const viewButton = screen.getByRole('button', { name: /view details/i })
    await user.click(viewButton)

    expect(screen.getByText(blog.url)).toBeInTheDocument()
    expect(screen.getByText(`Likes: ${blog.likes}`)).toBeInTheDocument()
  })

  test('when clicked twice the like button handler is called twice', async () => {
    const blog = {
      title: 'Hello, blog here',
      author: 'IDK',
      url: 'http://ucol.mx',
      likes: 4000,
      user: { id: '123', name: 'Yo', username: 'mago' }
    }

    const currentUser = {
      name: 'Yo',
      username: 'mago',
      token: 'lksdbkhwebfnlef782983snf'
    }

    const handleLike = vi.fn()
    const handleRemove = vi.fn()

    render(
      <Blog
        blog={blog}
        handleLike={handleLike}
        handleRemove={handleRemove}
        currentUser={currentUser}
      />
    )

    const user = userEvent.setup()

    const viewButton = screen.getByRole('button', { name: /view details/i })
    await user.click(viewButton)

    const likeButton = screen.getByText('Like')
    await user.click(likeButton)
    await user.click(likeButton)

    expect(handleLike.mock.calls).toHaveLength(2)
  })
})