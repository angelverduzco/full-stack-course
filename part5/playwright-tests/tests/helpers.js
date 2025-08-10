const createBlog = async (page, title, author, url) => {
  await page.getByRole('button', { name: 'New blog' }).click()
  await page.getByTestId('title').fill(title)
  await page.getByTestId('author').fill(author)
  await page.getByTestId('url').fill(url)

  await page.getByRole('button', { name: 'Create' }).click()
}

const loginWith = async (page, username, password) => {
  await page.getByTestId('username').fill(username)
  await page.getByTestId('password').fill(password)
  await page.getByRole('button', { name: 'Login' }).click()
}

const randomBlogs = [
  {
    title: "Introducción a JavaScript Moderno",
    author: "Ana López",
    url: "https://ejemplo.com/js-moderno",
    likes: 120
  },
  {
    title: "Guía práctica de React",
    author: "Carlos Pérez",
    url: "https://ejemplo.com/react-practico",
    likes: 250
  },
  {
    title: "Optimización de bases de datos MySQL",
    author: "María González",
    url: "https://ejemplo.com/mysql-optimizacion",
    likes: 90
  },
  {
    title: "Buenas prácticas en Node.js",
    author: "Luis Hernández",
    url: "https://ejemplo.com/node-buenas-practicas",
    likes: 180
  },
  {
    title: "CSS avanzado para desarrolladores",
    author: "Sofía Martínez",
    url: "https://ejemplo.com/css-avanzado",
    likes: 300
  }
];


export { createBlog, loginWith, randomBlogs }