import React, { useCallback, useEffect, useState, useRef } from 'react'

type Options = {
  /**
   * The root element for the observer. Use `null` to default to the viewport.
   */
  root: null | Element

  /**
   * Margin around the root element to expand or shrink the intersection area.
   * Accepts values like '10px', '20%', or '-30px'.
   */
  rootMargin: string

  /**
   * Threshold at which the observer's callback is executed.
   * Values can range from 0 (trigger as soon as any pixel is visible)
   * to 1 (trigger when the entire element is visible).
   */
  threshold: number

  /**
   * The initial value for the visibility state before the observer starts.
   */
  defaultValue?: boolean
}

type Response = [
  /**
   * Ref object to attach to the element being observed.
   */
  ref: React.RefObject<Element | HTMLInputElement>,

  /**
   * Boolean indicating if the element is currently visible.
   */
  isVisible: boolean
]

/**
 * Hook to observe if an element is visible within the viewport or a parent element.
 *
 * @param {Options} options - Configuration options for the IntersectionObserver.
 * @param {null | Element} options.root - The root element to use for intersection.
 * @param {string} options.rootMargin - Margin around the root for the intersection area.
 * @param {number} options.threshold - Visibility threshold (0 to 1).
 *
 * @returns {Response} - A tuple containing the ref to attach and a visibility state.
 */
export default function useElementOnScreen(options: Options): Response {
  const [isVisible, setIsVisible] = useState<boolean>(
    options?.defaultValue ?? true
  )

  const ref = useRef<Element | null>(null)

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries

      setIsVisible(entry.isIntersecting)
    },
    [setIsVisible]
  )

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, options)

    if (ref.current) observer.observe(ref.current)

    return () => {
      if (ref.current) observer.unobserve(ref.current)
    }
  }, [ref, options])

  return [ref, isVisible]
}
