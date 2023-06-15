import { useCallback, useEffect, useState } from 'react'
import Cookies from 'js-cookie'

function optimisticValue<T>(key: string, initialValue?: T) {
  const item = Cookies.get(key)
  if (item) {
    return JSON.parse(item) as T
  }
  return initialValue || null
}
export function useCookie2<T = unknown>(key: string, initialValue?: T) {
  const [value, setValue] = useState<T | null>(
    optimisticValue(key, initialValue)
  )

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
      const parsed = JSON.parse(item)
      setValue(parsed)
    }
  }, [key])
  return {
    value,
    write,
    remove,
  }
}

export default function useCookie<T = unknown>(key: string, initialValue?: T) {
  const value = optimisticValue(key, initialValue)

  const write = (value: T) => Cookies.set(key, JSON.stringify(value))

  const remove = () => Cookies.remove(key)

  return {
    value,
    write,
    remove,
  }
}
