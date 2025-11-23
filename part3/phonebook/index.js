const express = require('express')
const app = express()
app.use(express.json())

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

app.get('/api/persons', (request, response) => {
    response.json(phonebook)
})

app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    let returnPhonebook = phonebook.find((person) => person.id === id)

    if(returnPhonebook) {
      response.json(returnPhonebook)
    } else {
      response.status(404).end()
    }
    
})

app.get('/info', (request, response) => {
    const date = new Date().toString()
    response.send(`
        <p>Phonebook has info for ${phonebook.length} people</p>
        <p>${date}</p>
        `)
})

app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id
    phonebook = phonebook.filter((person) => person.id !== id)
    
    response.status(204).end()
})

app.post('/api/persons', (request, response) => {
    const body = request.body

    const newPerson = {
      id: Math.floor(Math.random() * maxRandomNum),
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