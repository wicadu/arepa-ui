import React, { useCallback, useEffect, useState, useRef } from 'react'

type Options = {
  root: null
  rootMargin: string
  threshold: number
}

type Response = [
  ref: React.RefObject<Element | HTMLInputElement>,
  isVisible: boolean
]

export default function useElementOnScreen(options: Options): Response {
  const [isVisible, setIsVisible] = useState<boolean>(true)

  const ref = useRef<Element | null>(null);

  const handleObserver = useCallback((entries: IntersectionObserverEntry[]) => {
    const [entry] = entries

    setIsVisible(entry.isIntersecting)
  }, [setIsVisible])

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, options)
    
    if (ref.current) observer.observe(ref.current)

    return () => {
      if (ref.current) observer.unobserve(ref.current)
    }
  }, [ref, options])

  return [ref, isVisible]
}
