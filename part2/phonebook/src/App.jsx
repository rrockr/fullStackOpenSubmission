import { Fragment, useState } from 'react'

const PersonList = ({persons}) => {
  const newPersons = persons.map((person) => {
    return (
      <Fragment key={person.name}>
        <p>{person.name}</p>
      </Fragment>
    )
  })
  
  return (
    <>
      {newPersons}
    </>
  )

}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const submitNewName = (event) => {
    event.preventDefault()

    const newPerson = {
      name: newName
    }

    setPersons(persons.concat(newPerson))
    setNewName('')
  }

  const handleNewPerson = (event) => {
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={submitNewName}>
        <div>
          name: <input value={newName} onChange={handleNewPerson} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <PersonList persons={persons}/>
      <div>debug: {newName}</div>
    </div>
  )
}

export default App