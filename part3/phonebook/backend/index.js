require('dotenv').config()
const express = require('express')
const app = express()
const morgan = require('morgan')
const Person = require('./models/person')

app.use(express.json())
app.use(express.static('dist'))

morgan.token('body', function (req, res) { return JSON.stringify(req.body) })
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

app.get('/api/persons', (req, res, next) => {
  Person.find({}).then(result => {
    res.json(result)
  })
    .catch(error => next(error))
})

app.get('/info', (req, res) => {
  const date = new Date
  Person.find({})
    .then(result => res.send(`Phonebook has info for ${result.length} people\n${date}`))
})

app.get('/api/persons/:id', (req, res, next) => {
  Person.findById(req.params.id).then(person => {
    if (!person) {
      return res.status(404).end()
    }

    res.json(person)
  })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndDelete(req.params.id)
    .then(result => {
      res.status(200).json(result)
    })
    .catch(error => next(error))
})

app.post('/api/persons', (req, res, next) => {
  const body = req.body

  if (!body.name || !body.number) {
    return res.status(400).json({ error: 'Name or number missing' })
  }

  const person = new Person({
    name: body.name,
    number: body.number
  })

  person.save().then(savedNote => {
    res.json(savedNote)
  })
    .catch(error => next(error))
})

app.put('/api/persons/:id', (req, res, next) => {
  const { name, number } = req.body

  if (!name || !number) {
    return res.status(400).end()
  }

  Person.findById(req.params.id)
    .then(person => {
      if (!person) {
        return res.status(404).end()
      }

      person.name = name
      person.number = number

      return person.save().then(updatedPerson => {
        res.json(updatedPerson)
      })
    })
    .catch(error => next(error))
})

const errorHandler = (error, req, res, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return res.status(400).json({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message })
  }

  res.status(500).json({ error: 'Internal Server Error' })
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`App is runing in port ${PORT}`)
})