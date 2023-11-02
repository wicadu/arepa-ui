import { useState, useEffect } from 'react'

function useGetWidthElementById(elementId) {
  const [width, setWidth] = useState<number>(0)

  useEffect(() => {
    if (document?.readyState === 'complete') {
      const el = document?.getElementById(elementId)
      if (el) setWidth(el.offsetWidth)
    }
  }, [document?.readyState])

  return width
}

export default useGetWidthElementById


