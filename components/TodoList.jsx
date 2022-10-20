import { useContext, useEffect, useState } from 'react'

import { useToastContext } from '../hooks/useToastContext'

import { UserContext } from '../contexts/UserContext'

import { onSnapshot, query, collection, where, orderBy, deleteDoc, doc } from 'firebase/firestore'
import { db } from '../firebase'

import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog'

import Image from 'next/future/image'
import Todo from './Todo'

import NoTodosImage from '../public/no-todo-illustration.svg'

const TodoList = ({ selectedCategory }) => {
  const { user, setUser } = useContext(UserContext)
  const [todos, setTodos] = useState([])
  const [todosDone, setTodosDone] = useState([])
  const { showSuccess } = useToastContext()

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
          orderBy('done'),
          orderBy('createdAt', 'desc')
        ),
        collection => {
          //since the snapshot doesn't get the id of each doc, ids needs to be collected in another way
          //I had to get ids to be able to delete single docs from the collection

          //get the collection docs
          const todosCollection = collection.docs

          //build an array of ids from the collection
          const ids = todosCollection.map(todo => todo.id)

          //build an array of objects containing the db data
          const todosData = todosCollection.map(todo => todo.data())

          //build an alternative array chaining ids and data
          _todos = todosData.map((todo, i) => {
            return {
              ...todo,
              id: ids[i],
            }
          })

          //filter todos by done and undone
          const _todosUndone = _todos.filter(todo => todo.done === false)
          const _todosDone = _todos.filter(todo => todo.done === true)
          // _todos = _todos.map(todo => console.log(todo.done))

          setTodos(_todosUndone)
          setTodosDone(_todosDone)
        },
        error => {
          console.error(error)
        }
      )
    }
  }, [selectedCategory])

  const deleteTodo = async id => {
    try {
      await deleteDoc(doc(db, 'todos', id)).then(showSuccess(undefined, undefined, 'Todo deleted successfully'))
    } catch (e) {
      console.log(e)
    }
  }

  const confirmDeleteTodo = id => {
    console.log(id)
    confirmDialog({
      message: 'Are you sure you want to proceed?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      position: 'bottom-right',
      accept: () => deleteTodo(id),
      // reject
    })
  }

  return (
    <>
      <ConfirmDialog />
      {todos.length === 0 ? (
        <>
          <h2 className='text-center mt-10'>Add your new todo!</h2>
          <Image
            src={NoTodosImage}
            layout='fill'
            className='object-contain w-3/4 md:w-1/3 mx-auto my-10'
            alt=''
          />
        </>
      ) : (
        todos.map((todo, index) => {
          return (
            <Todo
              key={index}
              {...todo}
              confirmDeleteTodo={id => confirmDeleteTodo(id)}
            />
          )
        })
      )}

      {todosDone.length > 0 && <h3 className='mt-10'>Done</h3>}
      {todosDone.map((todo, index) => {
        return (
          <Todo
            key={index}
            {...todo}
            confirmDeleteTodo={id => confirmDeleteTodo(id)}
          />
        )
      })}
    </>
  )
}

export default TodoList
