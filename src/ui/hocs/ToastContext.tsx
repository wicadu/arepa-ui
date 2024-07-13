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

export type ToastOptions = {
  firstToastSpace: number
  direction: 'bottom' | 'top' // TODO: It has to be done.
}

interface Props {
  children: ReactNode
  options: ToastOptions
}

const defaultOptions: ToastOptions = {
  firstToastSpace: 15,
  direction: 'top'
}

function ToastProvider({ children, options }: Props) {
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

      <Toast toasts={toasts} options={{ ...defaultOptions, ...options }} />
    </ToastContext.Provider>
  )
}

export default ToastProvider
