/* FRAMEWORKS COMPONENTS */
import Head from 'next/head'
import Layout from '../components/Layout'

const Design = () => {
  return (
    <>
      <Head>
        <title>To Do List It! | Design</title>
        <meta
          name='description'
          content='Here you can find the design I made in Figma for this application'
        />
      </Head>
      <Layout>
        <div className='flex flex-col md:flex-row gap-3 mb-3 w-full'>
          <iframe
            // style='border: 1px solid rgba(0, 0, 0, 0.1);'
            width='100%'
            height='800'
            src='https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FGsBne3EgPKa10htJVQKkGi%2FTo-Do-Listit!%3Fnode-id%3D35024%253A1'
            allowFullScreen
          ></iframe>
        </div>
      </Layout>
    </>
  )
}

export default Design
