import { useState } from 'react'

//Common
const goodLabel = 'good'
const neutralLabel = 'neutral'
const badLabel = 'bad'
const averageLabel = 'average'
const positiveLabel = 'positive'

const Button = ({onClick, label}) => {
  return <button onClick={onClick}>{label}</button>
}

const StatisticLine = ({text, value}) => {
  return <p>{text} {value}</p>
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
  const isNoFeedback = counter.goodCounter === 0 &&
                          counter.neutralCounter === 0 &&
                          counter.badCounter === 0

  const total = counter.goodCounter + counter.neutralCounter + counter.badCounter
  let positivePercentage = (counter.goodCounter / total) * 100
  let average = (counter.goodCounter - counter.badCounter) / total
  
  if(Number.isNaN(average)) {
    average = 0
  }

  if(Number.isNaN(positivePercentage)) {
    positivePercentage = 0
  }

  if(isNoFeedback) {
    return (
      <>
        <p>Statistics</p>
        <p>No feedback given</p>
      </>

    )
  }

  return (
    <>
      <p>Statistics</p>
      <StatisticLine text={goodLabel} value={counter.goodCounter} />
      <StatisticLine text={neutralLabel} value={counter.neutralCounter} />
      <StatisticLine text={badLabel} value={counter.badCounter} />
      <StatisticLine text={averageLabel} value={average} />
      <StatisticLine text={positiveLabel} value={positivePercentage} />
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
      <Button onClick={handleGoodFeedback} label={goodLabel} />
      <Button onClick={handleNeutralFeedback} label={neutralLabel} />
      <Button onClick={handleBadFeedback} label={badLabel} />
      <Statistics counter={counters}/>
    </div>
  )
}

export default App