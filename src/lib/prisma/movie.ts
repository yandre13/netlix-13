import { prismaDb } from '.'

export const getMovies = async () => {
  const movies = await prismaDb.movie.findMany()
  return movies
}

export const getRandomMovie = async () => {
  const movies = await prismaDb.movie.findMany()
  const randomMovie =
    movies[Math.floor(Math.random() * movies.length)] || movies[0]
  return randomMovie
}
