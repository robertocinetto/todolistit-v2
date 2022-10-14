import { useEffect, useState } from 'react'

import { deleteDoc, doc, updateDoc } from 'firebase/firestore'
import { db } from '../firebase'

import { ToggleButton } from 'primereact/togglebutton'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'

const Todo = ({ id, todo, done, confirmDeleteTodo }) => {
  // const [doneState, setDoneState] = useState(done)

  useEffect(() => {
    console.log('%cTodo rendered', 'color:orange')
  }, [])

  const onToggleClick = async e => {
    try {
      await updateDoc(doc(db, 'todos', id), {
        done: !done,
      })
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <div className='p-3 mb-2 last:mb-0 border rounded border-zinc-200 dark:border-zinc-600 bg-zinc-100 dark:bg-zinc-800 flex items-center'>
      <ToggleButton
        checked={done}
        onChange={e => onToggleClick(e.value)}
        onIcon='pi pi-check'
        offIcon='pi pi-check'
        aria-label='Confirmation'
        offLabel=''
        className='p-button-xs'
      />
      <div className={`ml-4 ${done ? 'line-through text-zinc-400' : ''} flex-1`}>{todo}</div>
      <Button
        icon='pi pi-times'
        className='p-button-rounded p-button-text p-button-plain p-button-sm justify-self-end'
        aria-label='Cancel'
        onClick={() => confirmDeleteTodo(id)}
      />
    </div>
  )
}

export default Todo
