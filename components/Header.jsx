import { getAuth, signOut } from 'firebase/auth'

import Link from 'next/link'
import Image from 'next/future/image'
import dynamic from 'next/dynamic'

import { useEffect, useState, useContext, useRef, Suspense } from 'react'
import { useTheme } from 'next-themes'
import { UserContext } from '../contexts/UserContext'
import { useRouter } from 'next/router'

/* FRAMEWORKS COMPONENTS */
import { DarkModeSwitch } from 'react-toggle-dark-mode'
import { Menu } from 'primereact/menu'
import { Button } from 'primereact/button'
import { Chip } from 'primereact/chip'

const Tour = dynamic(() => import('../components/Tour'), {
  suspense: true,
})

const Header = () => {
  const [switchState, setSwitchState] = useState(false)
  const { resolvedTheme, theme, setTheme } = useTheme()
  const { user, setUser } = useContext(UserContext)
  const [startTour, setStartTour] = useState(false)
  const menu = useRef(null)
  const auth = getAuth()
  const router = useRouter()

  useEffect(() => {
    console.log('%cHeader rendered', 'color:orange')

    if (localStorage.theme === 'dark' || resolvedTheme === 'dark') {
      setSwitchState(true)
    } else if (localStorage.theme === 'light' || resolvedTheme === 'light') {
      setSwitchState(false)
    }

    // Check if tour has already be seen
    if (localStorage.tour === 'true') {
      console.log(startTour)
      setStartTour(false)
    }

    // }, [resolvedTheme, user])
  }, [])

  const toggleTheme = checked => {
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

  const resetDarkMode = () => {
    setTheme('system')
  }

  const items = [
    {
      label: 'Options',
      items: [
        {
          label: 'Reset dark mode',
          icon: 'pi pi-refresh',
          command: () => {
            resetDarkMode()
          },
        },
        {
          label: 'Start tour',
          icon: 'pi pi-refresh',
          command: () => {
            handleStartTour(true)
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

  const handleStartTour = start => {
    console.log('handleStartTour')
    setStartTour(start)
  }

  return (
    <div className='max-w-screen-2xl xl:mx-auto px-5 bg-white/90 dark:bg-zinc-900/90'>
      {router.pathname === '/todos' && (
        <Suspense fallback={`Loading...`}>
          <Tour
            startTour={startTour}
            handleStartTour={handleStartTour}
          />
        </Suspense>
      )}
      <div className={`flex items-center ${router.pathname !== '' ? 'justify-between' : 'justify-end p-5'}`}>
        {(router.pathname === '/design' || router.pathname === '/todos') && (
          <div className='cursor-pointer h-24 w-44 lg:w-52 relative flex items-center'>
            <Link href='/todos'>
              <a>
                <Image
                  src='/logo.svg'
                  layout='fill'
                  className='object-contain'
                  alt=''
                  width='70'
                  height='70'
                />
              </a>
            </Link>
          </div>
        )}
        <div className='flex items-center'>
          {user && (
            <>
              <Chip
                label={user.name}
                image={user.customProfileImg ? user.customProfileImg : user.userImg}
                className='hidden md:inline-flex'
              />
              <img
                src={user.customProfileImg ? user.customProfileImg : user.userImg}
                alt='user-image'
                className='h-9 rounded-full cursor-pointer md:hidden'
              />
              <DarkModeSwitch
                className='ml-6'
                checked={switchState}
                onChange={toggleTheme}
                size={30}
                moonColor='#6D28D9'
                sunColor='#6D28D9'
              />
              <Button
                className='p-button-rounded p-button-text p-button-sm p-button-plain ml-2'
                aria-label='Settings'
                icon='pi pi-cog'
                onClick={event => menu.current.toggle(event)}
                aria-controls='popup_menu'
                aria-haspopup
              />
              <Menu
                model={items}
                popup
                ref={menu}
                id='popup_menu'
              />
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default Header
