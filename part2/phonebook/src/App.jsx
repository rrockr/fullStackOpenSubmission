import { Fragment, useEffect, useState } from 'react'
import PersonList from './components/PersonList'
import PersonInput from './components/PersonInput'
import Filter from './components/Filter'
import phonebookService from './services/phonebook'

const filterByName = (person, searchName) => {
  const targetName = searchName.toLowerCase().trim()
  const personName = person.name.toLowerCase().trim()
  return personName.includes(targetName)
}

const App = () => {
  const [persons, setPersons] = useState([])

  const hook = () => {
    phonebookService
      .getAllPerson()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }

  useEffect(hook, [])

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
      phonebookService
        .createPerson(newPerson)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
        })
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