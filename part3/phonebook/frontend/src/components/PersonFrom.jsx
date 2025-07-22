export const PersonForm = ({
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
          placeholder="000-0000000"
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form> 
  )
}