import { useEffect, useState } from 'react'

import { doc, updateDoc } from 'firebase/firestore'
import { db } from '../firebase'

import { Checkbox } from 'primereact/checkbox'
import { ToggleButton } from 'primereact/togglebutton'
import { InputText } from 'primereact/inputtext'

const Todo = ({ id, todo, done }) => {
  const [doneState, setDoneState] = useState(done)
  const [bodyState, setBodyState] = useState(todo)

  useEffect(() => {
    console.log('%cTodo rendered', 'color:orange')
  }, [])

  const onToggleClick = async e => {
    console.log(id)
    try {
      await updateDoc(doc(db, 'todos', id), {
        done: doneState,
      })
      setDoneState(e)
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <div className='p-3 mb-2 border rounded border-zinc-200 dark:border-zinc-600 flex items-center'>
      <ToggleButton
        checked={doneState}
        onChange={e => onToggleClick(e.value)}
        onIcon='pi pi-times'
        offIcon='pi pi-check'
        aria-label='Confirmation'
        offLabel=''
        className='p-button-xs'
      />
      <div className='ml-4'>{bodyState}</div>
    </div>
  )
}

export default Todo
