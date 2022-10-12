import { useContext } from 'react'
import ToastContext from '../contexts/ToastContext'

export const useToastContext = () => {
  return useContext(ToastContext)
}
