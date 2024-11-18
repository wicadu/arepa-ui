import isBrowser from './isBrowser'

const LOCAL_STORAGE_EVENT = 'w-local-storage-change'

export const setItem = (
  key: string,
  value: string | number
): Record<string, any> => {
  if (!isBrowser() || !key) return {}

  const newValue: Record<string, any> = { [key]: value }

  window.localStorage.setItem(key, JSON.stringify(newValue))
  window.dispatchEvent(
    new CustomEvent(LOCAL_STORAGE_EVENT, { detail: { key, newValue } })
  )

  return newValue
}

export const getItem = (key: string): Record<string, any> => {
  let value: Record<string, any> = {}
  if (!isBrowser() || !key) return value
  const valueStored: string = window.localStorage.getItem(key)
  if (valueStored) value = JSON.parse(valueStored)
  return value
}

export const removeItem = (key: string): void => {
  if (isBrowser() && key) {
    window.localStorage.removeItem(key)

    window.dispatchEvent(
      new CustomEvent(LOCAL_STORAGE_EVENT, { detail: { key, removed: true } })
    )
  }
}

export default {
  setItem,
  getItem,
  removeItem,
}
