import JoyRide from 'react-joyride'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

const steps = [
  {
    target: '.create-category',
    title: "Let's get started!",
    content: "First, let's create a category for your todos.",
  },
  {
    target: '.select-category',
    content: 'Select the category you created.',
  },
  {
    target: '.create-todo',
    content: 'Create your first todo',
  },
]

const styles = {
  buttonNext: {
    backgroundColor: '#6d28d9',
  },
}

const darkStyles = {
  options: {
    arrowColor: '#222',
    backgroundColor: '#222',
    primaryColor: '#fff',
    textColor: '#eee',
  },
  buttonNext: {
    backgroundColor: '#6d28d9',
  },
}

const Tour = ({ startTour, handleStartTour }) => {
  const { resolvedTheme } = useTheme()

  useEffect(() => {
    console.log('%cTour rendered', 'color:blue')
  }, [])

  const TourCallback = data => {
    // console.log(data)
    if (data.action === 'close') {
      console.log('close')
      handleStartTour(false)
      localStorage.setItem('tour', 'true')
    }
  }

  return (
    <div>
      <JoyRide
        steps={steps}
        continuous={true}
        showSkipButton={true}
        showProgress={true}
        styles={resolvedTheme === 'light' ? styles : darkStyles}
        run={startTour}
        callback={TourCallback}
      />
    </div>
  )
}

export default Tour
