import { useEffect } from 'react'

function useLocalStorageListener(onChange: (event: CustomEvent) => void) {
  useEffect(() => {
    const handleStorageChange = (event: Event) => {
      if (
        event instanceof CustomEvent &&
        event.type === 'w-local-storage-change'
      ) {
        onChange(event)
      }
    }

    window.addEventListener('w-local-storage-change', handleStorageChange)

    return () => {
      window.removeEventListener('w-local-storage-change', handleStorageChange)
    }
  }, [onChange])
}

export default useLocalStorageListener
