const mongoose = require('mongoose')

if(process.argv.length < 3 || process.argv.length === 4 || process.argv.length > 5) {
  console.log('Usage: node mongoose.js <password> [name] [number]')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://phonebook_db_user:${password}@phonebook.drgmkgl.mongodb.net/phonebook?appName=phonebook`

mongoose.connect(url, { family: 4 })

const phonebookSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Person = mongoose.model('Person', phonebookSchema)

if(process.argv.length === 3) {
  Person.find({}).then(result => {
    result.forEach(person => {
      console.log(person)
    })
    mongoose.connection.close()
  })
}

if(process.argv.length === 5) {
  const newName = process.argv[3]
  const newNumber = process.argv[4]
  const newPerson = new Person({
    name: newName,
    number: newNumber
  })

  newPerson.save().then(result => {
    console.log(`added ${newName} number ${newNumber} to phonebook`)
    console.log('Result: ', result)
    mongoose.connection.close()
  })
}



