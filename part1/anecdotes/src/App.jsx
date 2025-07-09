import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))

  const handleAnecdotes = () => {
    let randomNumber = Math.floor(Math.random() * anecdotes.length)
    setSelected(randomNumber)
  }

  const handleVote = (anecdote) => {
    let newVotes = [...votes]
    newVotes[anecdote]++
    setVotes(newVotes)
  }

  const getAnecdoteWithMostVotes = () => {
    let maxIndex = 0

    for (let i = 0; i < anecdotes.length; i++) {
      if (votes[i] > votes[maxIndex]) {
        maxIndex = i
      }
    }

    return maxIndex
  }

  const topAnecdote = getAnecdoteWithMostVotes()

  return (
    <>
      <div>
        <h1>Anecdote of the day</h1>
        {anecdotes[selected]} has {votes[selected]} votes
        <button onClick={() => handleVote(selected)}>Vote</button>
        <button onClick={handleAnecdotes}>Next anecdote</button>
      </div>
      <div>
          <h1>Anecdote with most votes</h1>
          {anecdotes[topAnecdote]} has {votes[topAnecdote]} votes
      </div>
    </>
  )
}

export default App