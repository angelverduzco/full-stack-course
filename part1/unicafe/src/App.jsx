import { useState } from 'react'

const Statistics = ({ reviews }) => {
  
  const [good, neutral, bad] = reviews

  return (
    <>
      <h2>Statistics</h2>
      {good + neutral + bad === 0
        ? <h3>No feedback givem</h3>
        : (
          <table>
            <tbody>
              <StatisticsLine text="good" value={good}/>
              <StatisticsLine text="neutral" value={neutral}/>
              <StatisticsLine text="bad" value={bad}/>
              <StatisticsLine text="total" value={good + neutral + bad}/>
              <StatisticsLine text="average" value={(good * 1 + bad * -1) / (good + neutral + bad)}/>
              <StatisticsLine text="positive" value={(good / (good + neutral + bad) * 100) + "%"}/>
            </tbody>
          </table>
        )
      }
    </>
  )
}

const StatisticsLine = ({text, value}) => {
  return (
    <tr>
      <td>{ text }</td>
      <td> {value }</td>
    </tr>
  )
}

const Button = ({onClick, text}) => {
  return <button onClick={onClick}>{ text }</button>
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => {
    setGood(good + 1)
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
  }

  const handleBadClick = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <h2>Give feedback</h2>
      <Button onClick={handleGoodClick} text="Good"/>
      <Button onClick={handleNeutralClick} text="Neutral"/>
      <Button onClick={handleBadClick} text="Bad"/>
      <Statistics reviews={[good, neutral, bad]}/>
    </div>
  )
}

export default App