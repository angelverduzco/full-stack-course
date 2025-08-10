const { test, expect, beforeEach, describe } = require('@playwright/test')
const { createBlog, loginWith, randomBlogs } = require('./helpers')
const { create } = require('domain')

describe('Blog app', () => {
  beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    const locator = page.getByText('Login to application')

    await expect(locator).toBeVisible()
  })

  describe('Login', () => {
    beforeEach(async ({ page, request }) => {
      await request.post('http://localhost:3001/api/testing/reset')
      await request.post('http://localhost:3001/api/users', {
        data: {
          name: 'Root',
          username: 'root',
          password: 'secreto'
        }
      })

      await page.goto('http://localhost:5173')
    })

    test('succeds with correct credentials', async ({page}) => {
      await loginWith(page, 'root', 'secreto')
      
      await expect(page.getByText('Root logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await page.getByTestId('username').fill('root')
      await page.getByTestId('password').fill('wrong')

      await page.getByRole('button', { name: 'Login' }).click()
      
      await expect(page.getByText('Wrong username or password')).toBeVisible()
    })

    describe('When logged in', () => {
      beforeEach(async ({ page }) => {
        await loginWith(page, 'root', 'secreto')
      })

      test('a new blog can be created', async ({ page }) => {
        await page.getByRole('button', { name: 'New blog' }).click()
        await page.getByTestId('title').fill('Hello')
        await page.getByTestId('author').fill('Tyler Joseph')
        await page.getByTestId('url').fill('http://youtube.com')

        await page.getByRole('button', { name: 'Create' }).click()
        
        await expect(page.getByText('A new blog Hello by Tyler Joseph added', {exact: true})).toBeVisible()
        await expect(page.getByText('Hello', { exact: true })).toBeVisible();
        await expect(page.getByText('Tyler Joseph', {exact: true})).toBeVisible()
      })

      test('a blog can be liked', async ({page}) => {
        await createBlog(page, 'Hello', 'Tyler Joseph', 'http://youtube.com')

        await page.getByRole('button', { name: 'View details' }).click()
        await page.getByRole('button', { name: 'Like' }).click()
        
        await expect(page.getByText('Likes: 1', {exact: true})).toBeVisible()
      })

      test('user that created a blog can delete it', async ({ page }) => {
        page.on('dialog', async dialog => {
          if (dialog.type() === 'confirm') {
            await dialog.accept()
          }
        })

        await createBlog(page, 'Hello', 'Tyler Joseph', 'http://youtube.com')

        await page.getByRole('button', { name: 'View details' }).click()
        await page.getByRole('button', { name: 'Delete' }).click()
        
        await expect(page.getByText('Hello', {exact: true})).not.toBeVisible()
        await expect(page.getByText('Tyler Joseph', {exact: true})).not.toBeVisible()
      })

      test('only the user that is the owner of a blog can see the delete button', async ({ page, request }) => {
        await createBlog(page, 'Not owned by Angel', 'Tyler Joseph', 'http://youtube.com')

        await request.post('http://localhost:3001/api/users', {
          data: {
            name: 'Angel',
            username: 'mago',
            password: 'puropumas'
          }
        })

        await page.getByRole('button', { name: 'Logout' }).click()
        await loginWith(page, 'mago', 'puropumas')

        await page.getByRole('button', { name: 'View details' }).click()
        
        await expect(page.getByRole('button', {name: 'Delete'})).not.toBeVisible()
      })

      test('the blogs with the most likes are showed at the top of the list', async ({ page, request }) => {
        await request.post('http://localhost:5173/api/testing/blogs', { data: randomBlogs })

        await page.reload()

        for (let i = 0; i < 5; i++) {
          await page.getByText('View details').nth(i).click()
        }

        const blogs = await page.locator('.blog').all()

        await expect(blogs[0]).toHaveText(/Likes: 300/)
        await expect(blogs[1]).toHaveText(/Likes: 250/)
        await expect(blogs[2]).toHaveText(/Likes: 180/)
        await expect(blogs[3]).toHaveText(/Likes: 120/)
        await expect(blogs[4]).toHaveText(/Likes: 90/)
      })
    })
  })
})