import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from 'react'

import { UIElementStatusEnum } from '../../ts/enums/UIElementStatusEnum'
import Toast from './Toast'

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
  removeToast: (id?: string | number) => void
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
  direction: 'top',
}

function ToastProvider({ children, options }: Props) {
  const [toasts, setToasts] = useState<ToastData[]>([])

  const removeToast = useCallback(
    (id?: number | string) => {
      if (!Boolean(id)) setToasts([])

      setToasts((prevToasts: ToastData[]) =>
        prevToasts.filter((toast) => toast.id !== id)
      )
    },
    [toasts]
  )

  const addToast = useCallback((options: ToastData) => {
    const { title, type, description, time } = options || {}
    const id = options?.id ?? Date.now()

    setToasts((prevToasts) => [...prevToasts, { id, title, type, description }])

    setTimeout(() => removeToast(id), time || 3000)
  }, [])

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}

      <Toast toasts={toasts} options={{ ...defaultOptions, ...options }} />
    </ToastContext.Provider>
  )
}

export default ToastProvider
