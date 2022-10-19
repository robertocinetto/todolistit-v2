import { useEffect, useState } from 'react'

import { deleteDoc, doc, updateDoc } from 'firebase/firestore'
import { db } from '../firebase'

import { ToggleButton } from 'primereact/togglebutton'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'

import { useToastContext } from '../hooks/useToastContext'

const Todo = ({ id, todo, done, confirmDeleteTodo }) => {
  const [inlineEdit, setInlineEdit] = useState(false)
  const [todoContent, setTodoContent] = useState(todo)
  const { showSuccess, showWarning } = useToastContext()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    console.log('%cTodo rendered', 'color:orange')

    document.addEventListener('keydown', keydownHandler)

    return () => {
      document.removeEventListener('keydown', keydownHandler)
    }
  }, [])

  const onToggleClick = async e => {
    try {
      await updateDoc(doc(db, 'todos', id), {
        done: !done,
      })
      showSuccess(undefined, undefined, 'Todo is completed!')
    } catch (e) {
      console.log(e)
    }
  }

  const onTodoClick = () => {
    setInlineEdit(true)
  }

  const submitTodoEdits = async () => {
    setLoading(true)
    try {
      await updateDoc(doc(db, 'todos', id), {
        todo: todoContent,
      })
      setLoading(false)
      showSuccess(undefined, undefined, 'Todo successfully updated!')
      setInlineEdit(false)
    } catch (e) {
      console.log(e)
    }
  }

  const keydownHandler = e => {
    if (e.key === 'Escape') setInlineEdit(false)
  }

  const handleCancelInlineEdit = () => {
    setInlineEdit(false)
  }

  return (
    <div
      className='px-3 mb-2 last:mb-0 
                    border rounded border-zinc-200 dark:border-zinc-600 
                    bg-zinc-100 dark:bg-zinc-800 flex items-center'
    >
      <ToggleButton
        checked={done}
        onChange={e => onToggleClick(e.value)}
        onIcon='pi pi-check'
        offIcon='pi pi-check'
        aria-label='Confirmation'
        offLabel=''
        className='p-button-xs'
      />
      <div
        className={`ml-4 ${done && !inlineEdit ? 'line-through text-zinc-400' : ''} flex-1`}
        onClick={inlineEdit ? null : onTodoClick}
      >
        {inlineEdit ? (
          <div className='flex items-center'>
            <InputText
              className='p-inputtext-xs block'
              type='text'
              value={todoContent}
              onChange={e => setTodoContent(e.target.value)}
              autoFocus
            />
            <Button
              icon='pi pi-check'
              className='p-button-rounded p-button-text p-button-xs ml-2'
              aria-label='Submit'
              onClick={submitTodoEdits}
              loading={loading}
            />
            <Button
              icon='pi pi-times'
              className='p-button-rounded p-button-danger p-button-text p-button-xs ml-2'
              aria-label='Cancel'
              onClick={handleCancelInlineEdit}
            />
          </div>
        ) : (
          todoContent
        )}
      </div>
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
