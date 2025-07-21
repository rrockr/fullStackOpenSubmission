import { Fragment, useEffect, useState } from 'react'
import PersonList from './components/PersonList'
import PersonInput from './components/PersonInput'
import Filter from './components/Filter'
import phonebookService from './services/phonebook'
import Notification from './components/Notification'

const filterByName = (person, searchName) => {
  const targetName = searchName.toLowerCase().trim()
  const personName = person.name.toLowerCase().trim()
  return personName.includes(targetName)
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [notificationMsg, setNotificationMsg] = useState()

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

    const duplicatePerson = persons.find((person) => person.name === personName)

    const newPerson = {
      name: personName,
      number: personNumber
    }

    if(duplicatePerson) {
      if(window.confirm(`${personName} is already added to phonebook, replace the old number with a new one?`)) {
        const updatedPerson = { ...duplicatePerson, name: personName, number: personNumber} 

        phonebookService
        .updatePerson(updatedPerson)
        .then(returnedPerson => {
          setPersons(persons.map(person =>
            person.id === returnedPerson.id ? returnedPerson : person
          ))
          setNotificationMsg(`Changed ${updatedPerson.name}'s number to ${updatedPerson.number}`)
          setTimeout(() => {
            setNotificationMsg(null)
          }, 5000)
          
        })
      }
    }
    else {
      phonebookService
        .createPerson(newPerson)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNotificationMsg(`Added ${newPerson.name}`)
          setTimeout(() => {
            setNotificationMsg(null)
          }, 5000)
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
      <Notification message={notificationMsg} />
      <Filter searchName={searchName} handleSearchName={handleSearchName}/>
      <h3>Add a new name</h3>
      <PersonInput addNewPerson={addNewPerson}/>
      <h3>Numbers</h3>
      <PersonList persons={displayedPersons} callback={setPersons}/>
    </div>
  )
}

export default App