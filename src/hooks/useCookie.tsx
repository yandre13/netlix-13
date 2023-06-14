import { useCallback, useEffect, useState } from 'react'
import Cookies from 'js-cookie'

export default function useCookie<T = unknown>(key: string, initialValue?: T) {
  const [value, setValue] = useState<T | null>(initialValue || null)

  const write = useCallback(
    (value: T) => {
      Cookies.set(key, JSON.stringify(value))
      setValue(value)
    },
    [key]
  )

  const remove = useCallback(() => {
    Cookies.remove(key)
    setValue(null)
  }, [key])

  useEffect(() => {
    const item = Cookies.get(key)
    if (item) {
      setValue(JSON.parse(item))
    }
  }, [key])

  return {
    value,
    write,
    remove,
  }
}
