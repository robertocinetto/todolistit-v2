import { useRouter } from 'next/router'

import Footer from './Footer'
import Header from './Header'

const Layout = ({ children }) => {
  const router = useRouter()
  return (
    <div
      className={`min-h-screen bg-white dark:bg-zinc-900 dark:text-zinc-100 
      dark:dark-theme flex flex-col justify-between
      ${router.pathname !== '/' ? 'md:block' : ''}
      `}
    >
      <div className='sticky top-0 z-30'>
        <Header />
      </div>
      <main className={`max-w-screen-2xl mx-auto px-5 w-full flex-1 flex ${router.pathname !== '/' ? 'md:block' : ''}`}>
        {children}
      </main>

      <Footer />
    </div>
  )
}

export default Layout
