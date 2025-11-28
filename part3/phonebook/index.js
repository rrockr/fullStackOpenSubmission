const express = require('express')
const morgan = require('morgan')
const app = express()
const defaultMiddleware = morgan('tiny')
const postMiddleware = morgan(':method :url :status :res[content-length] - :response-time ms :person')
app.use(express.json())

const masterLogger = (request, response, next) => {
    if(request.method === "POST") {
      console.log("test")
    }
    next()
}

morgan.token('person', (request) => {
  const person = {
    "name": request.body.name,
    "number": request.body.number
  }

  return JSON.stringify(person)
})

app.use(masterLogger)

const maxRandomNum = 100000
let phonebook = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/api/persons', defaultMiddleware, (request, response) => {
    response.json(phonebook)
})

app.get('/api/persons/:id', defaultMiddleware, (request, response) => {
    const id = request.params.id
    let returnPhonebook = phonebook.find((person) => person.id === id)

    if(returnPhonebook) {
      response.json(returnPhonebook)
    } else {
      response.status(404).end()
    }
    
})

app.get('/info', defaultMiddleware, (request, response) => {
    const date = new Date().toString()
    response.send(`
        <p>Phonebook has info for ${phonebook.length} people</p>
        <p>${date}</p>
        `)
})

app.delete('/api/persons/:id', defaultMiddleware, (request, response) => {
    const id = request.params.id
    phonebook = phonebook.filter((person) => person.id !== id)
    
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

    if(phonebook.find(person => body.name === person.name) !== undefined) {
      return response.status(400).json({
        error:"Name must be unique"
      })
    }

    const newPerson = {
      id: String(Math.floor(Math.random() * maxRandomNum)),
      name: body.name,
      number: body.number
    }

    phonebook = phonebook.concat(newPerson)
    response.json(phonebook)
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`)
})