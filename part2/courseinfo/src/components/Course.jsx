import { Fragment } from "react"

const Header = (props) => <h1>{props.course}</h1>

const Content = ({parts}) => {

  const courseContent = parts.map((part) => {
    return (
      <Fragment key={part.id}>
        <Part part={part} />
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

export default Course