import { useState } from "react"

const PersonInput = ({addNewPerson}) => {
    const [newName, setNewName] = useState('')
    const [newPhoneNum, setPhoneNum] = useState('')

    
    const submitNewName = (event) => {
        event.preventDefault()
    
        addNewPerson(newName, newPhoneNum)
        
        setNewName('')
        setPhoneNum('')
    }
    

    const handleNewName = (event) => {
        setNewName(event.target.value)
    }
    
    const handleNewPhoneNum = (event) => {
        setPhoneNum(event.target.value)
    }

    return (
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
    )
}

export default PersonInput