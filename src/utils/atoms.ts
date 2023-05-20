import { Profile } from '@/lib/xata/users'
import { atomWithLocalStorage } from '@/lib/jotai'
import { atomWithStorage } from 'jotai/utils'

export const sleep = (ms: number) =>
  new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
export const profileAtom = atomWithStorage<Profile | null>('my-profile', null)
