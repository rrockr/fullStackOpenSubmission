import { Fragment, useState } from 'react'

const PersonList = ({persons}) => {
  const newPersons = persons.map((person) => {
    return (
      <Fragment key={person.name}>
        <p>{person.name} {person.number}</p>
      </Fragment>
    )
  })
  
  return (
    <>
      {newPersons}
    </>
  )

}

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
  const [newName, setNewName] = useState('')
  const [newPhoneNum, setPhoneNum] = useState('')

  const submitNewName = (event) => {
    event.preventDefault()

    const newPerson = {
      name: newName,
      number: newPhoneNum
    }

    const duplicateName = persons.find((person) => person.name === newName)

    if(duplicateName) {
      alert(`${newName} is already added to phonebook`)
    }
    else {
      setPersons(persons.concat(newPerson))
    }
    
    setNewName('')
    setPhoneNum('')
  }

  const handleNewName = (event) => {
    setNewName(event.target.value)
  }

  const handleNewPhoneNum = (event) => {
    setPhoneNum(event.target.value)
  }

  const handleSearchName = (event) => {
    setSearchName(event.target.value)
  }

  const displayedPersons = searchName === '' ? persons : persons.filter(person => filterByName(person, searchName))

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with <input value={searchName} onChange={handleSearchName}/>
      </div>
      
      <form onSubmit={submitNewName}>
        <div>
          name: <input value={newName} onChange={handleNewName} />
        </div>
        <div>
        number: <input value={newPhoneNum} onChange={handleNewPhoneNum}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <PersonList persons={displayedPersons}/>
      <div>debug: {newName}</div>
    </div>
  )
}

export default App