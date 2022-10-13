import { useContext, useEffect, useState } from 'react'

import { useToastContext } from '../hooks/useToastContext'
import { UserContext } from '../contexts/UserContext'

import { addDoc, collection, onSnapshot, query, serverTimestamp } from 'firebase/firestore'
import { db } from '../firebase'

import { RadioButton } from 'primereact/radiobutton'
import { Button } from 'primereact/button'
import { Dialog } from 'primereact/dialog'
import { InputText } from 'primereact/inputtext'

import { useRecoilState } from 'recoil'
import { categoriesState } from '../atom/categoriesAtom'

const CategorySelection = ({ selectedCategory, handleCategoryChange }) => {
  const [displayPopup, setDisplayPopup] = useState(false)
  const [category, setCategory] = useState(null)
  const [newCategory, setNewCategory] = useState('')
  const [categories, setCategories] = useRecoilState(categoriesState)

  // const [selectedCategory, setSelectedCategory] = useState(categories)
  const showSuccess = useToastContext()
  const { user, setUser } = useContext(UserContext)

  useEffect(() => {
    console.log('%cTodo category selection rendered', 'color:orange')

    let _categories = []
    const unsub = onSnapshot(query(collection(db, 'categories')), collection => {
      //since the snapshot doesn't get the id of each doc, ids needs to be collected in another way
      //I had to get ids to be able to delete single docs from the collection

      //get the collection docs
      const categoriesCollection = collection.docs

      //build an array of ids from the collection
      let ids = categoriesCollection.map(category => category.id)
      //build an array of objects containing the db data
      let categoriesData = categoriesCollection.map(category => category.data())
      //build an alternative array chaining ids and data
      _categories = categoriesData.map((category, i) => {
        return {
          ...category,
          id: ids[i],
        }
      })
      setCategories(_categories)
    })
  }, [selectedCategory])

  const addCategory = async () => {
    try {
      await addDoc(collection(db, 'categories'), {
        categoryName: newCategory,
        username: user.username,
        createdAt: serverTimestamp(),
      })
      showSuccess(undefined, undefined, 'Category successfully created!')
    } catch (e) {
      console.log(e)
    }
  }

  const showNewCategoryDialog = () => {
    setDisplayPopup(true)
  }

  const onHide = () => {
    setDisplayPopup(false)
  }

  return (
    <div className='flex flex-col justify-between '>
      {categories.map(category => {
        return (
          <div
            key={category.id}
            className='field-radiobutton flex items-center'
          >
            <RadioButton
              inputId={category.id}
              name='category'
              value={category}
              onChange={e => handleCategoryChange(e.value)}
              checked={selectedCategory.id === category.id}
            />
            <label
              className='ml-3'
              htmlFor={category.id}
            >
              {category.categoryName}
            </label>
          </div>
        )
      })}

      <Button
        onClick={showNewCategoryDialog}
        label='Add new category'
        className='p-button-sm w-full'
      />

      <Dialog
        header='Add todo'
        visible={displayPopup}
        style={{ width: '400px' }}
        onHide={() => onHide('displayPopup')}
        className='pb-5'
      >
        <InputText
          id='newCategory'
          value={newCategory}
          onChange={e => setNewCategory(e.target.value)}
          className='p-inputtext-sm w-full'
          placeholder='New category'
        />
        <Button
          label='Add category'
          className='p-button-sm w-full mt-3'
          onClick={addCategory}
        />
      </Dialog>
    </div>
  )
}

export default CategorySelection
