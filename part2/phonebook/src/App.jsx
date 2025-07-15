import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'

const Filter = ({onChange}) => {
  return (
    <>
      <label>filter shown with a</label>
      <input type="text" onChange={onChange} />
    </>
  )
}

const PersonForm = ({
  onSubmit,
  newName,
  handleNameChange,
  newNumber,
  handleNumberChange
}) => {

  return (
    <form onSubmit={onSubmit}>
      <div>
        name: <input value={newName} onChange={handleNameChange}/>
        number: <input
          value={newNumber}
          type='tel'
          onChange={handleNumberChange}
          pattern="\d{3}-\d{3}-\d{4}"
          placeholder="000-000-0000"
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form> 
  )
}

const Persons = ({persons}) => persons.map((person) => <p key={person.id}> {person.name} {person.number} </p>)

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        const persons = response.data
        setPersons(persons)
      })
  }, [])

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()

    const alreadyExists = persons.some((person) => person.name === newName)

    if (alreadyExists) {
      alert(`${newName} already exists`)
    } else {
      const personObject = {
        name: newName,
        number: newNumber,
        id: persons.length + 1
      }
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
    }
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const personsToShow = persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase())) 

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter onChange={handleFilterChange} />
      <h3>Add a new</h3>
      <PersonForm onSubmit={addPerson} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={ handleNumberChange } />
      <h3>Numbers</h3>
      <Persons persons={personsToShow}/>
    </div>
  )
}

export default App