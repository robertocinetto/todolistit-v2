import { useEffect, useState } from 'react'

import { doc, updateDoc } from 'firebase/firestore'
import { db } from '../firebase'

import { Checkbox } from 'primereact/checkbox'
import { ToggleButton } from 'primereact/togglebutton'
import { InputText } from 'primereact/inputtext'

const Todo = ({ id, todo, done }) => {
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
    <div className='p-3 mb-2 last:mb-0 border rounded border-zinc-100 dark:border-zinc-600 flex items-center'>
      <ToggleButton
        checked={done}
        onChange={e => onToggleClick(e.value)}
        onIcon='pi pi-check'
        offIcon='pi pi-check'
        aria-label='Confirmation'
        offLabel=''
        className='p-button-xs'
      />
      <div className={`ml-4 ${done ? 'line-through text-zinc-400' : ''}`}>{todo}</div>
    </div>
  )
}

export default Todo
