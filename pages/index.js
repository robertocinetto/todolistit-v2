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
          name="description"
          content="A NextJs/Firebase todo list app"
        />
        <link
          rel="icon"
          href="/favicon.ico"
        />
      </Head>
      <Layout>
        <div className="grid place-items-center min-h-screen text-center">
          <div className="w-full">
            <Image
              src={logo}
              alt="To Do List It logo"
              className="mx-auto mb-6 w-48 translate-x-4"
            />
            <Login />
          </div>
        </div>
      </Layout>
    </div>
  )
}

export default Home
