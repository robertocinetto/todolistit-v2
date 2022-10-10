import React from 'react'
import Footer from './Footer'
import Header from './Header'


const Layout = ({ children }) => {
  return (
    <div className="bg-white dark:bg-slate-800 dark:text-slate-100 dark:dark-theme">
      <div className=" sticky top-0 z-30">
        <Header />
      </div>
      <main className="max-w-screen-2xl mx-auto px-5">{children}</main>

      <Footer />
    </div>
  )
}

export default Layout
