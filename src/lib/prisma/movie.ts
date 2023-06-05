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

export const getMoviesWithFavs = async (profileId: string) => {
  const movies = await prismaDb.movie.findMany()
  const favorites = await prismaDb.favoritesMovies.findMany({
    where: {
      profileId,
    },
    select: {
      movieId: true,
    },
  })
  const favoriteMovieIds = favorites.map((favorite) => favorite.movieId)

  const moviesWithFavorites = movies.map((movie) => ({
    ...movie,
    isFavorite: favoriteMovieIds.includes(movie.id),
  }))

  return moviesWithFavorites
}

export type MovieWithFavorite = Awaited<ReturnType<typeof getMoviesWithFavs>>[0]
