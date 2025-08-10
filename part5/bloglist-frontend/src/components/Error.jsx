export const Error = ({ message }) => {
  if (message === null) {
    return null
  }

  const errorStyles = {
    color: 'red',
    backgroundColor: '#c9c9c4',
    borderColor: 'red',
    borderStyle: 'solid',
    borderRadius: 20,
    padding: '10px',
    marginBottom: 15,
    width: 'fit-content'
  }

  return (
    <div style={errorStyles}>
      <h3 className="error-message">{message}</h3>
    </div>
  )
}