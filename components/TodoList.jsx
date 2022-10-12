import { useEffect, useState } from 'react'

import { onSnapshot, query, collection } from 'firebase/firestore'
import { db } from '../firebase'

import Todo from './Todo'

const TodoList = () => {
  const [todos, setTodos] = useState([])

  useEffect(() => {
    console.log('%cTodo list rendered', 'color:orange')

    let _todos = []
    const unsub = onSnapshot(query(collection(db, 'todos')), collection => {
      //since the snapshot doesn't get the id of each doc, ids needs to be collected in another way
      //I had to get ids to be able to delete single docs from the collection

      //get the collection docs
      const todosCollection = collection.docs

      //build an array of ids from the collection
      let ids = todosCollection.map(todo => todo.id)

      //build an array of objects containing the db data
      let todosData = todosCollection.map(todo => todo.data())

      //build an alternative array chaining ids and data
      _todos = todosData.map((todo, i) => {
        return {
          ...todo,
          id: ids[i],
        }
      })
      setTodos(_todos)
    })
  }, [])

  return (
    <>
      {todos.map((todo, index) => (
        <Todo
          key={index}
          {...todo}
        />
      ))}
    </>
  )
}

export default TodoList
