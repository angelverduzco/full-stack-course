import { createAnecdote } from "../reducers/anecdoteReducer"
import { useDispatch } from "react-redux"
import { notificationChange } from "../reducers/notificationReducer"

export default function AnecdoteForm() {
  const dispatch = useDispatch()

  const addAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch(createAnecdote(content))
    dispatch(notificationChange('You added a new anecdote'))
    setTimeout(() => {
      dispatch(notificationChange(null))
    }, 5000)
  }
  
  return (
    <>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
          <div><input name='anecdote'/></div>
          <button type='submit'>create</button>
      </form>
    </>
  )
}