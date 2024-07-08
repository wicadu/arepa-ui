import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react'

import { UIElementStatusEnum } from '../ts/enums/UIElementStatusEnum'
import Toast from '../molecules/Toast'

export interface ToastData {
  id?: number
  type: UIElementStatusEnum
  title: string
  description?: string
  time?: number
}


interface ToastContextProps {
  toasts: ToastData[]
  addToast: (options: ToastData) => void
}

const ToastContext = createContext<ToastContextProps | undefined>(undefined)

export const useToast = (): ToastContextProps => {
  return useContext(ToastContext)
}

interface Props {
  children: ReactNode
}

function ToastProvider({ children }: Props) {
  const [toasts, setToasts] = useState<ToastData[]>([])

  const addToast = useCallback((options: ToastData) => {
    const { title, type, description, time } = options || {}
    const id = Date.now()

    setToasts((prevToasts) => [...prevToasts, { id, title, type, description }])

    setTimeout(() => {
      setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id))
    }, time || 3000)
  }, [])

  return (
    <ToastContext.Provider value={{ toasts, addToast }}>
      {children}

      <Toast toasts={toasts} />
    </ToastContext.Provider>
  )
}

export default ToastProvider
