import { useState } from 'react'

const FeedbackButton = ({onClick, label}) => {
  return <button onClick={onClick}>{label}</button>
}

const FeedbackCounter = ({label, counter}) => {
  return <p>{label} {counter}</p>
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const goodLabel = 'good'
  const neutralLabel = 'neutral'
  const badLabel = 'bad'

  const handleGoodFeedback = () => {
    setGood(good + 1)
  }

  const handleNeutralFeedback = () => {
    setNeutral(neutral + 1)
  }

  const handleBadFeedback = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <p>Give feedback</p>
      <FeedbackButton onClick={handleGoodFeedback} label={goodLabel} />
      <FeedbackButton onClick={handleNeutralFeedback} label={neutralLabel} />
      <FeedbackButton onClick={handleBadFeedback} label={badLabel} />
      <p>Statistics</p>
      <FeedbackCounter label={goodLabel} counter={good} />
      <FeedbackCounter label={neutralLabel} counter={neutral} />
      <FeedbackCounter label={badLabel} counter={bad} />
    </div>
  )
}

export default App