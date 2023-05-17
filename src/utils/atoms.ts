import { Profile } from '@/lib/xata/users'
import { atom } from 'jotai'
import { atomWithWebStorage } from '@/lib/jotai'

// export const sleep = (ms: number) =>
//   new Promise((resolve) => {
//     setTimeout(resolve, ms)
//   })

export const profileAtom = atomWithWebStorage<Profile | null>(
  'my-profile',
  null,
  localStorage
)
