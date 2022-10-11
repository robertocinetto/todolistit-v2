import { getAuth, onAuthStateChanged, signOut, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { db } from '../firebase'
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore'

import { useEffect, useState, useContext, useRef } from 'react'
import { useTheme } from 'next-themes'
import { UserContext, User } from '../contexts/UserContext'
import { useRouter } from 'next/router'

/* FRAMEWORKS COMPONENTS */
import { DarkModeSwitch } from 'react-toggle-dark-mode'
import { Menu } from 'primereact/menu'
import { Button } from 'primereact/button'
import { Chip } from 'primereact/chip'

const Header = () => {
  const [switchState, setSwitchState] = useState(false)
  const { resolvedTheme, theme, setTheme } = useTheme()
  const { user, setUser } = useContext(UserContext)
  const menu = useRef(null)
  const auth = getAuth()
  const router = useRouter()

  useEffect(() => {
    console.log('%cHeader rendered', 'color:orange')
    console.log(user)

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


  const onSignOut = () => {
    signOut(auth)
    setUser(null)
    router.reload()
  }

  const items = [
    {
      label: 'Options',
      items: [
        {
          label: 'Profile',
          icon: 'pi pi-user',
          command: () => {
            router.push('/profile')
          },
        },
        {
          label: 'Reset dark mode',
          icon: 'pi pi-refresh',
          command: () => {
            resetDarkMode()
          },
        },
        {
          label: 'Log out',
          icon: 'pi pi-power-off',
          command: () => {
            onSignOut()
          },
        },
      ],
    },
  ]

  return (
    <div className="p-4 flex items-center justify-end">
      {user ? (
        <>
              <Chip
                label={user.name}
                image={user.customProfileImg ? user.customProfileImg : user.userImg} 
                className="hidden md:inline-flex"
              />
              <img
                src={user.customProfileImg ? user.customProfileImg : user.userImg}
                alt="user-image"
                className="h-9 rounded-full cursor-pointer md:hidden"
              />
              <DarkModeSwitch
                className="ml-6"
                checked={switchState}
                onChange={toggleTheme}
                size={30}
                moonColor="#6D28D9"
                sunColor="#6D28D9"
              />
              <Button
                className="p-button-rounded p-button-text p-button-sm p-button-plain ml-2"
                aria-label="Settings"
                icon="pi pi-cog"
                onClick={event => menu.current.toggle(event)}
                aria-controls="popup_menu"
                aria-haspopup
              />
              <Menu
                model={items}
                popup
                ref={menu}
                id="popup_menu"
              />
              </>
          ) : (
            <> 
              <DarkModeSwitch
                className="ml-6"
                checked={switchState}
                onChange={toggleTheme}
                size={30}
                moonColor="#6D28D9"
                sunColor="#6D28D9"
              />
            </> 
          )}
        </div>
  )
}

export default Header
