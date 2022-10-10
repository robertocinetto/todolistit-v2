import { getAuth, onAuthStateChanged, signOut, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { db } from '../firebase'
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore'

import { useEffect, useState, useContext } from 'react'
import { useTheme } from 'next-themes'
import { UserContext, User } from '../contexts/UserContext'

/* FRAMEWORKS COMPONENTS */
import { DarkModeSwitch } from 'react-toggle-dark-mode'

const Header = () => {
  const [switchState, setSwitchState] = useState(false)
  const { resolvedTheme, theme, setTheme } = useTheme()
  const { user, setUser } = useContext(UserContext)

  useEffect(() => {
    console.log('%cHeader rendered', 'color:orange')

    if (localStorage.theme === 'dark' || resolvedTheme === 'dark') {
      setSwitchState(true)
    } else if (localStorage.theme === 'light' || resolvedTheme === 'light') {
      setSwitchState(false)
    }
  }, [resolvedTheme, user])

  const toggleTheme = (checked) => {
    if (checked) {
      setSwitchState(true)
      setTheme('dark')
    } else {
      setSwitchState(false)
      setTheme('light')
    }
  }

  return (
    <div className="p-4 ">
      <DarkModeSwitch
        className="ml-auto "
        checked={switchState}
        onChange={toggleTheme}
        size={30}
        moonColor="#6D28D9"
        sunColor="#6D28D9"
      />
    </div>
  )
}

export default Header
