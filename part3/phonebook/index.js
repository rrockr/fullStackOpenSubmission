require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const app = express()
const defaultMiddleware = morgan('tiny')
const postMiddleware = morgan(':method :url :status :res[content-length] - :response-time ms :person')
const Person = require('./models/person')

app.use(express.json())
app.use(express.static('dist'))

morgan.token('person', (request) => {
  const person = {
    "name": request.body.name,
    "number": request.body.number
  }

  return JSON.stringify(person)
})

app.get('/api/persons', defaultMiddleware, (request, response, next) => {
    Person.find({}).then(persons => {
      response.json(persons)
    })
    .catch(error => next(error))
})

app.get('/api/persons/:id', defaultMiddleware, (request, response, next) => {
    const id = request.params.id
    Person.findById(id).then(person => {
        if(person) {
          response.json(person)
        } else {
          response.status(404).end()
        }
    })
    .catch(error => next(error))
})

app.get('/info', defaultMiddleware, (request, response) => {
    const date = new Date().toString()

    Person.countDocuments().then(count => {
      response.send(`
        <p>Phonebook has info for ${count} people</p>
        <p>${date}</p>
        `)
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', defaultMiddleware, (request, response, next) => {
    const id = request.params.id
    Person.findByIdAndDelete(id).then(deletedPerson => {
      console.log(`Deleted person: ${deletedPerson}`)
      response.status(204).end()
    })
    .catch(error => next(error))
})

app.post('/api/persons', postMiddleware, (request, response, next) => {
    const body = request.body
    const testingArr = ["name", "number"]

    if(testingArr.some(property => body[property] === undefined)) {
      return response.status(400).json({
        error:"Missing name or number"
      })
    }

    const newPerson = new Person({
      name: body.name,
      number: body.number
    })

    newPerson.save().then(returnedPerson => {
      response.json(returnedPerson)
    })
    .catch(error => next(error))
    
})

app.put('/api/persons/:id', postMiddleware, (request, response, next) => {
    const body = request.body
    const id = request.params.id

    Person.findById(id)
    .then(person => {
      if(!person) {
        return response.status(404).end()
      }

      person.name = body.name
      person.number = body.number

      person.save().then(updatedPerson => {
        response.json(updatedPerson)
      })
    })
    .catch(error => next(error))
})

const errorHandler = (error, request, response, next) => {
  console.log("Error: ", error)

  if(error.name === 'CastError') {
    return response.status(400).send({error: 'Invalid Person Id'})
  }

  if(error.name === 'DocumentNotFoundError') {
    return response.status(404).send({error: 'Document not found'})
  }
  
  next(error)
}

app.use(errorHandler)

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`)
})