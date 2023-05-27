// import { Profile } from '@/lib/xata/users'
// import { atomWithLocalStorage } from '@/lib/jotai'
import { Movie } from '@prisma/client'
import { atom } from 'jotai'

// export const profileAtom = atomWithStorage<Profile | null>('my-profile', null)

type ModalMovie = Movie | null
export const modalMovieAtom = atom<ModalMovie>(null)
