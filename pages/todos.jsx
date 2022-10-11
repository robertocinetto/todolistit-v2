import { useRouter } from 'next/router'
import React, { useContext, useEffect } from 'react'
import Layout from '../components/Layout'
import { UserContext } from '../contexts/UserContext'


const Todos = () => {
  const router = useRouter()
  const { user } = useContext(UserContext)


  useEffect(() => {
    if (!user) {
      router.push('/')
    }
  },[])

  return (
    <Layout>
      Todos
    </Layout>
  )
}

export default Todos