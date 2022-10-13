import React, { useRef } from 'react'
import Footer from './Footer'
import Header from './Header'

const Layout = ({ children }) => {
  return (
    <div className='min-h-screen bg-white dark:bg-zinc-900 dark:text-zinc-100 dark:dark-theme'>
      <div className='sticky top-0 z-30'>
        <Header />
      </div>
      <main className='max-w-screen-2xl mx-auto px-5'>{children}</main>

      <Footer />
    </div>
  )
}

export default Layout
