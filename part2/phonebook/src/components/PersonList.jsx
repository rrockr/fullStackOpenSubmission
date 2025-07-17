import { Fragment } from "react"
import phonebook from "../services/phonebook"

const confirmDelete = (person, persons, callback) => {
  if(window.confirm(`Delete ${person.name}?`)) {
    phonebook
    .deletePerson(person.id)
    .then(deletedPerson => {
      const updatedPersons = persons.filter(person => person.id !== deletedPerson.id)
      callback(updatedPersons)
    })
  }
}

const PersonList = ({persons, callback}) => {
  const newPersons = persons.map((person) => {
    return (
      <Fragment key={person.name}>
        <p>{person.name} {person.number} {' '}
          <button type="submit" onClick={() => confirmDelete(person, persons, callback)}>delete</button>
        </p>
      </Fragment>
    )
  })
  
  return (
    <>
      {newPersons}
    </>
  )

}

export default PersonList