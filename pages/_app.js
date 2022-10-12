import '../styles/globals.css'
import { RecoilRoot } from 'recoil'
import { ThemeProvider } from 'next-themes'
import { useEffect, useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import { db, auth } from '../firebase'
import { useRouter } from 'next/router'

import { UserContext } from '../contexts/UserContext'
import { ToastContextProvider } from '../contexts/ToastContext'

function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState(null)
  const [toast, setToast] = useState([])
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

  const showSuccess = () => {
    toast.current.show({ severity: 'success', summary: 'Success Message', detail: 'Message Content', life: 3000 })
  }

  return (
    <RecoilRoot>
      <ThemeProvider attribute='class'>
        <UserContext.Provider value={{ user, setUser }}>
          <ToastContextProvider>
            <Component {...pageProps} />
          </ToastContextProvider>
        </UserContext.Provider>
      </ThemeProvider>
    </RecoilRoot>
  )
}

export default MyApp
