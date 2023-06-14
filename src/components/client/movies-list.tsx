'use client'

import useFavorites from '@/hooks/queries/useFavorites'
import useCookie from '@/hooks/useCookie'
// Default theme
import { Profile } from '@prisma/client'
import useMovies from '@/hooks/queries/useMovies'
import Carousel from '../carousel'

export default function MoviesList({ moviesJson }: { moviesJson: string }) {
  const initMovies = moviesJson ? JSON.parse(moviesJson) : []
  const { data: myMovies, error } = useMovies({
    initialData: initMovies,
    revalidateOnMounted: true,
  })

  return (
    <div className="mt-4 py-8">
      <h1 className="container mb-6 text-xl font-semibold lg:text-2xl">
        Trending movies 🔥
      </h1>
      <Carousel movies={myMovies ?? []} />
    </div>
  )
}
