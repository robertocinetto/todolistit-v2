import { onLog } from 'firebase/app'
import { useRouter } from 'next/router'
import React, { useContext, useEffect, useState } from 'react'
import CategorySelection from '../components/CategorySelection'
import Layout from '../components/Layout'
import TodoList from '../components/TodoList'

import { UserContext } from '../contexts/UserContext'
import { useToastContext } from '../hooks/useToastContext'

import { collection, addDoc, Timestamp } from 'firebase/firestore'
import { db } from '../firebase'

import { Button } from 'primereact/button'
import { Dialog } from 'primereact/dialog'
import { InputText } from 'primereact/inputtext'
import { Dropdown } from 'primereact/dropdown'

const Todos = () => {
  const router = useRouter()
  const { user } = useContext(UserContext)
  const [displayPopup, setDisplayPopup] = useState(false)
  const [todo, setTodo] = useState('')
  const [category, setCategory] = useState()

  const showSuccess = useToastContext()

  useEffect(() => {
    console.log('%cTodos index rendered', 'color:orange')
    if (!user) {
      router.push('/')
    }
    console.log(category)
  }, [category])

  const onClick = () => {
    setDisplayPopup(true)
  }

  const onHide = () => {
    setDisplayPopup(false)
  }

  const categories = [
    { name: 'Undefined', code: 'undefined' },
    { name: 'Category', code: 'category' },
  ]

  const onCategoryChange = e => {
    setCategory(e.value)
    console.log(category)
  }

  const addTodo = async () => {
    try {
      await addDoc(collection(db, 'todos'), {
        todo,
        category,
      })
      showSuccess(undefined, undefined, 'Todo successfully added!')
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <Layout>
      {/* <div className='w-full p-5 mb-3 rounded-md bg-zinc-800'>
        <TodoForm  />
      </div> */}
      <div className='flex gap-3 mb-3'>
        <div className='w-1/4 p-5 rounded-md bg-zinc-800'>
          <CategorySelection />
        </div>
        <div className='w-3/4 p-5 rounded-md bg-zinc-800'>
          <TodoList />
        </div>
      </div>
      <div className='absolute bottom-o right-0 mr-3 mb-3'>
        <Button
          icon='pi pi-plus'
          className='p-button-rounded bg-violet-700 hover:bg-violet-500 border-violet-700 hover:border-violet-500'
          aria-label='Add todo'
          onClick={onClick}
        />
      </div>
      <Dialog
        header='Add todo'
        visible={displayPopup}
        style={{ width: '400px' }}
        onHide={() => onHide('displayPopup')}
        className='pb-5'
      >
        <InputText
          id='todo'
          value={todo}
          onChange={e => setTodo(e.target.value)}
          className='p-inputtext-sm w-full'
          placeholder='Todo'
        />
        <Dropdown
          value={category}
          options={categories}
          onChange={onCategoryChange}
          optionLabel='name'
          placeholder='Select a category'
          className='w-full mt-3 p-inputtext-sm'
        />
        <Button
          label='Add todo'
          className='p-button-sm w-full mt-3'
          onClick={addTodo}
        />
      </Dialog>
    </Layout>
  )
}

export default Todos
