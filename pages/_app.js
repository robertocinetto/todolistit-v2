import '../styles/globals.css'
import { RecoilRoot } from 'recoil'
import { ThemeProvider } from 'next-themes'
import { UserContext } from '../contexts/UserContext'
import { useEffect, useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import { db, auth } from '../firebase'
import { useRouter } from 'next/router'

function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState(null)
  const router = useRouter()

  useEffect(() => {
    console.log('%cAPP rendered', 'color:orange')

    onAuthStateChanged(auth, user => {
      if (user) {
        const fetchUser = async () => {
          const docRef = doc(db, 'users', user.auth.currentUser.providerData[0].uid)
          const docSnap = await getDoc(docRef)
          if (docSnap.exists()) {
            setUser(docSnap.data())
          }
          router.push('/todos')
        }
        fetchUser()
      }
    })
  }, [])

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
