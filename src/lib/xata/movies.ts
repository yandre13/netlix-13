import { db } from './db'
import { OmitedProps } from './types'

export const getMovies = async () => {
  const movies = await db.movies.getMany()
  return movies
}

export type Movie = Omit<
  Awaited<ReturnType<typeof getMovies>>[number],
  OmitedProps
>

export const getRandomMovie = async () => {
  const movies = await db.movies.getMany()
  const randomMovie =
    movies[Math.floor(Math.random() * movies.length)] || movies[0]
  return randomMovie as Movie
}
