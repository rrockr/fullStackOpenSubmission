import { Fragment, useState } from 'react'
import PersonList from './components/PersonList'
import PersonInput from './components/PersonInput'
import Filter from './components/Filter'

const filterByName = (person, searchName) => {
  const targetName = searchName.toLowerCase().trim()
  const personName = person.name.toLowerCase().trim()
  return personName.includes(targetName)
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])

  const [searchName, setSearchName] = useState('')
  
  const addNewPerson = (personName, personNumber) => {

    const duplicateName = persons.find((person) => person.name === personName)

    const newPerson = {
      name: personName,
      number: personNumber
    }

    if(duplicateName) {
      alert(`${personName} is already added to phonebook`)
    }
    else {
      setPersons(persons.concat(newPerson))
    }
  }

  const handleSearchName = (event) => {
    setSearchName(event.target.value)
  }

  const displayedPersons = searchName === '' ? persons : persons.filter(person => filterByName(person, searchName))

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter searchName={searchName} handleSearchName={handleSearchName}/>
      <h3>Add a new name</h3>
      <PersonInput addNewPerson={addNewPerson}/>
      <h3>Numbers</h3>
      <PersonList persons={displayedPersons}/>
    </div>
  )
}

export default App