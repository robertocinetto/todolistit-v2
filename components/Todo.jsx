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
    console.log(e)
    try {
      await updateDoc(doc(db, 'todos', id), {
        done: !done,
      })
      if (e) showSuccess(undefined, undefined, 'Todo is completed!')
      else showSuccess(undefined, undefined, 'Todo is to be done yet!')
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
      className={`p-2 mb-2 last:mb-0 
                  border rounded border-zinc-100 dark:border-zinc-600 
                  bg-zinc-50 dark:bg-zinc-800 flex items-center 
                  ${done ? 'opacity-60' : ''}`}
    >
      <ToggleButton
        checked={done}
        onChange={e => onToggleClick(e.value)}
        onIcon='pi pi-check'
        offIcon='pi pi-check'
        aria-label='Confirmation'
        offLabel=''
        className={`p-button-xs ${inlineEdit ? 'hidden' : ''}`}
      />
      <div
        className={`flex-1 
                  ${done && !inlineEdit ? 'line-through text-zinc-400' : ''} 
                  
                  `}
        onClick={inlineEdit ? null : onTodoClick}
      >
        {inlineEdit ? (
          <form onSubmit={submitTodoEdits}>
            <div className='flex items-center'>
              <InputText
                className='p-inputtext-xs block flex-1 w-[100px]'
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
          </form>
        ) : (
          <span className='ml-4 '>
            {todo} {`${process.env.NODE_ENV === 'development' ? '- ' + id : ''}`}
          </span>
        )}
      </div>
      <Button
        icon='pi pi-times'
        className={`p-button-rounded p-button-text p-button-plain p-button-xs justify-self-end
                  ${inlineEdit ? 'hidden' : ''}
                  `}
        aria-label='Cancel'
        onClick={() => confirmDeleteTodo(id)}
      />
    </div>
  )
}

export default Todo
