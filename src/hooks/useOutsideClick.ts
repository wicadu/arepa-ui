import { useCallback, useEffect } from "react"

function useOutsideClick(ref, callback, isActive) {
  const handleClickOutside = useCallback((event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      if (callback && isActive) callback()
    }
  }, [ref, callback, isActive])

  useEffect(() => {
    if (isActive) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [ref, isActive])
}

export default useOutsideClick
