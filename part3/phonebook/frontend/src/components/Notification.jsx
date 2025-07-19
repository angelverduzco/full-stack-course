export const Notification = ({message}) => {
  if (message === null) {
    return null
  }

  const confirmationStyles = {
    color: 'green',
    backgroundColor: '#c9c9c4',
    borderColor: 'green',
    borderStyle: 'solid',
    borderRadius: 20,
    padding: '10px',
    marginBottom: 15,
    width: 'fit-content'
  }


  return (
    <div style={confirmationStyles}>
      <h3>{message}</h3>
    </div>
  )
}