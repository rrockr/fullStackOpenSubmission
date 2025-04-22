import { Fragment } from "react"

const Header = (props) => <h1>{props.course}</h1>

const Content = ({parts}) => {

  const courseContent = parts.map((part) => {
    return (
      <Fragment key={part.id}>
        <p>{part.name} {part.exercises}</p>
      </Fragment>
    )
  })

  return (
    <>
      {courseContent}
    </>
  )
}

const Part = (props) => (
  <p>
    {props.part.name} {props.part.exercises}
  </p>
)

const Total = (props) => <b>Total of {props.total} exercises</b>

const computeTotal = (parts) => {
    const sum = parts.reduce( (total, curr) => {
      total["exercises"] = total["exercises"] + curr["exercises"]
      return total
    }, {exercises: 0})

    return sum.exercises
}

const Course = ({course}) => {

  const mappedCourse = course.map((course) => {
      return (
        <div key={course.id}>
          <Header course={course.name} />
          <Content parts={course.parts} />
          <Total total={computeTotal(course.parts)} />
        </div>
      )
  })

  return (
    <>
      <h1>Web Development Curriculum</h1>
      {mappedCourse}
    </>
  )
}

const App = () => {
  const courses = [
    {
      id: 1,
      name: 'Half Stack application development',
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ],
    },
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return <Course course={courses} />
}

export default App