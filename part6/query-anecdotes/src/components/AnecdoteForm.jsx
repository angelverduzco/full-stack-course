import { QueryClient, useMutation, useQueryClient } from "@tanstack/react-query"
import { createAnecdote } from "../requests"
import { useNotificationDispatch } from "../NotificationContext"

const AnecdoteForm = () => {

  const notificationDispatch = useNotificationDispatch()

  const queryClient = useQueryClient()

  const newNAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: newAnecdote => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote))
      notificationDispatch({ type: 'SET', payload: `Added anecdote: ${newAnecdote.content}` })
      setTimeout(() => {
        notificationDispatch({type: 'CLEAR'})
      }, 5000)
    },
    onError: error => {
      if (error.code === 'ERR_BAD_REQUEST') {
        notificationDispatch({ type: 'SET', payload: 'Anecdote is too short, must be at least 5 characters long' })
      }
      setTimeout(() => {
        notificationDispatch({type: 'CLEAR'})
      }, 5000)
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newNAnecdoteMutation.mutate({ content, votes: 0 })
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
