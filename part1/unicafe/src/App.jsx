import { useState } from 'react'

//Common
const goodLabel = 'good'
const neutralLabel = 'neutral'
const badLabel = 'bad'

const FeedbackButton = ({onClick, label}) => {
  return <button onClick={onClick}>{label}</button>
}

const FeedbackCounter = ({label, counter}) => {
  return <p>{label} {counter}</p>
}

const Average = ({counter}) => {
  const total = counter.goodCounter + counter.neutralCounter + counter.badCounter
  const average = (counter.goodCounter - counter.badCounter) / total
  
  if(Number.isNaN(average)) {
    return <p>average 0</p>
  }

  return <p>average {average}</p>
}

const PositivePercentage = ({counter}) => {
  const total = counter.goodCounter + counter.neutralCounter + counter.badCounter
  const positivePercentage = (counter.goodCounter / total) * 100

  if(Number.isNaN(positivePercentage)) {
    return <p>positive 0</p>
  }

  return <p>positive {positivePercentage}</p>
}

const Statistics = ({counter}) => {
  return (
    <>
      <p>Statistics</p>
      <FeedbackCounter label={goodLabel} counter={counter.goodCounter} />
      <FeedbackCounter label={neutralLabel} counter={counter.neutralCounter} />
      <FeedbackCounter label={badLabel} counter={counter.badCounter} />
      <Average counter={counter} />
      <PositivePercentage counter={counter} />
    </>

  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodFeedback = () => {
    setGood(good + 1)
  }

  const handleNeutralFeedback = () => {
    setNeutral(neutral + 1)
  }

  const handleBadFeedback = () => {
    setBad(bad + 1)
  }

  const counters = {
    goodCounter: good,
    neutralCounter: neutral,
    badCounter: bad
  }

  return (
    <div>
      <p>Give feedback</p>
      <FeedbackButton onClick={handleGoodFeedback} label={goodLabel} />
      <FeedbackButton onClick={handleNeutralFeedback} label={neutralLabel} />
      <FeedbackButton onClick={handleBadFeedback} label={badLabel} />
      <Statistics counter={counters}/>
    </div>
  )
}

export default App