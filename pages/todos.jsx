import Head from 'next/head'

import { useRouter } from 'next/router'
import React, { useContext, useEffect, useState } from 'react'
import CategorySelection from '../components/CategorySelection'
import Layout from '../components/Layout'
import TodoList from '../components/TodoList'
import TodoFormPopup from '../components/TodoFormPopup'

import { UserContext } from '../contexts/UserContext'

const Todos = () => {
  const router = useRouter()
  const { user } = useContext(UserContext)
  const [selectedCategory, setSelectedCategory] = useState({ categoryName: 'Default', id: 'default' })

  useEffect(() => {
    console.log('%cTodos index rendered', 'color:orange')
    if (!user) {
      router.push('/')
    }
  }, [])

  const handleCategoryChange = e => {
    setSelectedCategory(e)
  }

  return (
    <>
      <Head>
        <title>To Do List It! | Todo List</title>
        <meta
          name='description'
          content='The list of all your todos'
        />
      </Head>
      <Layout>
        <div className='flex flex-col md:flex-row gap-3 mb-3 w-full'>
          <div
            className='md:w-1/4 p-5 bg-zinc-50 dark:bg-zinc-800 
                          border rounded border-zinc-100 dark:border-zinc-600 md:border-none'
          >
            <CategorySelection
              selectedCategory={selectedCategory}
              handleCategoryChange={handleCategoryChange}
            />
          </div>
          <div className='md:w-3/4 md:p-5 rounded-md md:bg-zinc-50 dark:md:bg-zinc-800 '>
            <TodoList
              selectedCategory={selectedCategory}
              handleCategoryChange={handleCategoryChange}
            />
          </div>
        </div>
        <TodoFormPopup
          selectedCategory={selectedCategory}
          handleCategoryChange={handleCategoryChange}
        />
      </Layout>
    </>
  )
}

export default Todos
