import { RefObject, useEffect } from 'react'

const useOutsideClick = (ref: RefObject<HTMLElement>, fn: () => void) => {
  const handleClick = (e: MouseEvent) => {
    if (!ref.current || ref.current.contains(<Node>e.target)) {
      return
    }

    fn()
  }

  useEffect(() => {
    document?.addEventListener('click', handleClick)
    document?.addEventListener('contextmenu', handleClick)

    return () => {
      document?.removeEventListener('click', handleClick)
      document?.removeEventListener('contextmenu', handleClick)
    }
  }, [ref, fn])
}

export default useOutsideClick
