import { useDispatch, useSelector } from "react-redux"
import { updateVotes } from "../reducers/anecdoteReducer"
import { setNotification } from "../reducers/notificationReducer"

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
    dispatch(updateVotes(anecdote.id, anecdote))
    dispatch(setNotification(`You voted for ${anecdote.content}`, 5))
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

function Anecdote({ anecdote, handleVote }) {
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