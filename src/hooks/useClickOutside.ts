import { useEffect, RefObject } from 'react'

const useClickOutside = <T extends HTMLElement>(ref: RefObject<T>, callback: () => void) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      console.debug({cur: ref.current, tar: event.target, con: ref.current?.contains(event.target as Node)})
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    };
  }, [ref, callback])
}

export default useClickOutside