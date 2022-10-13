import { useContext, useEffect, useState } from 'react'
import { useToastContext } from '../hooks/useToastContext'

import { UserContext } from '../contexts/UserContext'

import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '../firebase'

import { Dialog } from 'primereact/dialog'
import { InputText } from 'primereact/inputtext'
import { Dropdown } from 'primereact/dropdown'
import { Button } from 'primereact/button'

import { useRecoilState } from 'recoil'
import { categoriesState } from '../atom/categoriesAtom'

const TodoFormPopup = () => {
  const { user, setUser } = useContext(UserContext)
  const [displayPopup, setDisplayPopup] = useState(false)
  const [todo, setTodo] = useState('')
  const [category, setCategory] = useState()
  const [categories, setCategories] = useRecoilState(categoriesState)
  const showSuccess = useToastContext()

  useEffect(() => {
    console.log('%cTodoFormPopup rendered', 'color:orange')
  }, [category])

  const addTodo = async () => {
    try {
      await addDoc(collection(db, 'todos'), {
        done: false,
        todo,
        categoryId: category.id,
        username: user.username,
        createdAt: serverTimestamp(),
      })
      showSuccess(undefined, undefined, 'Todo successfully added!')
    } catch (e) {
      console.log(e)
    }
  }

  const onCategoryChange = e => {
    setCategory(e.value)
  }

  const onClick = () => {
    setDisplayPopup(true)
  }

  const onHide = () => {
    setDisplayPopup(false)
  }

  const selectedCategoryTemplate = (option, props) => {
    if (option) {
      return (
        <div className='country-item country-item-value'>
          <div>{option.categoryName}</div>
        </div>
      )
    }

    return <span>{props.placeholder}</span>
  }
  const selectedCategoryOptionTemplate = option => {
    return (
      <div className='country-item'>
        <div>{option.categoryName}</div>
      </div>
    )
  }

  return (
    <>
      <Dialog
        header='Add todo'
        visible={displayPopup}
        style={{ width: '400px' }}
        onHide={() => onHide('displayPopup')}
        className='pb-5'
      >
        <InputText
          id='todo'
          value={todo}
          onChange={e => setTodo(e.target.value)}
          className='p-inputtext-sm w-full'
          placeholder='Todo'
        />
        <Dropdown
          value={category}
          options={categories}
          onChange={onCategoryChange}
          optionLabel='name'
          placeholder='Select a category'
          className='w-full mt-3 p-inputtext-sm'
          valueTemplate={selectedCategoryTemplate}
          itemTemplate={selectedCategoryOptionTemplate}
        />
        <Button
          label='Add todo'
          className='p-button-sm w-full mt-3'
          onClick={addTodo}
        />
      </Dialog>

      <div className='absolute bottom-o right-0 mr-3 mb-3'>
        <Button
          icon='pi pi-plus'
          className='p-button-rounded bg-violet-700 hover:bg-violet-500 border-violet-700 hover:border-violet-500'
          aria-label='Add todo'
          onClick={onClick}
        />
      </div>
    </>
  )
}

export default TodoFormPopup
