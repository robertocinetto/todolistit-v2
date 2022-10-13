import { createContext, useRef } from 'react'

const ToastContext = createContext(null)

export default ToastContext

import { Toast } from 'primereact/toast'

export const ToastContextProvider = ({ children }) => {
  const toast = useRef(null)

  const showSuccess = (severity = 'success', summary = 'Success!', message = 'Task successfully completed') => {
    toast.current.show({ severity, summary, detail: message, life: 3000 })
  }
  const showWarning = (severity = 'warn', summary = 'Warning!', message = 'Warning message') => {
    toast.current.show({ severity, summary, detail: message, life: 3000 })
  }

  return (
    <ToastContext.Provider value={{ showSuccess, showWarning }}>
      {children}
      <Toast
        key={toast}
        ref={toast}
      />
    </ToastContext.Provider>
  )
}
