'use client'

import useFavorites from '@/hooks/queries/useFavorites'
import useCookie from '@/hooks/useCookie'
// Default theme
import { Profile } from '@prisma/client'
import useMovies from '@/hooks/queries/useMovies'
import Carousel from '../carousel'

export default function MoviesList({ moviesJson }: { moviesJson: string }) {
  const initMovies = moviesJson ? JSON.parse(moviesJson) : []
  const { data: myMovies, error } = useMovies({ initialData: initMovies })
  const { value: profile } = useCookie<Profile>('my-profile')
  const { data: myFavs } = useFavorites({
    profileId: profile?.id!,
    suspense: false,
  })

  const carouselMovies = myMovies?.map((movie) => {
    const isFavorite = myFavs?.some(
      (favoriteMovie) => favoriteMovie.id === movie.id
    )

    return { ...movie, isFavorite }
  })

  return (
    <div className="py-8">
      <h1 className="mb-6 text-2xl font-semibold">Trending movies 🔥</h1>
      <Carousel movies={carouselMovies ?? myMovies ?? []} />
    </div>
  )
}
