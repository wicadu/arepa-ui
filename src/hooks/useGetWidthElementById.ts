import { useState, useEffect } from 'react'
import { isBrowser } from '../utils'

function useGetWidthElementById(elementId: string): number {
  const [width, setWidth] = useState<number>(0)

  useEffect(() => {
    if (isBrowser() && document.readyState === 'complete') {
      const el = document.getElementById(elementId)
      if (el) setWidth(el.offsetWidth)
    }
  }, [elementId])

  return width
}

export default useGetWidthElementById
