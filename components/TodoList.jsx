import { useContext, useEffect, useState } from 'react'

import { UserContext } from '../contexts/UserContext'

import { onSnapshot, query, collection, where, orderBy } from 'firebase/firestore'
import { db } from '../firebase'

import Todo from './Todo'

const TodoList = ({ selectedCategory }) => {
  const { user, setUser } = useContext(UserContext)
  const [todos, setTodos] = useState([])

  useEffect(() => {
    console.log('%cTodo list rendered', 'color:orange')
    if (user) {
      let _todos = []
      // const unsub = onSnapshot(query(collection(db, 'todos')), collection => {
      const unsub = onSnapshot(
        query(
          collection(db, 'todos'),
          where('categoryId', '==', selectedCategory.id),
          where('username', '==', user.username),
          orderBy('done')
        ),
        collection => {
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
        },
        error => {
          console.error(error)
        }
      )
    }
  }, [selectedCategory])

  return (
    <>
      {todos.map((todo, index) => {
        return (
          <Todo
            key={index}
            {...todo}
          />
        )
      })}
    </>
  )
}

export default TodoList
