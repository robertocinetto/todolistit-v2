/* FRAMEWORKS COMPONENTS */
import Head from 'next/head'
import Image from 'next/future/image'
import Layout from '../components/Layout'

/* CUSTOM COMPONENTS */
import Login from '../components/Login'

/* ASSETS */
import logo from '../public/logo.svg'

const Home = () => {
  return (
    <div>
      <Head>
        <title>To Do List It!</title>
        <meta
          name='description'
          content='A NextJs/Firebase todo list app'
        />
      </Head>
      <Layout>
        <div className='w-full text-center flex flex-col justify-center'>
          <Image
            src={logo}
            alt='To Do List It logo'
            className='mx-auto mb-6 w-48 translate-x-4'
          />
          <Login />
        </div>
      </Layout>
    </div>
  )
}

export default Home
