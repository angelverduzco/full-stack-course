const Header = ({ course }) => {
  return <h1> { course }</h1>
}

const Part = ({part}) => {
  return <p>{part.name} {part.exercises}</p>
}

const Content = ({parts}) => {
  return (
    <div>
      {parts.map((part) => <Part key={part.name} part={part}/>)}
    </div>
  )
}

const Total = ({ parts }) => {

  let total = parts[0].exercises + parts[1].exercises + parts[2].exercises
  
  return <p>Number of excersises { total }</p>
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts}/>
    </div>
  )
}

export default App