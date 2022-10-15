import { useContext, useEffect, useState } from 'react'
import { useToastContext } from '../hooks/useToastContext'

import { UserContext } from '../contexts/UserContext'

import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '../firebase'

import { Dialog } from 'primereact/dialog'
import { InputText } from 'primereact/inputtext'
import { Dropdown } from 'primereact/dropdown'
import { Button } from 'primereact/button'
import { useFormik } from 'formik'
import { classNames } from 'primereact/utils'

import { useRecoilState } from 'recoil'
import { categoriesState } from '../atom/categoriesAtom'

const TodoFormPopup = () => {
  const { user, setUser } = useContext(UserContext)
  const [displayPopup, setDisplayPopup] = useState(false)
  const [todo, setTodo] = useState('')
  const [category, setCategory] = useState()
  const [categories, setCategories] = useRecoilState(categoriesState)
  const { showSuccess, showWarning } = useToastContext()

  const formik = useFormik({
    initialValues: {
      todo: '',
    },
    validate: data => {
      let errors = {}

      if (!data.todo) {
        errors.todo = 'Todo text is required.'
      }

      return errors
    },
    onSubmit: async data => {
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

      formik.resetForm()
    },
  })

  const isFormFieldValid = name => !!(formik.touched[name] && formik.errors[name])
  const getFormErrorMessage = name => {
    return isFormFieldValid(name) && <small className='p-error'>{formik.errors[name]}</small>
  }

  useEffect(() => {
    console.log('%cTodoFormPopup rendered', 'color:orange')
  }, [category])

  // const addTodo = async e => {
  //   e.preventDefault()
  //   try {
  //     await addDoc(collection(db, 'todos'), {
  //       done: false,
  //       todo,
  //       categoryId: category.id,
  //       username: user.username,
  //       createdAt: serverTimestamp(),
  //     })
  //     showSuccess(undefined, undefined, 'Todo successfully added!')
  //   } catch (e) {
  //     console.log(e)
  //   }
  // }

  const onCategoryChange = e => {
    setCategory(e.value)
  }

  const onClick = () => {
    if (categories.length === 0) {
      showWarning(undefined, undefined, 'Create a category first')
    } else {
      setDisplayPopup(true)
    }
  }

  const onHide = () => {
    setDisplayPopup(false)
    formik.resetForm()
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
        contentClassName='!py-5 !mx-5 rounded-md'
        dismissableMask
        showHeader={false}
      >
        <form>
          <InputText
            id='todo'
            value={formik.values.todo}
            // onChange={e => setTodo(e.target.value)}
            onChange={formik.handleChange}
            autoFocus
            className={classNames({ 'p-invalid': isFormFieldValid('todo') }, 'p-inputtext-sm w-full')}
            placeholder='Add your item'
          />
          {getFormErrorMessage('todo')}
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
            onClick={formik.handleSubmit}
            type='submit'
          />
        </form>
      </Dialog>

      <div className='fixed bottom-0 right-0 mr-3 mb-3'>
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
