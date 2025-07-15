const Header = ({course}) => <h2>{course}</h2>

const Content = ({parts}) => (
  <div>
    {parts.map((part) => <Part key={ part.id } part={part} />)}
  </div>
)

const Part = ({part}) => (
  <p>
    {part.name} {part.exercises}
  </p>
)

const Total = ({total}) => <strong>total of {total} exercises</strong>

export function Course({ course }) {

  const total = course.parts.reduce((accumulator, current) => accumulator + current.exercises, 0)

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total total={total} />
    </div>
  )
}