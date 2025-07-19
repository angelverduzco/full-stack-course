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