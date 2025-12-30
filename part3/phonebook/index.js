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

app.get('/api/persons', defaultMiddleware, (request, response) => {
    Person.find({}).then(persons => {
      response.json(persons)
    })
})

app.get('/api/persons/:id', defaultMiddleware, (request, response) => {
    const id = request.params.id
    Person.findById(id).then(person => {
        if(person) {
          response.json(person)
        } else {
          response.status(404).end()
        }
    })
})

app.get('/info', defaultMiddleware, (request, response) => {
    const date = new Date().toString()

    Person.countDocuments().then(count => {
      response.send(`
        <p>Phonebook has info for ${count} people</p>
        <p>${date}</p>
        `)
    })
})

app.delete('/api/persons/:id', defaultMiddleware, (request, response) => {
    const id = request.params.id
    Person.findByIdAndDelete(id).then(deletedPerson => {
      console.log(`Deleted person: ${deletedPerson}`)
    })
    
    response.status(204).end()
})

app.post('/api/persons', postMiddleware, (request, response) => {
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
    
})

app.put('/api/persons/:id', postMiddleware, (request, response) => {
    const body = request.body
    const id = request.params.id

    Person.findByIdAndUpdate(
      id, 
      {name: body.name, number: body.number},
      {new: true, runValidators: true}
    ).then(returnedPerson => {
      response.json(returnedPerson)
    })
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`)
})