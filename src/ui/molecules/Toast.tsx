import React, { useCallback } from 'react'

import styled from '@emotion/styled'

import Alert from './Alert'
import ToastProvider, { ToastData, ToastOptions, useToast } from '../hocs/ToastContext'
import { UIElementStatusEnum } from '../ts/enums/UIElementStatusEnum'

function useNotify() {
  const { addToast, removeToast } = useToast()

  const convertKeysToLowerCase = useCallback((obj: ToastData) => {
    return Object.fromEntries(
      Object?.entries(obj || {})?.map(([key, value]) => [key.toLowerCase(), value])
    )
  }, [])

  const notify = {
    success: (data: ToastData) => {
      const { title, description, time } = convertKeysToLowerCase(data)
      addToast({ type: UIElementStatusEnum.Success, title, description, time })
    },
    error: (data: ToastData) => {
      const { title, description, time } = convertKeysToLowerCase(data)
      addToast({ type: UIElementStatusEnum.Error, title, description, time })
    },
    info: (data: ToastData) => {
      const { title, description, time } = convertKeysToLowerCase(data)
      addToast({ type: UIElementStatusEnum.Info, title, description, time })
    },
    warning: (data: ToastData) => {
      const { title, description, time } = convertKeysToLowerCase(data)
      addToast({ type: UIElementStatusEnum.Warning, title, description, time })
    },
    default: (data: ToastData) => {
      const { title, description, time } = convertKeysToLowerCase(data)
      addToast({ type: UIElementStatusEnum.Info, title, description, time })
    },
    remove: (id?: string | number ) => {
      removeToast(id)
    }
  }

  return notify
}

interface Props {
  toasts: ToastData[]
  options: ToastOptions
}

function Toast({ toasts, options }: Props) {
  if (!toasts?.length) return null

  return toasts?.slice(0, 10)?.map(({ id, title, description, type }: ToastData, index) => (
    <Container key={id} index={index} options={options}>
      <Alert show type={type} title={title} description={description} />
    </Container>
  ))
}

const _ALERT_HEIGHT = 50

const Container = styled.div<{
  index: number,
  options: ToastOptions
}>`
  position: fixed;
  left: 15px;
  right: 15px;
  z-index: 100;
  top: ${({ index, options }) => index * (_ALERT_HEIGHT + 15) + options?.firstToastSpace}px;
`

Toast.Provider = ToastProvider
Toast.useNotify = useNotify

export default Toast
