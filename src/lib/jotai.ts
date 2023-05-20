// import { atom } from 'jotai'

// export function atomWithLocalStorage<T = unknown>(
//   key: string,
//   initialValue: T,
//   storage = typeof window === 'undefined' ? null : window.localStorage
// ) {
//   if (typeof window === 'undefined' || !storage) {
//     return atom(initialValue)
//   }
//   const storedValue = storage.getItem(key)
//   const parsedValue = storedValue ? JSON.parse(storedValue) : initialValue
//   const baseAtom = atom<T>(parsedValue)

//   return atom(
//     async (get) => get(baseAtom), // can be async
//     (get, set, nextValue: T) => {
//       // @ts-ignore
//       set(baseAtom, nextValue)

//       storage.setItem(key, JSON.stringify(nextValue))
//     }
//   )
// }
