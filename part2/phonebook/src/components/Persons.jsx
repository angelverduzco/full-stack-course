export const Persons = ({ persons, deletePerson }) => persons.map((person) => {
  return (
    <div key={person.id}>
      <p>{person.name} {person.number}</p>
      <button onClick={() => deletePerson(person.id, person.name)}>Delete</button>
    </div>
  )
})