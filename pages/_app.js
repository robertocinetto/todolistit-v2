import '../styles/globals.css'
import { RecoilRoot } from 'recoil'
import { ThemeProvider } from 'next-themes'
import { UserContext } from '../contexts/UserContext'
import { useState } from 'react'

function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState(null)

  return (
    <RecoilRoot>
      <ThemeProvider attribute="class">
        <UserContext.Provider value={{ user, setUser }}>
          <Component {...pageProps} />
        </UserContext.Provider>
      </ThemeProvider>
    </RecoilRoot>
  )
}

export default MyApp
