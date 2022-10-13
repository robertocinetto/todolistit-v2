import { getAuth, onAuthStateChanged, signOut, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { db } from '../firebase'
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore'
import { UserContext } from '../contexts/UserContext'
import { useContext, useEffect } from 'react'
import { useRouter } from 'next/router'

const Login = () => {
  const router = useRouter()
  const { user, setUser } = useContext(UserContext)
  const auth = getAuth()

  useEffect(() => {
    console.log('%cLogin rendered', 'color:orange')
  }, [])

  const onGoogleClick = async () => {
    try {
      let auth = getAuth()
      const provider = new GoogleAuthProvider()
      await signInWithPopup(auth, provider)
      let user = auth.currentUser.providerData[0]
      const docRef = doc(db, 'users', user.uid)
      const docSnap = await getDoc(docRef)
      if (!docSnap.exists()) {
        await setDoc(docRef, {
          name: user.displayName,
          email: user.email,
          userImg: user.photoURL,
          uid: user.uid,
          timestamp: serverTimestamp(),
          username: user.email,
        })
        user.username = user.email
      } else {
        user.username = user.email
      }
      setUser(user)
      router.push('/todos')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='mx-auto   p-4 w-full max-w-sm bg-white rounded-lg border border-gray-200 shadow-md sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700'>
      <div className='space-y-6'>
        <h5 className='text-xl font-medium text-gray-900 dark:text-white'>Sign in</h5>
        {/* <div>
                  <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Your email</label>
                  <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="name@company.com" required />
              </div>
              <div>
                  <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Your password</label>
                  <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
              </div>
              <div className="flex items-start">
                  <div className="flex items-start">
                      <div className="flex items-center h-5">
                          <input id="remember" type="checkbox" value="" className="w-4 h-4 bg-gray-50 rounded border border-gray-300 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800" required />
                      </div>
                      <label htmlFor="remember" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Remember me</label>
                  </div>
                  <a href="#" className="ml-auto text-sm text-blue-700 hover:underline dark:text-blue-500">Lost Password?</a>
              </div> */}
        <button
          // type="submit"
          onClick={onGoogleClick}
          className='w-full text-white bg-violet-700 hover:bg-violet-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center '
        >
          <i className='pi pi-google px-2'></i>
          <span className='px-3'> Login with Google</span>
        </button>
        {/* <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                  Not registered? <a href="#" className="text-blue-700 hover:underline dark:text-blue-500">Create account</a>
              </div> */}
      </div>
    </div>
  )
}

export default Login
