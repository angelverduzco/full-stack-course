import { useDispatch, useSelector } from "react-redux"
import { addVote } from "../reducers/anecdoteReducer"
import { notificationChange } from "../reducers/notificationReducer"

export default function AnecdoteList() {
  const anecdotes = useSelector(state => {
    if (state.filter === '') {
      return state.anecdotes
    }
    return state.anecdotes.filter(a => a.content.includes(state.filter))
  })
  const sortedAnecdotes = [...anecdotes].sort((a, b) => b.votes - a.votes)
  
  const dispatch = useDispatch()

  const handleVote = (anecdote) => {
    dispatch(addVote(anecdote.id))
    dispatch(notificationChange(`You voted for ${anecdote.content}`))
    setTimeout(() => {
      dispatch(notificationChange(null))
    }, 5000)
  }

  return (
    <ul>
      {sortedAnecdotes.map(anecdote =>
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleVote={handleVote}
        />)} 
    </ul>
  )
}

function Anecdote({anecdote, handleVote}) {
  return (
    <li>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <button onClick={() => handleVote(anecdote)}>vote</button>
      </div>
    </li>  
  )
}