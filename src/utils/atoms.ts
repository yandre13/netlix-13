// import { Profile } from '@/lib/xata/users'
// import { atomWithLocalStorage } from '@/lib/jotai'

import { MovieWithFavorite } from '@/lib/prisma/movie'
import { Movie } from '@prisma/client'
import { atom } from 'jotai'

// export const profileAtom = atomWithStorage<Profile | null>('my-profile', null)

export const openModalAtom = atom(false)

export const movieAtom = atom<MovieWithFavorite | null>(null)
