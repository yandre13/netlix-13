import { atom } from 'jotai'

export function atomWithWebStorage<T = unknown>(
  key: string,
  initialValue: T,
  storage = localStorage
) {
  const storedValue = storage.getItem(key)
  const parsedValue = storedValue ? JSON.parse(storedValue) : initialValue
  const baseAtom = atom<T>(parsedValue)
  return atom(
    (get) => get(baseAtom), // can be async
    (get, set, nextValue: T) => {
      // @ts-ignore
      set(baseAtom, nextValue)

      storage.setItem(key, JSON.stringify(nextValue))
    }
  )
}
