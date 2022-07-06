import { useEffect, useState } from 'react'

function App() {
  // create a state for demo todos
  const [data, setData] = useState([])

  useEffect(() => {
    //async/await fetch
    const fetchData = async () => {
      const todos = await (await fetch('/api/v1/todos')).json()

      //set the state with the demo todos
      setData(todos)
    }

    fetchData()
  }, []) //[] to run the hook only on the first render

  return (
    <div className="App">
      <ul>
        {data.map(todo => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>
    </div>
  )
}

export default App
