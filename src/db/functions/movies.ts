import { db } from '..'
import { movies } from '../schema'
import { eq } from 'drizzle-orm'

//select all movies
export const getMovies = async () => {
  const res = await db.select().from(movies)
  return res
}

export const getMovieById = async (id: string) => {
  const movie = await db.query.movies.findFirst({
    where: eq(movies.id, id),
  })
  return movie
}

export const getRandomMovie = async () => {
  const res = await db.select().from(movies)
  const randomMovie = res[Math.floor(Math.random() * res.length)] || res[0]
  return randomMovie
}
