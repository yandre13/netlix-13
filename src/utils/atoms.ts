// import { Profile } from '@/lib/xata/users'
// import { atomWithLocalStorage } from '@/lib/jotai'

import type { MovieProps } from '@/db/schema'
import { atom } from 'jotai'

// export const profileAtom = atomWithStorage<Profile | null>('my-profile', null)

export const openModalAtom = atom(false)

export const movieAtom = atom<MovieProps | null>(null)
