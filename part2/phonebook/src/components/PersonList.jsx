import { Fragment } from "react"

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

export default PersonList