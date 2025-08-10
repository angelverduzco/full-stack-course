import { render, screen } from '@testing-library/react'
import { BlogForm } from './BlogForm'
import userEvent from '@testing-library/user-event'
import { describe, expect, test, vi } from 'vitest'

describe('<BlogForm />', () => {
  test('form calls the event handler it received as props with the right details when a new blog is created', async () => {
    const createBlog = vi.fn()
    const user = userEvent.setup()

    render(<BlogForm createBlog={createBlog} />)

    const titleInput = screen.getByPlaceholderText('Type here the title of your blog')
    const authorInput = screen.getByPlaceholderText('Type here the author of your blog')
    const urlInput = screen.getByPlaceholderText('Type here the url of your blog')
    const sendButton = screen.getByText('Create')

    await user.type(titleInput, 'A new title')
    await user.type(authorInput, 'Josh Dun')
    await user.type(urlInput, 'https://wikipedia.com')
    await user.click(sendButton)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].title).toBe('A new title')
    expect(createBlog.mock.calls[0][0].author).toBe('Josh Dun')
    expect(createBlog.mock.calls[0][0].url).toBe('https://wikipedia.com')
  })
})