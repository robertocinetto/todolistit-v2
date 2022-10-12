import { useRouter } from 'next/router'
import React, { useContext, useEffect } from 'react'
import CategorySelection from '../components/CategorySelection'
import Layout from '../components/Layout'
import TodoList from '../components/TodoList'
import TodoFormPopup from '../components/TodoFormPopup'

import { UserContext } from '../contexts/UserContext'

const Todos = () => {
  const router = useRouter()
  const { user } = useContext(UserContext)

  useEffect(() => {
    console.log('%cTodos index rendered', 'color:orange')
    if (!user) {
      router.push('/')
    }
  }, [])

  return (
    <Layout>
      <div className='flex gap-3 mb-3'>
        <div className='w-1/4 p-5 rounded-md bg-zinc-50 dark:bg-zinc-800'>
          <CategorySelection />
        </div>
        <div className='w-3/4 p-5 rounded-md bg-zinc-50 dark:bg-zinc-800'>
          <TodoList />
        </div>
      </div>
      <TodoFormPopup />
    </Layout>
  )
}

export default Todos
