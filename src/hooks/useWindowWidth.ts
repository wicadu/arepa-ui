import { useEffect, useState } from 'react'

function useWindowWidth(): number {
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth)

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth)
    window.addEventListener('resize', handleResize)

    // Cleanup event listener on component unmount
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return windowWidth
}

export default useWindowWidth
